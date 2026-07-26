"use client";

import { useEffect, useRef } from "react";

/**
 * Soft trailing cursor halo. Lerped toward the pointer each frame so it lags
 * behind with a bit of weight, and swells over interactive elements.
 *
 * Rendered only for fine pointers with motion enabled; otherwise the effect
 * never mounts a listener and the ring stays hidden.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let scale = 1;
    let targetScale = 1;
    let visible = false;

    const interactive = "a, button, [role='button'], input, summary, .tilt";

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const el2 = e.target as HTMLElement | null;
      targetScale = el2?.closest(interactive) ? 2.1 : 1;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
        x = tx;
        y = ty;
      }
    };

    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      scale += (targetScale - scale) * 0.14;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-7 w-7 rounded-full opacity-0 mix-blend-screen transition-opacity duration-300 md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(146,113,255,.55), rgba(56,224,208,.18) 55%, transparent 72%)",
      }}
    />
  );
}
