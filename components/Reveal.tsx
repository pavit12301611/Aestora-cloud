"use client";

import { useEffect } from "react";

/**
 * Adds `.is-visible` to every `.reveal` element as it enters the viewport.
 * One shared observer for the whole page — cheap and jank-free.
 */
export default function Reveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!nodes.length) return;

    const canAnimate =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof IntersectionObserver === "undefined" || !canAnimate) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    const observe = (el: HTMLElement) => {
      if (el.classList.contains("is-visible")) return;
      observer.observe(el);
    };

    nodes.forEach(observe);

    /*
      The old version queried `.reveal` exactly once on mount. Anything added
      to the DOM afterwards — a client-rendered branch, a route transition that
      reuses this component, a lazily hydrated island — kept `.reveal`'s
      `opacity: 0` and never received `.is-visible`, so it was invisible
      forever. Watching for new nodes makes the effect self-healing.
    */
    const mutations =
      typeof MutationObserver !== "undefined"
        ? new MutationObserver((records) => {
            records.forEach((record) => {
              record.addedNodes.forEach((node) => {
                if (!(node instanceof HTMLElement)) return;
                if (node.classList.contains("reveal")) observe(node);
                node
                  .querySelectorAll<HTMLElement>(".reveal")
                  .forEach(observe);
              });
            });
          })
        : null;

    mutations?.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations?.disconnect();
    };
  }, []);

  return null;
}
