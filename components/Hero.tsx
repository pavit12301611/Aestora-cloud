import { hero, heroStats } from "@/lib/content";
import StoragePanel from "./StoragePanel";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ---------- Copy ---------- */}
          <div className="reveal">
            <a
              href="/register"
              className="group inline-flex items-center gap-2.5 rounded-full glass py-1.5 pl-1.5 pr-4 text-[13px] font-medium transition-colors hover:border-brand-400/40"
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
            </a>

            <h1 className="mt-7 text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[1.02]">
              {hero.titleLead}{" "}
              <span className="text-gradient">{hero.titleAccent}</span>
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg">
              {hero.subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={hero.primaryCta.href}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-[15px] font-semibold text-white shadow-xl shadow-brand-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-500/40"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
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
              </a>

              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-2xl glass px-7 py-3.5 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/40"
              >
                {hero.secondaryCta.label}
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-faint">
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
          <div className="reveal" style={{ transitionDelay: "120ms" }}>
            <StoragePanel />
          </div>
        </div>

        {/* ---------- Live stat strip ---------- */}
        <div className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3">
          {heroStats.map((stat, i) => (
            <div key={stat.label} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
            <div
              className="ring-gradient lift group relative h-full overflow-hidden rounded-3xl glass p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-medium uppercase tracking-wider text-faint">
                  {stat.label}
                </p>
                <span className="h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_12px] shadow-accent-400/70" />
              </div>
              <p className="mt-3 text-4xl font-semibold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted">{stat.hint}</p>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[rgb(var(--hairline))]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-400 transition-[width] duration-1000 ease-out"
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
