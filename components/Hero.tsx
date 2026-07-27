import { hero, heroStats } from "@/lib/content";
import StoragePanel from "./StoragePanel";
import Counter from "./Counter";
import SmartLink from "./SmartLink";
import Typewriter from "./Typewriter";
import Orbits from "./Orbits";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ---------- Copy ---------- */}
          <div>
            <SmartLink
              href="/register"
              className="group inline-flex items-center gap-2.5 rounded-full glass py-1.5 pl-1.5 pr-4 text-[13px] font-medium opacity-0 transition-colors duration-300 hover:border-brand-400/40 [animation:rise_.8s_var(--ease-out-expo)_forwards]"
            >
              <span className="relative grid h-6 w-6 place-items-center rounded-full bg-brand-500/15">
                <span className="absolute inset-0 rounded-full bg-brand-500/40 animate-pulse-ring" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              </span>
              <span className="shimmer-text">{hero.badge}</span>
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 text-faint transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </SmartLink>

            <h1 className="mt-7 text-[clamp(2.7rem,7.2vw,4.9rem)] font-semibold leading-[0.99] tracking-[-0.03em]">
              <Typewriter lead={hero.titleLead} accent={hero.titleAccent} />
            </h1>

            <p
              className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted opacity-0 sm:text-[18px] [animation:rise_.9s_var(--ease-out-expo)_forwards]"
              style={{ animationDelay: "520ms" }}
            >
              {hero.subtitle}
            </p>

            <div
              className="mt-9 flex flex-col gap-3 opacity-0 sm:flex-row sm:items-center [animation:rise_.9s_var(--ease-out-expo)_forwards]"
              style={{ animationDelay: "640ms" }}
            >
              {/* Primary CTA — ink pill inside a rotating conic border, with
                  the accent fill sweeping in from the left on hover. */}
              <span className="btn-border-wrap">
                <SmartLink
                  href={hero.primaryCta.href}
                  data-magnetic="0.2"
                  className="pill-btn magnetic group inline-flex items-center justify-center gap-2 bg-[#060218] px-7 py-3.5 text-[15px] font-semibold text-white"
                >
                  <span className="relative">{hero.primaryCta.label}</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </SmartLink>
              </span>

              <SmartLink
                href={hero.secondaryCta.href}
                data-magnetic="0.14"
                className="pill-btn pill-btn-rtl magnetic inline-flex items-center justify-center glass px-7 py-3.5 text-[15px] font-semibold transition-colors duration-300 hover:border-brand-400/40 hover:text-white"
              >
                <span className="relative">{hero.secondaryCta.label}</span>
              </SmartLink>
            </div>

            {/* Trust row */}
            <div
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-faint opacity-0 [animation:rise_.9s_var(--ease-out-expo)_forwards]"
              style={{ animationDelay: "760ms" }}
            >
              {[
                "No credit card required",
                "Private by default",
                "Cancel anytime",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-accent-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m20 6-11 11-5-5" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ---------- Product visual ---------- */}
          <div className="relative">
            {/* Slowly counter-rotating orbit rings framing the panel. */}
            <Orbits className="hidden lg:block" />
            <div
              className="tilt-scene relative opacity-0 [animation:rise_1s_var(--ease-out-expo)_forwards]"
              style={{ animationDelay: "300ms" }}
            >
              <StoragePanel />
            </div>
          </div>
        </div>

        {/* ---------- Live stat strip ---------- */}
        <div className="mt-16 grid gap-4 sm:mt-24 sm:grid-cols-3">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className="reveal"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="spotlight spotlight-edge ring-gradient lift group relative h-full overflow-hidden rounded-[1.75rem] glass sheen p-6">
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-faint">
                    {stat.label}
                  </p>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
                  </span>
                </div>

                <p className="relative z-10 mt-3 text-4xl font-semibold tracking-tight tabular">
                  <Counter value={stat.value} />
                </p>
                <p className="relative z-10 mt-1 text-sm text-muted">
                  {stat.hint}
                </p>

                <div className="relative z-10 mt-5 h-1.5 overflow-hidden rounded-full bg-[rgb(var(--hairline))]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 via-plasma-400 to-accent-400 shadow-[0_0_12px] shadow-brand-500/50 transition-[width] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: `${stat.pct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
