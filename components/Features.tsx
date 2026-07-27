import { features, featuresSection, type Feature } from "@/lib/content";
import SectionHeading from "./SectionHeading";

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

const iconClass: Record<Feature["icon"], string> = {
  upload: "group-hover:-translate-y-1.5 duration-300",
  shield: "group-hover:scale-110 duration-300",
  bolt: "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300",
  broom: "group-hover:rotate-12 duration-300 origin-bottom-left",
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Features"
          title={featuresSection.titleLead}
          accent={featuresSection.titleAccent}
          subtitle={featuresSection.subtitle}
        />

        <div className="tilt-scene mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <article
                data-tilt="6"
                className="tilt spotlight spotlight-edge ring-gradient group relative h-full overflow-hidden rounded-3xl glass sheen p-7 transition-shadow duration-500 hover:shadow-[var(--card-shadow)]"
              >
                {/* Corner bloom */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, var(--glow-a), transparent 70%)",
                  }}
                />

                {/* Big ghosted index numeral */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 top-4 select-none text-[46px] font-bold leading-none text-[rgb(var(--hairline))] transition-colors duration-500 group-hover:text-[rgb(var(--hairline-strong))]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/25 to-accent-500/15 ring-1 ring-inset ring-[rgb(var(--hairline-strong))] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-[22px] w-[22px] text-brand-300 transition-all duration-300 group-hover:text-brand-200 ${iconClass[feature.icon]}`}
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

                <h3 className="relative z-10 mt-5 text-[17px] font-semibold transition-colors duration-300 group-hover:text-brand-300">
                  {feature.title}
                </h3>
                <p className="relative z-10 mt-2.5 text-[14.5px] leading-relaxed text-muted">
                  {feature.body}
                </p>

                {/* Underline that draws in on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-400 to-accent-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
