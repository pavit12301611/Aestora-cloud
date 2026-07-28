import { marqueeItems } from "@/lib/content";

/**
 * Infinite value-prop ticker between the hero and the features grid.
 * The list is rendered twice and translated -50%, so the loop is seamless.
 */
export default function Marquee() {
  return (
    <section className="relative py-6 sm:py-10" aria-hidden="true">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal ring-gradient relative overflow-hidden rounded-[1.9rem] bg-[rgb(var(--surface-strong))] px-4 py-4 shadow-[0_26px_60px_-40px_var(--brand-glow-soft)] backdrop-blur-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/80 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 opacity-30 blur-2xl animate-beam"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--glow-b), transparent)",
            }}
          />

          <div className="relative flex items-center gap-4 sm:gap-6">
            <div className="hidden shrink-0 items-center gap-2 rounded-full bg-[rgb(var(--surface))] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted ring-1 ring-[rgb(var(--hairline))] sm:inline-flex">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-400 to-accent-400"
              />
              Always on
            </div>

            <div className="min-w-0 flex-1 overflow-hidden mask-fade-x">
              <div className="flex w-max animate-marquee items-center gap-10 pr-10">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex items-center gap-10">
                    {marqueeItems.map((item) => (
                      <span
                        key={`${copy}-${item}`}
                        className="flex shrink-0 items-center gap-10 text-[13px] font-medium uppercase tracking-[0.22em] text-faint"
                      >
                        {item}
                        <span className="h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-brand-400 to-accent-400" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
