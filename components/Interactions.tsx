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
 * `prefers-reduced-motion: reduce`, and it re-evaluates if either of those
 * conditions changes (plugging in a mouse, flipping the OS motion setting)
 * instead of being decided once at mount.
 */
export default function Interactions() {
  useEffect(() => {
    const fineQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // `teardown` is null whenever the effect layer is not running.
    let teardown: (() => void) | null = null;

    const start = () => {
      if (teardown) return;

      let frame = 0;
      let px = 0;
      let py = 0;

      const active: {
        spot: HTMLElement | null;
        tilt: HTMLElement | null;
        mag: HTMLElement | null;
      } = { spot: null, tilt: null, mag: null };

      const reset = (el: HTMLElement) => {
        el.classList.remove("is-active");
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--tx", "0px");
        el.style.setProperty("--ty", "0px");
      };

      const apply = () => {
        frame = 0;

        // Ambient bloom follows the cursor across the whole page.
        document.body.style.setProperty("--gx", `${px}px`);
        document.body.style.setProperty("--gy", `${py}px`);

        const target = document.elementFromPoint(px, py);
        // `elementFromPoint` returns null when the pointer is outside the
        // viewport. Treat that as "nothing hovered" and release every element
        // rather than bailing out and freezing them mid-transform.
        const hit = target instanceof HTMLElement ? target : null;

        const spot = hit?.closest<HTMLElement>(".spotlight") ?? null;
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty("--mx", `${px - r.left}px`);
          spot.style.setProperty("--my", `${py - r.top}px`);
        }
        if (active.spot && active.spot !== spot) {
          // Recentre so the next hover doesn't flash in from a stale corner.
          active.spot.style.removeProperty("--mx");
          active.spot.style.removeProperty("--my");
        }
        active.spot = spot;

        const tilt = hit?.closest<HTMLElement>(".tilt") ?? null;
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          // Guard against zero-size boxes (display:none, not yet laid out),
          // which would otherwise produce Infinity/NaN in the CSS variable.
          if (r.width > 0 && r.height > 0) {
            const nx = (px - r.left) / r.width - 0.5;
            const ny = (py - r.top) / r.height - 0.5;
            const parsed = Number(tilt.dataset.tilt);
            const max = Number.isFinite(parsed) ? parsed : 7;
            tilt.classList.add("is-active");
            tilt.style.setProperty("--ry", `${nx * max}deg`);
            tilt.style.setProperty("--rx", `${-ny * max}deg`);
          }
        }
        if (active.tilt && active.tilt !== tilt) reset(active.tilt);
        active.tilt = tilt;

        const mag = hit?.closest<HTMLElement>(".magnetic") ?? null;
        if (mag) {
          const r = mag.getBoundingClientRect();
          const parsed = Number(mag.dataset.magnetic);
          const strength = Number.isFinite(parsed) ? parsed : 0.28;
          mag.classList.add("is-active");
          mag.style.setProperty(
            "--tx",
            `${(px - (r.left + r.width / 2)) * strength}px`
          );
          mag.style.setProperty(
            "--ty",
            `${(py - (r.top + r.height / 2)) * strength}px`
          );
        }
        if (active.mag && active.mag !== mag) reset(active.mag);
        active.mag = mag;
      };

      const onMove = (e: PointerEvent) => {
        px = e.clientX;
        py = e.clientY;
        if (!frame) frame = requestAnimationFrame(apply);
      };

      const release = () => {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
        if (active.tilt) reset(active.tilt);
        if (active.mag) reset(active.mag);
        if (active.spot) {
          active.spot.style.removeProperty("--mx");
          active.spot.style.removeProperty("--my");
        }
        active.tilt = null;
        active.mag = null;
        active.spot = null;
      };

      // Scrolling moves elements under a stationary cursor, so the cached
      // hover target goes stale. Re-run the hit test on scroll too.
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(apply);
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", release);
      window.addEventListener("blur", release);
      window.addEventListener("scroll", onScroll, { passive: true });

      teardown = () => {
        release();
        document.body.style.removeProperty("--gx");
        document.body.style.removeProperty("--gy");
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", release);
        window.removeEventListener("blur", release);
        window.removeEventListener("scroll", onScroll);
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

  return null;
}
