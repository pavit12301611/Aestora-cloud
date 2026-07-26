import { marqueeItems } from "@/lib/content";

/**
 * Infinite value-prop ticker between the hero and the features grid.
 * The list is rendered twice and translated -50%, so the loop is seamless.
 */
export default function Marquee() {
  return (
    <section className="relative py-6 sm:py-10" aria-hidden="true">
      <div className="relative overflow-hidden border-y border-[rgb(var(--hairline))] py-4 mask-fade-x">
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
    </section>
  );
}
