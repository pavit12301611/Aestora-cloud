import { plans, pricingSection } from "@/lib/content";

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-wider text-muted">
            Pricing
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.1rem)] font-semibold leading-[1.08]">
            {pricingSection.title}
          </h2>
          <p className="mt-4 text-[17px] text-muted">{pricingSection.subtitle}</p>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <div key={plan.name} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
            <article
              className={`group relative flex h-full flex-col overflow-hidden rounded-4xl p-8 transition-all duration-500 ${
                plan.featured
                  ? "ring-gradient glass-strong shadow-2xl lg:-translate-y-4 lg:scale-[1.02]"
                  : "glass lift"
              } ${plan.muted ? "opacity-[0.92]" : ""}`}
            >
              {plan.featured && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-80 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(50% 60% at 50% 50%, var(--glow-a), transparent 70%)",
                  }}
                />
              )}

              {plan.badge && (
                <span
                  className={`relative mb-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${
                    plan.featured
                      ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-600/30"
                      : "glass text-muted"
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <h3 className="relative text-xl font-semibold">{plan.name}</h3>
              <p className="relative mt-2 text-[14.5px] leading-relaxed text-muted">
                {plan.tagline}
              </p>

              <div className="relative mt-6 flex items-baseline gap-1.5">
                <span className="text-5xl font-semibold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-[15px] text-faint">{plan.period}</span>
              </div>

              <div className="relative my-7 h-px bg-[rgb(var(--hairline))]" />

              <ul className="relative flex-1 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[14.5px]">
                    <span
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                        plan.featured
                          ? "bg-brand-500/20 text-brand-300"
                          : "bg-[rgb(var(--hairline))] text-accent-400"
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m20 6-11 11-5-5" />
                      </svg>
                    </span>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.cta.href}
                className={`relative mt-8 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-[15px] font-semibold transition-all duration-300 ${
                  plan.featured
                    ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-xl shadow-brand-600/30 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-500/40"
                    : "glass hover:-translate-y-0.5 hover:border-brand-400/40"
                }`}
              >
                {plan.cta.label}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
            </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
