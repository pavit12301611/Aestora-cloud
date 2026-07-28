import type { ReactNode } from "react";
import Image from "next/image";
import {
  hero,
  heroStats,
  heroTrustBadges,
  heroVisual,
  plans,
  stats,
} from "@/lib/content";
import StoragePanel from "./StoragePanel";
import Counter from "./Counter";
import SmartLink from "./SmartLink";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Play,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

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

function desktopMotion(
  animation: "fade-up" | "slide-in-right" | "scale-in",
  delay: number
) {
  return `desktop-animate-${animation} desktop-delay-${delay}`;
}

function Headline() {
  /*
    The headline is split per word so the desktop entrance can stagger. Each
    word sat in its own `inline-block` with the gap faked by `margin-right`,
    which meant the DOM text was literally "Yourcloud,beautifullysimple." —
    that is what a screen reader announced, what a crawler indexed, and what
    you got when you selected and copied the heading.

    The accessible text now lives in one `sr-only` node, and the animated
    words are `aria-hidden` decoration carrying real whitespace between them.
  */
  const accessibleText = `${hero.titleLead} ${hero.titleAccent}`;

  const renderLine = (words: string[], offset: number, accent = false) =>
    words.map((word, i) => (
      <span
        key={`${offset}-${word}`}
        className={`mr-[0.22em] inline-block last:mr-0 md:opacity-0 desktop-animate-word-pop ${
          accent ? "text-gradient" : ""
        } ${desktopWordDelays[offset + i] ?? "desktop-delay-400"}`}
      >
        {word}
      </span>
    ));

  return (
    <h1 className="font-serif-display text-[clamp(2.75rem,10vw,3.8rem)] font-normal leading-[0.98] tracking-tight text-[var(--text)] sm:text-[clamp(3.2rem,8vw,4.5rem)] md:text-[clamp(3.2rem,4.4vw,4.5rem)]">
      <span className="sr-only">{accessibleText}</span>
      <span aria-hidden="true">
        <span className="block">{renderLine(line1, 0)}</span>
        <span className="block">{renderLine(line2, line1.length, true)}</span>
      </span>
    </h1>
  );
}

function AvatarStack() {
  return (
    <span className="flex shrink-0 items-center">
      {/* next/image so a 1024x1024 source isn't shipped whole for a 32px
          slot, and so the box is reserved before the bytes land. */}
      <Image
        src="/hero/avatar.jpg"
        alt=""
        width={32}
        height={32}
        sizes="32px"
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
    <div className="ring-gradient glow-ring relative overflow-hidden rounded-[1.45rem] bg-[rgb(var(--surface-strong))] px-4 py-3 shadow-[0_20px_42px_-34px_var(--brand-glow-soft)] backdrop-blur-2xl sm:px-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/70 to-transparent"
      />
      <div className="relative flex items-center gap-1.5 text-lg font-semibold tracking-tight text-[var(--text)] tabular">
        {value}
        {icon}
      </div>
      <div className="relative mt-0.5 text-xs font-medium text-muted">{label}</div>
    </div>
  );
}

function PlanMiniCard({ className = "" }: { className?: string }) {
  return (
    <SmartLink
      href="#pricing"
      aria-label={`${proPlan.name}, ${proPlan.price}${proPlan.period} — see pricing`}
      className={`spotlight spotlight-edge ring-gradient group rounded-[1.6rem] bg-[rgb(var(--surface-strong))] p-3 shadow-[0_20px_45px_-34px_var(--brand-glow)] backdrop-blur-xl transition-transform duration-300 md:hover:-translate-y-1 ${className}`}
    >
      <span className="flex items-center gap-3">
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-[4.5rem] sm:w-[4.5rem]">
          <Image
            src="/hero/plan-card.jpg"
            alt=""
            fill
            sizes="(min-width: 640px) 72px, 64px"
            className="object-cover transition-transform duration-700 md:group-hover:scale-105"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="inline-flex rounded-full bg-accent-400/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-accent">
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
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 md:group-hover:-translate-y-0.5 md:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </span>
    </SmartLink>
  );
}

function TourMiniCard({ className = "" }: { className?: string }) {
  return (
    <a
      href="#features"
      aria-label={heroVisual.tourCaption}
      className={`spotlight spotlight-edge ring-gradient group rounded-[1.6rem] bg-[rgb(var(--surface-strong))] p-3 shadow-[0_20px_45px_-34px_var(--brand-glow)] backdrop-blur-xl transition-transform duration-300 md:hover:-translate-y-1 ${className}`}
    >
      <span className="flex items-center gap-3">
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-[4.5rem] sm:w-[4.5rem]">
          <Image
            src="/hero/video-card.jpg"
            alt=""
            fill
            sizes="(min-width: 640px) 72px, 64px"
            className="object-cover transition-transform duration-700 md:group-hover:scale-105"
          />
          <span className="absolute inset-0 grid place-items-center bg-[#0d200d]/20">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-400 text-white shadow-lg shadow-accent-400/25 transition-transform duration-300 md:group-hover:scale-110">
              <Play className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden="true" />
            </span>
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-[var(--text)]">
            {heroVisual.tourTitle}
          </span>
          <span className="mt-1 block text-sm leading-snug text-muted">
            {heroVisual.tourCaption}
          </span>
        </span>
      </span>
    </a>
  );
}

const fileRows = [
  {
    name: "Client-assets.zip",
    meta: "Shared privately • 184 MB",
    pct: 78,
    tone: "bg-accent-400",
    icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
  },
  {
    name: "Launch-video.mp4",
    meta: "CDN ready • 96 MB",
    pct: 56,
    tone: "bg-brand-500",
    icon: <Zap className="h-4 w-4" aria-hidden="true" />,
  },
  {
    name: "Tax-documents.pdf",
    meta: "Locked vault • 22 MB",
    pct: 92,
    tone: "bg-plasma-500",
    icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
  },
];

function FileRow({
  name,
  meta,
  pct,
  tone,
  icon,
}: {
  name: string;
  meta: string;
  pct: number;
  tone: string;
  icon: ReactNode;
}) {
  return (
    <div className="group rounded-2xl border border-white/55 bg-white/64 p-3 shadow-[0_18px_42px_-34px_rgba(26,61,26,0.65)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.07]">
      <div className="flex items-center gap-3">
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${tone} text-white shadow-lg shadow-brand-900/10`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-sm font-semibold text-[var(--text)]">{name}</p>
            <p className="text-xs font-bold text-ink-accent tabular">{pct}%</p>
          </div>
          <p className="mt-0.5 truncate text-xs font-medium text-muted">{meta}</p>
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[rgb(var(--hairline))]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 via-plasma-400 to-accent-400 shadow-[0_0_14px] shadow-accent-400/35"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ActionTile({
  eyebrow,
  title,
  body,
  icon,
}: {
  eyebrow: string;
  title: string;
  body: string;
  icon: ReactNode;
}) {
  return (
    <div className="ring-gradient rounded-[1.45rem] bg-[rgb(var(--surface-strong))] p-4 shadow-[0_18px_42px_-34px_var(--brand-glow)] backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20 dark:bg-brand-300 dark:text-brand-900">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-faint">{eyebrow}</p>
          <p className="mt-1 text-sm font-semibold text-[var(--text)]">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{body}</p>
        </div>
      </div>
    </div>
  );
}

function StorageDial() {
  const used = heroStats[0].pct;
  const degrees = used * 3.6;

  return (
    <div className="relative mx-auto grid h-36 w-36 place-items-center sm:h-40 sm:w-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full shadow-[0_22px_60px_-24px_var(--brand-glow)]"
        style={{
          background: `conic-gradient(var(--color-accent-400) 0deg, var(--color-plasma-400) ${degrees}deg, rgb(var(--hairline)) ${degrees}deg 360deg)`,
        }}
      />
      <div className="absolute inset-3 rounded-full bg-[rgb(var(--surface-strong))] shadow-inner backdrop-blur-xl" />
      <div className="relative text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-faint">Today used</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text)] tabular">
          {heroStats[0].value}
        </p>
        <p className="mt-1 text-xs font-medium text-muted">{heroStats[0].hint}</p>
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div
      className={`relative lg:pl-4 lg:opacity-0 wide-animate-hero-shell wide-delay-300 ${desktopMotion("slide-in-right", 500)}`}
    >



      <div
        aria-hidden="true"
        className="absolute -inset-7 -z-10 rounded-[3.5rem] opacity-90 blur-3xl"
        style={{
          background:
            "radial-gradient(52% 52% at 70% 16%, var(--glow-a), transparent 72%), radial-gradient(50% 50% at 18% 82%, var(--glow-c), transparent 76%)",
        }}
      />

      <div className="ring-conic glow-ring relative overflow-hidden rounded-[2rem] border border-[rgb(var(--hairline-strong))] bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(255,255,255,0.44))] p-4 shadow-[0_42px_105px_-54px_var(--brand-glow)] backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-5 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.045))]">
        <div aria-hidden="true" className="hero-visual-grid absolute inset-0 opacity-70" />
        <div aria-hidden="true" className="absolute -right-28 -top-24 h-72 w-72 rounded-full bg-accent-400/16 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-brand-500/14 blur-3xl" />

        <div className="relative z-10 grid gap-4">
          <div className="flex items-center justify-between gap-3 rounded-[1.55rem] border border-white/55 bg-white/62 px-4 py-3 shadow-[0_18px_46px_-36px_rgba(26,61,26,0.6)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20 dark:bg-brand-300 dark:text-brand-900">
                <Sparkles className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">Aestora Drive</p>
                <p className="text-xs font-medium text-muted">Private workspace dashboard</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-400/12 px-3 py-1.5 text-xs font-bold text-ink-accent ring-1 ring-accent-400/18">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-70 md:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              {heroVisual.liveBadge}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/55 bg-white/58 p-4 shadow-[0_24px_70px_-48px_rgba(26,61,26,0.7)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055] sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-faint">
                  Storage allocation
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl">
                  1 GB free every day
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                  Drag files in, share a private link, and let Aestora clean up the clutter automatically.
                </p>
              </div>
              <StorageDial />
            </div>
          </div>

          <div className="grid gap-3">
            {fileRows.map((file) => (
              <FileRow key={file.name} {...file} />
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[1.85rem] bg-brand-900 p-4 text-white shadow-[0_30px_85px_-45px_rgba(7,22,7,0.95)] sm:p-5">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(232,106,16,0.34),transparent_35%),radial-gradient(circle_at_88%_90%,rgba(143,207,147,0.20),transparent_42%)]"
            />
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/62">
                  Share link
                </p>
                <p className="mt-1 text-lg font-semibold">Ready in one click</p>
              </div>
              <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/12">
                Private
              </span>
            </div>

            <div className="relative z-10 mt-4 rounded-[1.55rem] border border-white/12 bg-white/[0.08] p-3.5 backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-full bg-white/[0.08] px-3.5 py-2 text-xs font-medium text-white/90 ring-1 ring-white/10">
                <span className="inline-flex items-center gap-2 truncate">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-accent-300" aria-hidden="true" />
                  <span className="truncate font-mono">aestora.cloud/s/secure-vault</span>
                </span>
                <span className="shrink-0 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold text-white">
                  Active
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/[0.08] p-3 ring-1 ring-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/48">
                    Expires
                  </p>
                  <p className="mt-1 text-xl font-semibold tabular">30d</p>
                </div>
                <div className="rounded-2xl bg-white/[0.08] p-3 ring-1 ring-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/48">
                    Uptime
                  </p>
                  <p className="mt-1 text-xl font-semibold tabular">99.9%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ActionTile
              eyebrow="Upload"
              title="Drop files anywhere"
              body="Instant previews and clean file states."
              icon={<Plus className="h-[18px] w-[18px]" aria-hidden="true" />}
            />
            <ActionTile
              eyebrow="Security"
              title="Private by default"
              body="Files stay locked until shared."
              icon={<ShieldCheck className="h-[18px] w-[18px]" aria-hidden="true" />}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <PlanMiniCard />
            <TourMiniCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-55" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 noise" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-a), transparent 66%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-[22rem] w-[22rem] rounded-full opacity-55 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-c), transparent 68%)" }}
      />

      <div aria-hidden="true" className="h-[76px] shrink-0 lg:h-[84px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-[0.96fr_1.04fr] md:gap-12 md:py-16 lg:px-12 lg:gap-14 lg:py-20">
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

          <p
            className={`mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg md:mx-0 ${desktopMotion("fade-up", 500)}`}
          >
            {hero.subtitle}
          </p>

          <div
            className={`mt-5 inline-flex flex-wrap items-center justify-center gap-3 rounded-[1.35rem] border border-[rgb(var(--hairline))] bg-[rgb(var(--surface-strong))] px-4 py-3 text-sm text-muted shadow-[0_18px_42px_-34px_var(--brand-glow-soft)] backdrop-blur-xl md:justify-start ${desktopMotion("fade-up", 600)}`}
          >
            <span className="inline-flex items-center gap-2 font-semibold text-[var(--text)]">
              <Sparkles className="h-4 w-4 text-accent-400" aria-hidden="true" />
              {heroVisual.craftedLine}
            </span>
            <span
              aria-hidden="true"
              className="hidden h-1 w-1 rounded-full bg-[rgb(var(--hairline-strong))] sm:block"
            />
            <span className="text-sm text-muted">{usersStat.value} active users already onboard</span>
          </div>

          <div
            className={`mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start ${desktopMotion("fade-up", 700)}`}
          >
            <SmartLink
              href={hero.primaryCta.href}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full btn-accent px-7 py-3.5 text-sm font-semibold shadow-lg shadow-accent-400/25 sm:w-auto"
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

          <div
            className={`mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 ${desktopMotion("fade-up", 800)}`}
          >
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

          <div
            className={`mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium text-muted md:justify-start ${desktopMotion("fade-up", 900)}`}
          >
            {heroTrustBadges.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent-400" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>

      <section className="relative pb-16 pt-10 sm:pb-24 sm:pt-16" aria-label="Live storage preview">
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
