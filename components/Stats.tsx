import { stats } from "@/lib/content";
import Counter from "./Counter";

export default function Stats() {
  return (
    <section className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal spotlight ring-gradient relative overflow-hidden rounded-4xl glass sheen p-8 sm:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(80% 130% at 50% 0%, var(--glow-a), transparent 62%)",
            }}
          />
          {/* Faint scanning sheen across the band */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 opacity-40 blur-2xl animate-beam"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--glow-b), transparent)",
            }}
          />

          <div className="relative grid gap-10 sm:grid-cols-3 sm:gap-6">
            {stats.map((stat, i) => (
              <div key={stat.label} className="relative text-center sm:text-left">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[rgb(var(--hairline-strong))] to-transparent sm:block"
                  />
                )}
                <p className="text-[clamp(2.6rem,5.4vw,3.8rem)] font-semibold leading-none tracking-tight text-gradient tabular">
                  <Counter value={stat.value} />
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
