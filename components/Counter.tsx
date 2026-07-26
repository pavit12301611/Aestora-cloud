"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a numeric string up when it first scrolls into view, preserving any
 * prefix/suffix in the source value ("1,000+", "99.9%", "248 MB", "$5.99").
 *
 * The full value is rendered on the server and in the initial client render,
 * so it is always correct without JS and never causes a hydration mismatch —
 * the animation only starts after mount, and writes to the DOM node directly
 * rather than re-rendering React ~60 times a second.
 */
export default function Counter({
  value,
  duration = 1600,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Pull the first number out of the string, keeping what wraps it.
    const match = value.match(/-?\d[\d,]*(?:\.\d+)?/);
    if (!match || match.index === undefined) return;

    const raw = match[0];
    const target = Number(raw.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index + raw.length);
    const decimals = (raw.split(".")[1] ?? "").length;
    const grouped = raw.includes(",");

    const format = (n: number) => {
      const rounded = Number(n.toFixed(decimals));
      const body = grouped
        ? rounded.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : rounded.toFixed(decimals);
      return `${prefix}${body}${suffix}`;
    };

    const final = value;
    let raf = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      if (t >= 1) {
        // Snap to the authored string so the end state is byte-identical to
        // the server-rendered markup — no "1,000" where "1,000+" belongs and
        // no floating-point drift on the last frame.
        el.textContent = final;
        raf = 0;
        return;
      }
      // easeOutExpo
      const eased = 1 - Math.pow(2, -10 * t);
      el.textContent = format(target * eased);
      raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          el.textContent = format(0);
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
      // Restore the authored value if we unmount mid-count.
      el.textContent = final;
    };
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
}
