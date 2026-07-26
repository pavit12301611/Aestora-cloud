"use client";

import { useEffect, useRef } from "react";

/**
 * Thin gradient progress rail pinned to the very top of the viewport.
 *
 * The bar is written straight to the DOM node from the rAF callback. Driving
 * it through React state re-rendered the component on every scroll frame,
 * which is pure overhead for what is a compositor-only `scaleX`.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      el.style.transform = `scaleX(${progress})`;
      el.style.opacity = progress > 0.005 ? "1" : "0";
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    // The document can grow or shrink without a scroll or resize event
    // (accordion opening, fonts loading, images settling), which would leave
    // the rail reporting a stale maximum.
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    observer?.observe(document.documentElement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
    >
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-brand-400 via-plasma-400 to-accent-400"
        style={{
          transform: "scaleX(0)",
          opacity: 0,
          transition: "opacity .3s ease",
          boxShadow: "0 0 14px var(--brand-glow)",
        }}
      />
    </div>
  );
}
