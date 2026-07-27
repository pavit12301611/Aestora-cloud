import type { ReactNode } from "react";
import { hero, heroStats, plans, stats, finalCta } from "@/lib/content";
import StoragePanel from "./StoragePanel";
import Counter from "./Counter";
import SmartLink from "./SmartLink";
import { ArrowRight, ArrowUpRight, CheckCircle2, Play, Plus, Star } from "lucide-react";

/* Hero copy is split into words so the desktop reveal can stagger cleanly.
   On mobile the same markup renders immediately (no entrance animation). */
const line1 = hero.titleLead.split(" ");
const line2 = hero.titleAccent.split(" ");
const desktopWordDelays = [
  "desktop-delay-100",
  "desktop-delay-200",
  "desktop-delay-300",
  "desktop-delay-400",
];

const proPlan = plans.find((p) => p.featured) ?? plans[0];
const usersStat = stats[0];
const filesStat = stats[1];
const uptimeStat = stats[2];
const tourCaption = "Watch how Aestora works";

function desktopMotion(
  animation: "fade-up" | "slide-in-right" | "scale-in",
  delay: number
) {
  return `desktop-animate-${animation} desktop-delay-${delay}`;
}

function Headline() {
  return (
    <h1 className="font-serif-display text-[clamp(3rem,14vw,4.55rem)] font-normal leading-[0.96] tracking-tight text-[var(--text)] sm:text-[clamp(4rem,10vw,6.7rem)] md:text-[clamp(4.2rem,7.7vw,7rem)]">
      <span className="block">
        {line1.map((word, i) => (
          <span
            key={word}
            className={`mr-[0.22em] inline-block last:mr-0 md:opacity-0 desktop-animate-word-pop ${desktopWordDelays[i] ?? "desktop-delay-100"}`}
          >
            {word}
          </span>
        ))}
      </span>
      <span className="block">
        {line2.map((word, i) => (
          <span
            key={word}
            className={`mr-[0.22em] inline-block last:mr-0 md:opacity-0 desktop-animate-word-pop ${desktopWordDelays[line1.length + i] ?? "desktop-delay-400"}`}
          >
            {word}
          </span>
        ))}
      </span>
    </h1>
  );
}

function AvatarStack() {
  return (
    <span className="flex shrink-0 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero/avatar.jpg"
        alt=""
        className="h-8 w-8 rounded-full object-cover ring-2 ring-[color:var(--bg)]"
      />
      <span className="-ml-2.5 grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-white ring-2 ring-[color:var(--bg)]">
        <Plus className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
      </span>
    </span>
  );
}

function MetricPill({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--hairline))] bg-[rgb(var(--surface))] px-4 py-3 backdrop-blur-xl sm:px-5">
      <div className="flex items-center gap-1.5 text-lg font-semibold tracking-tight text-[var(--text)] tabular">
        {value}
        {icon}
      </div>
      <div className="mt-0.5 text-xs font-medium text-muted">{label}</div>
    </div>
  );
}

function PlanMiniCard({ className = "" }: { className?: string }) {
  return (
    <SmartLink
      href="#pricing"
      aria-label={`${proPlan.name}, ${proPlan.price}${proPlan.period} — see pricing`}
      className={`group rounded-[1.6rem] border border-[rgb(var(--hairline))] bg-[rgb(var(--surface-strong))] p-3 shadow-[0_18px_45px_-32px_var(--brand-glow)] backdrop-blur-xl transition-transform duration-300 md:hover:-translate-y-1 ${className}`}
    >
      <span className="flex items-center gap-3">
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-[4.5rem] sm:w-[4.5rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/plan-card.jpg"
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-105"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="inline-flex rounded-full bg-accent-400/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-accent-400">
            {proPlan.badge ?? "Popular"}
          </span>
          <span className="mt-2 block text-sm font-semibold text-[var(--text)]">
            {proPlan.name}
          </span>
          <span className="mt-0.5 block text-sm font-bold text-[var(--text)]">
            {proPlan.price}
            <span className="font-medium text-faint">{proPlan.period}</span>
          </span>
        </span>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-500/25 transition-colors duration-300 md:group-hover:bg-brand-500">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 md:group-hover:-translate-y-0.5 md:group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </span>
    </SmartLink>
  );
}

function TourMiniCard({ className = "" }: { className?: string }) {
  return (
    <a
      href="#features"
      aria-label={tourCaption}
      className={`group rounded-[1.6rem] border border-[rgb(var(--hairline))] bg-[rgb(var(--surface-strong))] p-3 shadow-[0_18px_45px_-32px_var(--brand-glow)] backdrop-blur-xl transition-transform duration-300 md:hover:-translate-y-1 ${className}`}
    >
      <span className="flex items-center gap-3">
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-[4.5rem] sm:w-[4.5rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/video-card.jpg"
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-105"
          />
          <span className="absolute inset-0 grid place-items-center bg-[#0d200d]/20">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-400 text-white shadow-lg shadow-accent-400/25 transition-transform duration-300 md:group-hover:scale-110">
              <Play className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden="true" />
            </span>
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-[var(--text)]">Product tour</span>
          <span className="mt-1 block text-sm leading-snug text-muted">{tourCaption}</span>
        </span>
      </span>
    </a>
  );
}

function HeroVisual() {
  return (
    <div className={`relative ${desktopMotion("slide-in-right", 500)}`}>
      <div
        aria-hidden="true"
        className="absolute -inset-5 -z-10 rounded-[3rem] opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(58% 58% at 62% 24%, var(--glow-a), transparent 72%), radial-gradient(46% 46% at 22% 78%, var(--glow-c), transparent 72%)",
        }}
      />

      <div className="rounded-[2rem] border border-[rgb(var(--hairline-strong))] bg-[rgb(var(--surface))] p-3 shadow-[0_38px_90px_-48px_var(--brand-glow)] backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-4">
        <figure className="relative isolate min-h-[23rem] overflow-hidden rounded-[1.45rem] bg-brand-900 sm:min-h-[28rem] sm:rounded-[2rem] lg:min-h-[33rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/bottom-center.jpg"
            alt="Aestora cloud storage on phone, everywhere you go"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,24,9,0.18)_0%,rgba(9,24,9,0.18)_42%,rgba(9,24,9,0.78)_100%)]"
          />

          <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-black/10 backdrop-blur-md ring-1 ring-white/18">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-70 md:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              Live storage ready
            </div>
            <div className="hidden rounded-full bg-white/14 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/18 sm:block">
              Private by default
            </div>
          </div>

          <figcaption className="absolute inset-x-4 bottom-4 rounded-[1.35rem] bg-[#071607]/42 p-4 text-white shadow-2xl shadow-black/20 backdrop-blur-xl ring-1 ring-white/14 sm:inset-x-5 sm:bottom-5 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-serif-display text-2xl leading-tight sm:text-3xl">
                  {finalCta.title}
                </p>
                <p className="mt-1 max-w-sm text-sm text-white/78">
                  1 GB free daily uploads with clean sharing and automatic cleanup.
                </p>
              </div>
              <SmartLink
                href={hero.primaryCta.href}
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-accent-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-400/25 transition-colors duration-300 hover:bg-accent-500"
              >
                {hero.primaryCta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </SmartLink>
            </div>
          </figcaption>
        </figure>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <PlanMiniCard />
          <TourMiniCard />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-a), transparent 66%)" }}
      />

      <div aria-hidden="true" className="h-[76px] shrink-0 lg:h-[84px]" />

      <div className="relative mx-auto grid min-h-[calc(100svh-76px)] max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 md:grid-cols-[0.94fr_1.06fr] md:gap-12 md:py-14 lg:min-h-[calc(100svh-84px)] lg:px-12">
        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <div className={desktopMotion("fade-up", 100)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--hairline))] bg-[rgb(var(--surface-strong))] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden="true" />
              {hero.badge}
            </span>
          </div>

          <div className="mt-5 md:mt-6">
            <Headline />
          </div>

          <p className={`mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg md:mx-0 ${desktopMotion("fade-up", 500)}`}>
            {hero.subtitle}
          </p>

          <div className={`mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start ${desktopMotion("fade-up", 600)}`}>
            <SmartLink
              href={hero.primaryCta.href}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-400 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-400/25 transition-colors duration-300 hover:bg-accent-500 sm:w-auto"
            >
              {hero.primaryCta.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </SmartLink>
            <SmartLink
              href={hero.secondaryCta.href}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgb(var(--hairline-strong))] bg-[rgb(var(--surface))] px-7 py-3.5 text-sm font-semibold text-[var(--text)] backdrop-blur-xl transition-colors duration-300 hover:bg-[rgb(var(--surface-strong))] sm:w-auto"
            >
              {hero.secondaryCta.label}
            </SmartLink>
          </div>

          <div className={`mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 ${desktopMotion("fade-up", 700)}`}>
            <MetricPill
              value={usersStat.value}
              label={usersStat.label}
              icon={<AvatarStack />}
            />
            <MetricPill value={filesStat.value} label={filesStat.label} />
            <div className="col-span-2 sm:col-span-1">
              <MetricPill
                value={uptimeStat.value}
                label={uptimeStat.label}
                icon={
                  <Star
                    className="h-[17px] w-[17px] fill-accent-400 text-accent-400"
                    aria-hidden="true"
                  />
                }
              />
            </div>
          </div>

          <div className={`mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium text-muted md:justify-start ${desktopMotion("fade-up", 800)}`}>
            {features().map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent-400" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>

      <section className="relative py-14 sm:py-20" aria-label="Live storage preview">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="tilt-scene relative order-2 lg:order-1">
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-[3rem] blur-3xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 60% 30%, var(--glow-a), transparent 70%)",
              }}
            />
            <div className="reveal">
              <StoragePanel />
            </div>
          </div>

          <div className="order-1 grid content-center gap-4 lg:order-2">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className="reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="spotlight spotlight-edge ring-gradient lift group relative overflow-hidden rounded-[1.75rem] glass sheen p-6">
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-faint">
                      {stat.label}
                    </p>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-70 md:animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
                    </span>
                  </div>

                  <p className="relative z-10 mt-3 text-4xl font-semibold tracking-tight tabular">
                    <Counter value={stat.value} />
                  </p>
                  <p className="relative z-10 mt-1 text-sm text-muted">
                    {stat.hint}
                  </p>

                  <div className="relative z-10 mt-5 h-1.5 overflow-hidden rounded-full bg-[rgb(var(--hairline))]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-400 via-plasma-400 to-accent-400 shadow-[0_0_12px] shadow-brand-500/50 transition-[width] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ width: `${stat.pct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

function features() {
  return ["No credit card", "Private links", "Auto cleanup"];
}
