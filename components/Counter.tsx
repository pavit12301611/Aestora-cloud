"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric string up when it first scrolls into view, preserving any
 * prefix/suffix in the source value ("1,000+", "99.9%", "248 MB", "$5.99").
 *
 * The full value is rendered on the server and as the initial client render,
 * so it is always correct without JS and never causes a hydration mismatch —
 * the animation only starts after mount.
 */
export default function Counter({
  value,
  duration = 1600,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Pull the first number out of the string, keeping what wraps it.
    const match = value.match(/-?[\d.,]+/);
    if (!match) return;

    const raw = match[0];
    const target = parseFloat(raw.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + raw.length);
    const decimals = (raw.split(".")[1] ?? "").length;
    const grouped = raw.includes(",");

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const body = grouped
        ? Number(fixed).toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : fixed;
      return `${prefix}${body}${suffix}`;
    };

    let raf = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(format(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          setDisplay(format(0));
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
