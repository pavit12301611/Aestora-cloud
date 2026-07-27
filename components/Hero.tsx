import { hero, heroStats, plans, stats, finalCta } from "@/lib/content";
import StoragePanel from "./StoragePanel";
import Counter from "./Counter";
import SmartLink from "./SmartLink";
import { ArrowUpRight, ArrowRight, Play, Plus, Star } from "lucide-react";

/**
 * Hero — full-bleed, viewport-height composition.
 *
 * Layout recipe (adapted to Aestora's copy):
 *  - Centered serif headline whose words pop in one-by-one.
 *  - A "plan" card pinned top-left and a "watch the tour" video card pinned
 *    top-right, both sliding in from their edge.
 *  - A three-photo strip along the bottom (center panel widest/tallest) that
 *    reveals upward, carrying the social-proof + CTA overlays.
 *  - Three breakpoints: stacked mobile (<md), compact tablet (md–lg) and the
 *    full desktop composition (lg+), switched with show/hide utilities.
 */

/* Words of the two headline lines, with their pop-in stagger (200–600ms). */
const line1 = hero.titleLead.split(" "); // "Your cloud,"
const line2 = hero.titleAccent.split(" "); // "beautifully simple."
const wordDelays = ["delay-200", "delay-300", "delay-500", "delay-600"];

/* The plan card borrows the featured plan; the overlays borrow the stats. */
const proPlan = plans.find((p) => p.featured) ?? plans[0];
const usersStat = stats[0]; // "1,000+" · Active Users
const uptimeStat = stats[2]; // "99.9%" · Uptime Guarantee
const tourCaption = "Watch how Aestora works";

function Headline({ mobile = false }: { mobile?: boolean }) {
  const size = mobile
    ? "text-[36px] leading-[1.02]"
    : "text-7xl lg:text-[clamp(60px,7.5vw,110px)] leading-[0.95]";
  return (
    <h1
      className={`font-serif-display font-normal tracking-tight text-[#1a3d1a] ${size}`}
    >
      <span className="block">
        {line1.map((word, i) => (
          <span
            key={word}
            className={`mr-[0.22em] inline-block animate-word-pop last:mr-0 ${wordDelays[i]}`}
          >
            {word}
          </span>
        ))}
      </span>
      <span className="block">
        {line2.map((word, i) => (
          <span
            key={word}
            className={`mr-[0.22em] inline-block animate-word-pop last:mr-0 ${wordDelays[line1.length + i]}`}
          >
            {word}
          </span>
        ))}
      </span>
    </h1>
  );
}

/** Top-left card — the featured plan, framed like a product card. */
function PlanCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <SmartLink
      href="#pricing"
      aria-label={`${proPlan.name}, ${proPlan.price}${proPlan.period} — see pricing`}
      className={
        mobile
          ? "group block min-w-0 flex-1 animate-slide-in-left delay-600"
          : "group absolute left-4 top-[80px] z-20 block w-[160px] animate-slide-in-left delay-600 lg:left-12 lg:top-[50px] lg:w-[clamp(160px,14vw,260px)]"
      }
    >
      <span className="relative block overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/plan-card.jpg"
          alt=""
          className={`w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${
            mobile ? "aspect-square" : "aspect-[260/257]"
          }`}
        />
        <span className="absolute bottom-2.5 right-2.5 grid h-9 w-9 place-items-center rounded-full bg-[#1a3d1a] text-white shadow-lg shadow-[#1a3d1a]/30 transition-colors duration-300 group-hover:bg-[#2a5a2a] lg:h-10 lg:w-10">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </span>
      <span className="mt-2.5 flex items-baseline justify-between gap-2">
        <span className="text-[12px] font-medium text-[#46603f] lg:text-[clamp(12px,1vw,15px)]">
          {proPlan.name}
        </span>
        <span className="whitespace-nowrap text-[13px] font-bold text-[#1a3d1a] lg:text-[clamp(13px,1.1vw,17px)]">
          {proPlan.price}
          <span className="font-medium text-[#74906f]">{proPlan.period}</span>
        </span>
      </span>
    </SmartLink>
  );
}

/** Top-right card — portrait "watch the tour" video card. */
function VideoCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <a
      href="#features"
      aria-label={tourCaption}
      className={
        mobile
          ? "group block min-w-0 flex-1 animate-slide-in-right delay-700"
          : "group absolute right-4 top-[80px] z-20 block w-[120px] animate-slide-in-right delay-700 lg:right-12 lg:top-[50px] lg:w-[clamp(120px,10vw,177px)]"
      }
    >
      <span className="relative block overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/video-card.jpg"
          alt=""
          className={`w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${
            mobile ? "aspect-[3/4]" : "aspect-[177/287]"
          }`}
        />
        <span className="absolute bottom-[13%] left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-[#1a3d1a] text-white shadow-lg shadow-[#1a3d1a]/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2a5a2a] lg:h-11 lg:w-11">
          <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
        </span>
      </span>
      <span className="mt-2.5 block text-center text-[10px] font-medium leading-snug text-[#46603f] lg:text-[clamp(10px,0.85vw,12.5px)]">
        {tourCaption}
      </span>
    </a>
  );
}

/** Avatar + "invite" plus-button stack used by the social-proof overlays. */
function AvatarStack() {
  return (
    <span className="flex shrink-0 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero/avatar.jpg"
        alt=""
        className="h-8 w-8 rounded-full object-cover ring-2 ring-white/80"
      />
      <span className="-ml-2.5 grid h-8 w-8 place-items-center rounded-full bg-[#1a3d1a] text-white ring-2 ring-white/80">
        <Plus className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative">
      {/* ======================= Desktop + tablet (md and up) ======================= */}
      <div className="relative hidden h-svh flex-col overflow-hidden md:flex">
        {/* Spacer matching the fixed header height so the canvas starts below it */}
        <div aria-hidden="true" className="h-[76px] shrink-0 lg:h-[84px]" />

        <div className="relative flex-1">
          {/* ---- Text layer (sits behind the photos) ---- */}
          <div className="relative z-[5] flex flex-col items-center px-12 pt-[5.4rem] text-center">
            {/* Tablet keeps the badge; the desktop composition stays pure */}
            <span className="mb-5 hidden animate-fade-up items-center gap-2 rounded-full border border-[#1a3d1a]/15 bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46603f] delay-100 md:inline-flex lg:hidden">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e86a10]" aria-hidden="true" />
              {hero.badge}
            </span>
            <Headline />
            {/* Tablet keeps the subtitle; the desktop composition stays pure */}
            <p className="mt-6 max-w-md animate-fade-up text-[15px] leading-relaxed text-[#46603f] delay-700 lg:hidden">
              {hero.subtitle}
            </p>
          </div>

          {/* ---- Side cards ---- */}
          <PlanCard />
          <VideoCard />

          {/* ---- Bottom photo strip ---- */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end">
            {/* Left */}
            <figure className="hero-shot hero-shot-side mask-fade-t relative flex-1 animate-photo-reveal delay-800 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero/bottom-left.jpg"
                alt="Uploading files to Aestora from a laptop"
              />
              <figcaption className="absolute bottom-[clamp(20px,4vh,50px)] left-3 animate-scale-in delay-1000 lg:left-6">
                <span className="flex items-center gap-2.5 rounded-2xl bg-[#0d200d]/30 px-3.5 py-2.5 backdrop-blur-md">
                  <AvatarStack />
                  <span className="leading-tight">
                    <span className="block text-[18px] font-semibold text-white tabular">
                      {usersStat.value}
                    </span>
                    <span className="block text-[11px] font-medium text-white/80">
                      {usersStat.label}
                    </span>
                  </span>
                </span>
              </figcaption>
            </figure>

            {/* Center (widest + tallest) */}
            <figure className="hero-shot hero-shot-center mask-fade-t relative flex-[1.265] animate-photo-reveal delay-600 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero/bottom-center.jpg"
                alt="Aestora cloud storage on phone, everywhere you go"
              />
              <figcaption className="absolute inset-x-0 bottom-[clamp(20px,4vh,50px)] flex animate-scale-in flex-col items-center gap-3.5 text-center delay-1100">
                <span className="mx-auto max-w-[16ch] font-serif-display text-[clamp(20px,2.4vw,32px)] leading-[1.1] text-white [text-shadow:0_2px_18px_rgba(13,32,13,0.45)]">
                  {finalCta.title}
                </span>
                <SmartLink
                  href={hero.primaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#e86a10] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#e86a10]/30 transition-colors duration-300 hover:bg-[#d45e0d]"
                >
                  {hero.primaryCta.label}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </SmartLink>
              </figcaption>
            </figure>

            {/* Right */}
            <figure className="hero-shot hero-shot-side mask-fade-t relative flex-1 animate-photo-reveal delay-900 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero/bottom-right.jpg"
                alt="Sharing files with friends through Aestora"
              />
              <figcaption className="absolute bottom-[clamp(20px,4vh,50px)] right-3 animate-scale-in delay-1200 lg:right-6">
                <span className="flex items-center gap-2.5 rounded-2xl bg-[#0d200d]/30 px-3.5 py-2.5 backdrop-blur-md">
                  <span className="leading-tight">
                    <span className="flex items-center gap-1.5 text-[18px] font-semibold text-white tabular">
                      {uptimeStat.value}
                      <Star
                        className="h-[18px] w-[18px] fill-[#e86a10] text-[#e86a10]"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="block text-[11px] font-medium text-white/80">
                      {uptimeStat.label}
                    </span>
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* ======================= Mobile (below md) ======================= */}
      <div className="relative flex flex-col overflow-hidden md:hidden">
        <div aria-hidden="true" className="h-[76px] shrink-0" />

        <div className="flex flex-col items-center px-6 pt-3 text-center">
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-[#1a3d1a]/15 bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46603f] delay-100">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e86a10]" aria-hidden="true" />
            {hero.badge}
          </span>
          <div className="mt-4">
            <Headline mobile />
          </div>
          <p className="mt-3.5 max-w-sm animate-fade-up text-[14px] leading-relaxed text-[#46603f] delay-400">
            {hero.subtitle}
          </p>
          <SmartLink
            href={hero.primaryCta.href}
            className="group mt-5 inline-flex animate-fade-up items-center gap-2 rounded-full bg-[#e86a10] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#e86a10]/30 transition-colors duration-300 delay-500 hover:bg-[#d45e0d]"
          >
            {hero.primaryCta.label}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </SmartLink>
        </div>

        {/* Two cards side by side */}
        <div className="mt-7 flex items-start gap-3 px-5">
          <PlanCard mobile />
          <VideoCard mobile />
        </div>

        {/* Social proof row */}
        <div className="mt-7 flex animate-scale-in items-center justify-center gap-5 px-6 delay-900">
          <span className="flex items-center gap-2.5">
            <AvatarStack />
            <span className="leading-tight">
              <span className="block text-[17px] font-bold text-[#1a3d1a] tabular">
                {usersStat.value}
              </span>
              <span className="block text-[11px] font-medium text-[#74906f]">
                {usersStat.label}
              </span>
            </span>
          </span>
          <span aria-hidden="true" className="h-9 w-px bg-[#1a3d1a]/15" />
          <span className="leading-tight">
            <span className="flex items-center gap-1.5 text-[17px] font-bold text-[#1a3d1a] tabular">
              {uptimeStat.value}
              <Star
                className="h-[17px] w-[17px] fill-[#e86a10] text-[#e86a10]"
                aria-hidden="true"
              />
            </span>
            <span className="block text-[11px] font-medium text-[#74906f]">
              {uptimeStat.label}
            </span>
          </span>
        </div>

        {/* Bottom photo strip (uncapped heights on mobile) */}
        <div className="mt-8 flex items-end">
          <figure className="hero-shot mask-fade-t flex-1 animate-photo-reveal overflow-hidden delay-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero/bottom-left.jpg" alt="Uploading files to Aestora from a laptop" />
          </figure>
          <figure className="hero-shot mask-fade-t flex-[1.265] animate-photo-reveal overflow-hidden delay-600">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero/bottom-center.jpg" alt="Aestora cloud storage on phone, everywhere you go" />
          </figure>
          <figure className="hero-shot mask-fade-t flex-1 animate-photo-reveal overflow-hidden delay-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero/bottom-right.jpg" alt="Sharing files with friends through Aestora" />
          </figure>
        </div>
      </div>

      {/* ======================= Live storage preview band =======================
          Carries the interactive storage demo and the live stat cards that
          used to sit inside the old hero — same content, fresh skin. */}
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
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-70" />
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
