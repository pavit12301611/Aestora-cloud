"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Types `lead` then `accent` one character at a time, with a blinking accent
 * cursor while it runs.
 *
 * The full phrase is always present in the DOM as visually-hidden text, so the
 * server-rendered markup, screen readers and search crawlers see the finished
 * headline rather than an empty node that fills in later. Reduced-motion
 * visitors — and anyone whose JS hasn't hydrated yet — get the complete
 * headline immediately with no cursor.
 */
export default function Typewriter({
  lead,
  accent,
  speed = 35,
  delay = 400,
  className = "",
  accentClassName = "text-gradient",
}: {
  lead: string;
  accent: string;
  speed?: number;
  delay?: number;
  className?: string;
  accentClassName?: string;
}) {
  const full = `${lead} ${accent}`;
  // Start "finished" so SSR and the first client paint agree; the effect
  // rewinds to 0 only once we know motion is welcome.
  const [count, setCount] = useState(full.length);
  const [typing, setTyping] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let interval = 0;
    setCount(0);
    setTyping(true);

    const begin = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= full.length) {
            window.clearInterval(interval);
            setTyping(false);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(begin);
      window.clearInterval(interval);
    };
  }, [full.length, speed, delay]);

  const leadEnd = lead.length;
  const typedLead = full.slice(0, Math.min(count, leadEnd));
  const typedAccent = count > leadEnd ? full.slice(leadEnd, count) : "";

  return (
    <span className={className}>
      {/* The complete phrase for assistive tech and no-JS crawlers. */}
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        <span>{typedLead}</span>
        <span className={accentClassName}>{typedAccent}</span>
        {typing && (
          <span className="type-caret" aria-hidden="true" />
        )}
      </span>
    </span>
  );
}
