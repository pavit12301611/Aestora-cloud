"use client";

import { useEffect } from "react";

/**
 * Global pointer-interaction layer.
 *
 * One set of delegated listeners powers every interactive effect on the page,
 * so we never attach per-card handlers:
 *
 *  - `.spotlight`  → sets --mx/--my for the radial cursor glow
 *  - `.tilt`       → sets --rx/--ry for the 3D parallax tilt
 *  - `.magnetic`   → sets --tx/--ty so buttons lean toward the cursor
 *  - `body`        → sets --gx/--gy for the ambient cursor bloom
 *
 * Everything is skipped on coarse pointers and under
 * `prefers-reduced-motion: reduce`.
 */
export default function Interactions() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;

      // Ambient bloom follows the cursor across the whole page.
      document.body.style.setProperty("--gx", `${px}px`);
      document.body.style.setProperty("--gy", `${py}px`);

      const target = document.elementFromPoint(px, py) as HTMLElement | null;
      if (!target) return;

      const spot = target.closest<HTMLElement>(".spotlight");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${px - r.left}px`);
        spot.style.setProperty("--my", `${py - r.top}px`);
      }

      const tilt = target.closest<HTMLElement>(".tilt");
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const nx = (px - r.left) / r.width - 0.5;
        const ny = (py - r.top) / r.height - 0.5;
        const max = Number(tilt.dataset.tilt ?? 7);
        tilt.classList.add("is-active");
        tilt.style.setProperty("--ry", `${nx * max}deg`);
        tilt.style.setProperty("--rx", `${-ny * max}deg`);
        active.tilt = tilt;
      } else if (active.tilt) {
        reset(active.tilt);
        active.tilt = null;
      }

      const mag = target.closest<HTMLElement>(".magnetic");
      if (mag) {
        const r = mag.getBoundingClientRect();
        const strength = Number(mag.dataset.magnetic ?? 0.28);
        mag.classList.add("is-active");
        mag.style.setProperty("--tx", `${(px - (r.left + r.width / 2)) * strength}px`);
        mag.style.setProperty("--ty", `${(py - (r.top + r.height / 2)) * strength}px`);
        active.mag = mag;
      } else if (active.mag) {
        reset(active.mag);
        active.mag = null;
      }
    };

    const active: { tilt: HTMLElement | null; mag: HTMLElement | null } = {
      tilt: null,
      mag: null,
    };

    const reset = (el: HTMLElement) => {
      el.classList.remove("is-active");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (active.tilt) reset(active.tilt);
      if (active.mag) reset(active.mag);
      active.tilt = null;
      active.mag = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return null;
}
