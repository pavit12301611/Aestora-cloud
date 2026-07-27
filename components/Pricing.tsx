"use client";

import { useState } from "react";
import { plans, pricingSection } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import SmartLink from "./SmartLink";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");

  const getPrice = (name: string, defaultPrice: string) => {
    if (name === "Free") return "$0";
    const numeric = parseFloat(defaultPrice.replace("$", ""));
    if (billingPeriod === "annually") {
      // 20% off and round to 2 decimal places
      return `$${(numeric * 0.8).toFixed(2)}`;
    }
    return defaultPrice;
  };

  const getPeriodText = (name: string, defaultPeriod: string) => {
    if (name === "Free") return "forever";
    if (billingPeriod === "annually") return "/month, billed annually";
    return defaultPeriod;
  };

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={pricingSection.title}
          subtitle={pricingSection.subtitle}
        />

        {/* Billing Toggle Switch */}
        <div className="reveal mt-10 flex items-center justify-center gap-4" style={{ transitionDelay: "100ms" }}>
          <span className={`text-sm font-medium transition-colors duration-300 ${billingPeriod === "monthly" ? "text-[var(--text)]" : "text-faint"}`}>
            Billed Monthly
          </span>
          <button
            type="button"
            onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annually" : "monthly")}
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[rgb(var(--hairline-strong))] transition-colors duration-300 ease-in-out hover:border-brand-400/40 focus:outline-none"
            aria-label="Toggle billing period"
            aria-pressed={billingPeriod === "annually"}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-brand-400 shadow-md ring-0 transition duration-300 ease-in-out ${
                billingPeriod === "annually" ? "translate-x-5 bg-brand-300" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${billingPeriod === "annually" ? "text-[var(--text)]" : "text-faint"}`}>
            Billed Annually
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
              Save 20%
            </span>
          </span>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className="reveal"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <article
                className={`spotlight group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  plan.featured
                    ? "ring-conic glass-strong sheen shadow-[0_50px_100px_-40px_var(--brand-glow-soft)] lg:-translate-y-5 lg:scale-[1.03]"
                    : "spotlight-edge ring-gradient glass sheen lift"
                } ${plan.muted ? "opacity-[0.9]" : ""}`}
              >
                {plan.featured && (
                  <>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 -top-28 h-56 opacity-90 blur-3xl"
                      style={{
                        background:
                          "radial-gradient(50% 60% at 50% 50%, var(--glow-a), transparent 70%)",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent"
                    />
                  </>
                )}

                <div className="relative z-10 flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  {plan.badge && (
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-semibold ${
                        plan.featured
                          ? "bg-gradient-to-r from-brand-500 to-plasma-500 text-white shadow-lg shadow-brand-600/40"
                          : "glass text-muted"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="relative z-10 mt-2 text-[14.5px] leading-relaxed text-muted">
                  {plan.tagline}
                </p>

                <div className="relative z-10 mt-6 flex items-baseline gap-1.5">
                  <span
                    className={`text-[3.4rem] font-semibold leading-none tracking-tight transition-all duration-300 ${
                      plan.featured ? "text-gradient" : ""
                    }`}
                  >
                    {getPrice(plan.name, plan.price)}
                  </span>
                  <span className="text-[15px] text-faint transition-all duration-300">
                    {getPeriodText(plan.name, plan.period)}
                  </span>
                </div>

                <div className="relative z-10 my-7 h-px bg-gradient-to-r from-[rgb(var(--hairline-strong))] to-transparent" />

                <ul className="relative z-10 flex-1 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[14.5px]"
                    >
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
                          plan.featured
                            ? "bg-brand-500/25 text-brand-200"
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

                <SmartLink
                  href={plan.cta.href}
                  data-magnetic="0.14"
                  className={`pill-btn magnetic relative z-10 mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold ${
                    plan.featured
                      ? "bg-[#060218] text-white"
                      : "pill-btn-rtl glass hover:border-brand-400/40 hover:text-white"
                  }`}
                >
                  <span className="relative">{plan.cta.label}</span>
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
                </SmartLink>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
