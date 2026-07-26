import { finalCta } from "@/lib/content";

export default function FinalCta() {
  return (
    <section className="relative pb-24 pt-8 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal spotlight ring-gradient relative overflow-hidden rounded-5xl glass-strong sheen px-6 py-16 text-center sm:px-16 sm:py-24">
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
          {/* Top hairline highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent"
          />
          <div className="absolute inset-0 grid-bg opacity-60 mask-fade-b" aria-hidden="true" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-[clamp(2.2rem,5.2vw,3.6rem)] font-semibold leading-[1.04]">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
              {finalCta.subtitle}
            </p>

            <a
              href={finalCta.cta.href}
              data-magnetic="0.22"
              className="shine magnetic group mt-10 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-500 to-brand-600 px-8 py-4 text-[15px] font-semibold text-white glow-ring transition-shadow duration-300 hover:shadow-[0_30px_70px_-18px_rgba(122,81,255,.95)]"
            >
              <span className="shine-layer" aria-hidden="true" />
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
