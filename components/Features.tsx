import { features, featuresSection, type Feature } from "@/lib/content";

const icon: Record<Feature["icon"], React.ReactNode> = {
  upload: (
    <path d="M12 16V4M7.5 8.5 12 4l4.5 4.5M4 17v1.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V17" />
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 8.3 7 9.5 4.1-1.2 7-5.2 7-9.5V6z" />
      <path d="M9.5 12.2 11.3 14l3.4-3.4" />
    </>
  ),
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12z" />,
  broom: (
    <>
      <path d="M14 3 9.5 7.5M19.5 8.5 15 13M8 9l7 7" />
      <path d="M11.5 12.5 5 19c-.8.8-.8 2 0 2.8s2 .8 2.8 0l6.5-6.5" />
    </>
  ),
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-wider text-muted">
            Features
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.1rem)] font-semibold leading-[1.08]">
            {featuresSection.titleLead}{" "}
            <span className="text-gradient">{featuresSection.titleAccent}</span>
          </h2>
          <p className="mt-4 text-[17px] text-muted">{featuresSection.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div key={feature.title} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
            <article
              className="ring-gradient lift group relative h-full overflow-hidden rounded-3xl glass p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, var(--glow-a), transparent 70%)",
                }}
              />

              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/15 ring-1 ring-inset ring-[rgb(var(--hairline-strong))] transition-transform duration-500 group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  className="h-[22px] w-[22px] text-brand-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icon[feature.icon]}
                </svg>
              </span>

              <h3 className="relative mt-5 text-[17px] font-semibold">
                {feature.title}
              </h3>
              <p className="relative mt-2.5 text-[14.5px] leading-relaxed text-muted">
                {feature.body}
              </p>
            </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
