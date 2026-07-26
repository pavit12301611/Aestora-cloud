"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { nav } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Full-bleed glass bar, fades in on scroll */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          scrolled ? "glass border-x-0 border-t-0 opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-8 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <a href="#top" className="shrink-0" aria-label="Aestora home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-[var(--text)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/login"
            className="hidden rounded-xl px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-[var(--text)] sm:block"
          >
            Sign in
          </a>
          <a
            href="/register"
            className="hidden rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:shadow-brand-500/40 hover:brightness-110 sm:block"
          >
            Get started
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

      {/* Mobile sheet */}
      <div
        className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 top-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-3 top-[68px] origin-top rounded-3xl glass-strong p-3 shadow-2xl transition-all duration-300 ${
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
