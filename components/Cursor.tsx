"use client";

import { useEffect, useRef } from "react";

/**
 * Soft trailing cursor halo. Lerped toward the pointer each frame so it lags
 * behind with a bit of weight, and swells over interactive elements.
 *
 * Rendered only for fine pointers with motion enabled; otherwise no listener
 * and no rAF loop is ever created, and the ring stays hidden.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el) return;

    const fineQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let teardown: (() => void) | null = null;

    const start = () => {
      if (teardown) return;

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
        // Ignore synthesised touch/pen input; this is a mouse-only affordance.
        if (e.pointerType !== "mouse") return;
        tx = e.clientX;
        ty = e.clientY;
        const node = e.target;
        targetScale =
          node instanceof Element && node.closest(interactive) ? 2.1 : 1;
        if (!visible) {
          visible = true;
          el.style.opacity = "1";
          x = tx;
          y = ty;
        }
      };

      const hide = () => {
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

      // Pause the loop while the tab is hidden — an always-on rAF in a
      // background tab is wasted battery.
      const onVisibility = () => {
        if (document.hidden) {
          if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
          hide();
        } else if (!raf) {
          raf = requestAnimationFrame(tick);
        }
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", hide);
      window.addEventListener("blur", hide);
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(tick);

      teardown = () => {
        if (raf) cancelAnimationFrame(raf);
        hide();
        el.style.transform = "";
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", hide);
        window.removeEventListener("blur", hide);
        document.removeEventListener("visibilitychange", onVisibility);
      };
    };

    const stop = () => {
      teardown?.();
      teardown = null;
    };

    const sync = () => {
      if (fineQuery.matches && !calmQuery.matches) start();
      else stop();
    };

    sync();
    fineQuery.addEventListener("change", sync);
    calmQuery.addEventListener("change", sync);

    return () => {
      fineQuery.removeEventListener("change", sync);
      calmQuery.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-7 w-7 rounded-full opacity-0 transition-opacity duration-300 md:block"
      style={{
        // Themed to the brand ramp — the old hard-coded violet/teal predated
        // the gold-amber palette and clashed with it.
        background:
          "radial-gradient(circle, var(--brand-glow), var(--glow-b) 55%, transparent 72%)",
      }}
    />
  );
}
