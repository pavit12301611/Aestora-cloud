"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { nav } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight the nav item for whichever section owns the viewport. */
  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector(n.href))
      .filter((el): el is Element => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(`#${hit.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto max-w-7xl px-3 transition-all duration-500 sm:px-6 ${
          scrolled ? "pt-2.5" : "pt-4"
        }`}
      >
        {/* Floating pill bar — condenses and lifts on scroll */}
        <div
          className={`relative flex items-center justify-between gap-4 rounded-2xl px-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-4 ${
            scrolled
              ? "glass-strong sheen py-2 shadow-[0_20px_50px_-24px_rgba(0,0,0,.85)]"
              : "border border-transparent bg-transparent py-3"
          }`}
        >
          <a
            href="#top"
            className="group shrink-0 rounded-xl"
            aria-label="Aestora home"
          >
            <Logo />
          </a>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-xl px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--text)]"
                      : "text-muted hover:text-[var(--text)]"
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-xl bg-[rgb(var(--hairline))] ring-1 ring-inset ring-[rgb(var(--hairline-strong))]"
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="/login"
              className="hidden rounded-xl px-3.5 py-2 text-[13.5px] font-medium text-muted transition-colors hover:text-[var(--text)] sm:block"
            >
              Sign in
            </a>
            <a
              href="/register"
              className="shine magnetic hidden rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-[13.5px] font-semibold text-white shadow-lg shadow-brand-600/25 transition-shadow duration-300 hover:shadow-brand-500/45 sm:block"
              data-magnetic="0.16"
            >
              <span className="shine-layer" aria-hidden="true" />
              <span className="relative">Get started</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-xl glass md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 top-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-3 top-[72px] origin-top rounded-3xl glass-strong sheen p-3 shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-3 scale-95 opacity-0"
          }`}
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-[15px] font-medium text-muted transition-colors hover:bg-white/5 hover:text-[var(--text)]"
              >
                {item.label}
              </a>
            ))}
            <div className="my-2 h-px bg-[rgb(var(--hairline))]" />
            <a
              href="/login"
              className="rounded-2xl px-4 py-3 text-[15px] font-medium text-muted transition-colors hover:bg-white/5 hover:text-[var(--text)]"
            >
              Sign in
            </a>
            <a
              href="/register"
              className="mt-1 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-3 text-center text-[15px] font-semibold text-white"
            >
              Get started
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
