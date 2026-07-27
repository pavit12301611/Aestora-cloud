"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "aestora-theme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  /* Follow the OS preference until the visitor makes an explicit choice, and
     stay in sync with any other tab that toggles the theme. */
  useEffect(() => {
    const apply = (next: Theme) => {
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };

    const system = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = () => {
      try {
        if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      } catch {
        /* storage unavailable — treat as "no explicit choice" */
      }
      apply(system.matches ? "light" : "dark");
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_STORAGE_KEY) return;
      apply(e.newValue === "light" ? "light" : "dark");
    };

    system.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      system.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* storage unavailable — theme still applies for this session */
      }
      return next;
    });
  }, []);

  const isDark = theme === "dark";
  // Before mount we cannot know the real theme (it is decided by an inline
  // script), so render a stable, theme-neutral label rather than asserting
  // "Switch to light theme" and having it flip after hydration.
  const label = mounted
    ? `Switch to ${isDark ? "light" : "dark"} theme`
    : "Switch theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={mounted ? !isDark : undefined}
      className={`group relative grid h-10 w-10 place-items-center rounded-full glass transition-colors hover:border-brand-400/40 ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 50% 50%, var(--glow-a), transparent 70%)" }}
      />
      <svg
        viewBox="0 0 24 24"
        className="relative h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {mounted && !isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}
