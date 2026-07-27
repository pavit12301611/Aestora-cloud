"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { nav } from "@/lib/content";
import SmartLink from "./SmartLink";
import { Star } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const sheet = useRef<HTMLDivElement>(null);
  const toggleButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Highlight the nav item for whichever section owns the viewport. */
  useEffect(() => {
    const sections = nav
      .map((n) => {
        // `nav` hrefs are hashes; querySelector would throw on anything else.
        if (!n.href.startsWith("#")) return null;
        return document.getElementById(n.href.slice(1));
      })
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    // Track ratios across observations instead of only looking at the entries
    // in the current callback — a section leaving the band fires an entry with
    // isIntersecting false, and the previous code then kept a stale winner.
    const ratios = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });

        let best: Element | null = null;
        let bestRatio = 0;
        ratios.forEach((ratio, el) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = el;
          }
        });

        // No section in the band (e.g. scrolled back to the hero) → clear it.
        setActive(best ? `#${(best as Element).id}` : "");
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Lock page scroll behind the mobile sheet without losing scroll position. */
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previous;
    };
  }, [open]);

  /* Escape closes the sheet, and focus is returned to the trigger. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /* A viewport that grows past the mobile breakpoint must not leave the sheet
     open (and body scroll locked) behind a now-hidden close button. */
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Full-width bar — transparent over the hero, frosted on scroll */}
      <div
        className={`relative flex items-center justify-between gap-4 px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 lg:px-12 ${
          scrolled
            ? "border-b border-[#1a3d1a]/10 bg-[rgb(255_255_255/0.88)] py-2.5 shadow-[0_18px_40px_-30px_rgba(13,32,13,0.4)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-4"
        }`}
      >
        <SmartLink
          href="#top"
          className="group shrink-0 animate-fade-in rounded-xl delay-100"
          aria-label="Aestora home"
        >
          <Logo />
        </SmartLink>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 animate-fade-in items-center gap-8 delay-200 md:flex"
          aria-label="Primary"
        >
          {nav.map((item, i) => {
            const isActive = active === item.href;
            return (
              <SmartLink
                key={item.href}
                href={item.href}
                // `aria-current="true"` is not a valid token for a nav link;
                // "location" is the value screen readers expect here.
                aria-current={isActive ? "location" : undefined}
                className={`nav-underline relative py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive || i === 0
                    ? "text-[#1a3d1a]"
                    : "text-[#5b7355] hover:text-[#1a3d1a]"
                } ${isActive ? "font-semibold" : ""}`}
              >
                {item.label}
              </SmartLink>
            );
          })}
        </nav>

        <div className="flex animate-fade-in items-center gap-2.5 delay-300 sm:gap-3">
          <ThemeToggle />

          {/* Pro upgrade — the favorite-star moment, in orange */}
          <SmartLink
            href="/membership/patreon"
            aria-label="Upgrade to Cloud Pro"
            title="Upgrade to Cloud Pro"
            className="group/star relative grid h-10 w-10 place-items-center rounded-full bg-[#e86a10] text-white shadow-md shadow-[#e86a10]/30 transition-all duration-300 hover:scale-105 hover:bg-[#d45e0d]"
          >
            <Star
              className="h-[18px] w-[18px] fill-current transition-transform duration-500 group-hover/star:rotate-[72deg]"
              aria-hidden="true"
            />
          </SmartLink>

          {/* Account avatar */}
          <SmartLink
            href="/login"
            aria-label="Sign in to your account"
            title="Sign in"
            className="relative hidden h-10 w-10 overflow-hidden rounded-full border border-[#1a3d1a]/15 ring-2 ring-white transition-transform duration-300 hover:scale-105 sm:block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/avatar.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </SmartLink>

          <SmartLink
            href="/register"
            data-magnetic="0.16"
            className="pill-btn magnetic hidden bg-[#1a3d1a] px-4 py-2 text-[13.5px] font-semibold text-white sm:inline-flex"
          >
            <span className="relative">Get started</span>
          </SmartLink>

          <button
            ref={toggleButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-full glass md:hidden"
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
          // Decorative scrim: the button above is the accessible control, so
          // this must not also be announced or reachable by keyboard.
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-[#0d200d]/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          id="mobile-menu"
          ref={sheet}
          // Hidden from the a11y tree and from tab order when closed —
          // otherwise the links stay focusable behind an invisible panel.
          inert={!open}
          className={`absolute inset-x-3 top-[68px] origin-top rounded-3xl glass-strong sheen p-3 shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-3 scale-95 opacity-0"
          }`}
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((item) => (
              <SmartLink
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-3 text-[15px] font-medium text-muted transition-colors hover:bg-[rgb(var(--hairline))] hover:text-[var(--text)]"
              >
                {item.label}
              </SmartLink>
            ))}
            <div className="my-2 h-px bg-[rgb(var(--hairline))]" />
            <SmartLink
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-3 text-[15px] font-medium text-muted transition-colors hover:bg-[rgb(var(--hairline))] hover:text-[var(--text)]"
            >
              Sign in
            </SmartLink>
            <SmartLink
              href="/membership/patreon"
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-3 text-[15px] font-medium text-muted transition-colors hover:bg-[rgb(var(--hairline))] hover:text-[var(--text)]"
            >
              Upgrade to Pro
            </SmartLink>
            <SmartLink
              href="/register"
              onClick={() => setOpen(false)}
              className="pill-btn mt-1 block bg-[#1a3d1a] px-4 py-3 text-center text-[15px] font-semibold text-white"
            >
              Get started
            </SmartLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
