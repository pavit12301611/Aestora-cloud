"use client";

import { useState } from "react";
import { faqs, faqSection } from "@/lib/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="reveal text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-wider text-muted">
            FAQ
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.1rem)] font-semibold leading-[1.08]">
            {faqSection.title}
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <div
                className="overflow-hidden rounded-3xl glass transition-colors duration-300 hover:border-[rgb(var(--hairline-strong))]"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-[15.5px] font-medium">{faq.q}</span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 bg-brand-500 text-white"
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
                  id={`faq-panel-${i}`}
                  className="grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
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
