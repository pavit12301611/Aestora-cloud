import { finalCta } from "@/lib/content";

export default function FinalCta() {
  return (
    <section className="relative pb-24 pt-8 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal ring-gradient relative overflow-hidden rounded-5xl glass-strong px-6 py-16 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 100% at 50% 0%, var(--glow-a), transparent 65%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[60%] w-[80%] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--glow-b), transparent 70%)",
            }}
          />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-[clamp(2.1rem,5vw,3.4rem)] font-semibold leading-[1.06]">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] text-muted">
              {finalCta.subtitle}
            </p>

            <a
              href={finalCta.cta.href}
              className="group relative mt-9 inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 px-8 py-4 text-[15px] font-semibold text-white shadow-xl shadow-brand-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-500/40"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{finalCta.cta.label}</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
