import { stats } from "@/lib/content";

export default function Stats() {
  return (
    <section className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal ring-gradient relative overflow-hidden rounded-4xl glass p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(80% 120% at 50% 0%, var(--glow-a), transparent 60%)",
            }}
          />

          <div className="relative grid gap-10 sm:grid-cols-3 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative text-center sm:text-left"
              >
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 top-1/2 hidden h-14 w-px -translate-y-1/2 bg-[rgb(var(--hairline))] sm:block"
                  />
                )}
                <p className="text-[clamp(2.4rem,5vw,3.4rem)] font-semibold leading-none tracking-tight text-gradient">
                  {stat.value}
                </p>
                <p className="mt-3 text-[15px] font-semibold">{stat.label}</p>
                <p className="mt-1 text-[13px] text-faint">{stat.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
