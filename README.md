# Aestora Cloud — Site Overhaul

A full visual and front-end overhaul of [cloud.aestora.cc](https://cloud.aestora.cc).

**Every word of the original copy is preserved verbatim.** Nothing about the
product story, pricing, features, or FAQ content changed — only how it looks,
moves, and is built.

---

## Stack

| Layer      | Choice                                  |
| ---------- | --------------------------------------- |
| Framework  | Next.js 15 (App Router, RSC by default) |
| Styling    | Tailwind CSS v4 (CSS-first `@theme`)    |
| Language   | TypeScript (strict)                     |
| Fonts      | System stack (Inter when available)     |
| Runtime JS | ~107 kB first load, fully static        |

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## What changed

### Design system

A token-driven architecture replaces ad-hoc styling. Semantic CSS variables
(`--bg`, `--surface`, `--hairline`, `--text`, `--glow-*`) are defined once per
theme, so every component inherits the right values automatically.

- **Brand ramp** — electric violet built around `#A068FF` (`brand-50 … brand-900`)
- **Accent ramp** — orchid (`accent-300 … accent-600`), with rose as the third hue
- **Type** — Urbanist (600/700) for headings, Inter (400–700) for everything else
- **Geometry** — pill CTAs (`border-radius: 50px`) and softly rounded glass cards
- **Surfaces** — layered glassmorphism with real `backdrop-filter` blur
- **Depth** — gradient hairline borders via `mask-composite`, not flat 1px lines

### Dual theme

Dark by default, light on demand, toggled from the navbar and persisted to
`localStorage`. A tiny inline script in `<head>` applies the stored theme
**before first paint**, so there is no flash of the wrong theme. First-time
visitors get their OS preference.

### Client-side effects (v3)

A single delegated pointer layer (`components/Interactions.tsx`) drives every
interactive effect on the page — one `pointermove` listener, rAF-throttled,
writing CSS custom properties. Nothing is per-component, so adding a class is
all it takes to opt an element in:

| Class        | Effect                                              |
| ------------ | --------------------------------------------------- |
| `.spotlight` | Radial glow tracks the cursor inside the card        |
| `.spotlight-edge` | Card border lights up nearest the cursor        |
| `.tilt`      | 3D perspective tilt (`data-tilt` sets max degrees)   |
| `.magnetic`  | Button leans toward the cursor (`data-magnetic`)     |
| `.sheen`     | Static top-edge gloss on glass panels                |

Static (CSS-only) treatments in the same vocabulary:

| Class              | Effect                                                     |
| ------------------ | ---------------------------------------------------------- |
| `.pill-btn`        | Pill CTA whose violet fill sweeps in from the left on hover |
| `.pill-btn-rtl`    | Same, sweeping from the right — used for secondary CTAs     |
| `.btn-border-wrap` | Rotating conic-gradient border around a pill (`--border-angle`) |
| `.nav-underline`   | Nav underline that draws out from the left                  |
| `.orbit-ring`      | Masked 1px gradient ring used by the hero orbits            |

Plus:

- **Typewriter headline** — the hero h1 types itself in, accent phrase in the
  brand gradient, with a blinking violet caret. The full phrase is always in
  the DOM as visually-hidden text, so SSR, crawlers and screen readers get the
  finished headline; reduced-motion visitors skip the animation entirely.
- **Hero orbits** — four concentric gradient rings counter-rotating at 30/40/50/60s
  behind the storage panel, each carrying glowing nodes that fly in on load
- **Trailing cursor halo** — lerped ring that swells over interactive elements
- **Scroll progress rail** — gradient bar, compositor-only `scaleX`
- **Count-up numerals** — stats animate from zero when scrolled into view,
  preserving prefixes/suffixes (`1,000+`, `99.9%`, `248 MB`)
- **Ambient cursor bloom** — the aurora backdrop brightens around the pointer
- **Scroll-spy navbar** — the active section's pill is highlighted
- **Rotating conic border** on the focal Pro pricing tier

All of it is gated behind `(hover: hover) and (pointer: fine)` and
`prefers-reduced-motion`, so touch devices and motion-sensitive users never pay
for a listener that wouldn't help them.

### Motion

- Scroll-reveal via a single shared `IntersectionObserver` (one observer for the
  whole page, elements unobserved once shown)
- Staggered entrance delays on card grids
- Ambient drifting aurora blooms behind the page
- Live animated upload progress in the hero product mock
- Shine sweep on primary CTAs, lift-on-hover cards
- **Every** animation is disabled under `prefers-reduced-motion: reduce`

### Layout & components

- **Hero** — split layout with a new animated "storage panel" product mock
  (window chrome, dropzone, live upload bar, file list) replacing the plain
  stat row
- **Stat cards** — now show progress bars proportional to their values
- **Features** — gradient-ringed cards with icon tiles and hover glow
- **Stats band** — single unified panel with gradient numerals and dividers
- **Pricing** — the Pro tier is elevated and scaled as a true focal point;
  `Coming soon` tier is visually de-emphasized
- **FAQ** — accessible accordion using `grid-template-rows: 0fr → 1fr` for
  smooth height animation without measuring JS
- **Footer** — rebuilt with real navigation columns and a live status pill

### New pages

The original `/register` route crashed with a React error (#310) in production.
Both auth screens were rebuilt as clean, accessible, presentational shells:

- `/login` — email + password, show/hide toggle, Google option
- `/register` — name, email, password
- `not-found.tsx` — styled 404 matching the original copy

> The auth forms are **UI only**. Wire `AuthForm`'s `onSubmit` to the real
> backend endpoint before shipping.

### Accessibility

- One `<h1>`, correct heading hierarchy throughout
- Skip-to-content link
- `aria-expanded` / `aria-controls` on the accordion and mobile menu
- All decorative SVG and glow layers marked `aria-hidden`
- Visible `:focus-visible` rings on every interactive element
- Labelled icon-only buttons

### SEO

- Full Open Graph + Twitter card metadata
- Per-route titles via a template
- `FAQPage` JSON-LD structured data
- Theme-color meta that responds to color scheme

## Structure

```
app/
  layout.tsx          root shell, metadata, theme bootstrap
  page.tsx            landing page composition
  globals.css         design tokens, themes, utilities
  login/, register/   auth screens
  not-found.tsx       404
components/
  Aurora, Navbar, Hero, StoragePanel, Marquee, Features,
  Stats, Pricing, Faq, FinalCta, Footer, SectionHeading,
  ThemeToggle, Reveal, Logo, AuthShell, AuthForm,
  Interactions, ScrollProgress, Cursor, Counter
lib/
  content.ts          all site copy (single source of truth)
```

All user-facing text lives in `lib/content.ts` — edit copy there, never in
components.
