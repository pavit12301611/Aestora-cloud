"use client";

import { useId, useState } from "react";
import { faqs, faqSection } from "@/lib/content";
import SectionHeading from "./SectionHeading";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  // Hard-coded `faq-trigger-0` style IDs are global; two FAQ blocks on one
  // page would produce duplicate IDs and cross-wired aria-controls.
  const uid = useId();
  const triggerId = (i: number) => `${uid}-faq-trigger-${i}`;
  const panelId = (i: number) => `${uid}-faq-panel-${i}`;

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="FAQ" title={faqSection.title} />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className="reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className={`spotlight spotlight-edge relative overflow-hidden rounded-[1.75rem] glass sheen transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen
                      ? "border-brand-400/30 shadow-[0_24px_60px_-32px_var(--brand-glow-soft)]"
                      : "hover:border-[rgb(var(--hairline-strong))]"
                  }`}
                >
                  {/* Active accent rail */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-[2px] origin-top bg-gradient-to-b from-brand-400 to-accent-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "scale-y-100" : "scale-y-0"
                    }`}
                  />

                  <h3>
                    <button
                      id={triggerId(i)}
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId(i)}
                      className="relative z-10 flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span
                        className={`text-[15.5px] font-medium transition-colors duration-300 ${
                          isOpen ? "text-[var(--text)]" : ""
                        }`}
                      >
                        {faq.q}
                      </span>
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen
                            ? "rotate-[135deg] bg-gradient-to-br from-brand-500 to-plasma-500 text-white shadow-lg shadow-brand-600/40"
                            : "bg-[rgb(var(--hairline))] text-muted"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId(i)}
                    // `role="region"` on each of four panels floods the
                    // landmark list with near-identical entries; a disclosure
                    // panel needs no role, only the trigger association.
                    aria-labelledby={triggerId(i)}
                    // A collapsed 0fr row is only *visually* collapsed: the
                    // answer text stayed in the accessibility tree and in the
                    // find-in-page results. `inert` takes it out of both while
                    // preserving the height transition.
                    inert={!isOpen}
                    className="relative z-10 grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 pr-14 text-[14.5px] leading-relaxed text-muted">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
