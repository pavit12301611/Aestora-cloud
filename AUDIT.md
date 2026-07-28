# Bug & design-flaw audit

Everything below was found in the existing code, verified, and fixed. The
project built cleanly before this work — `next build` and `tsc --noEmit` both
passed — so none of these were compiler errors. They were runtime bugs,
accessibility violations, CSS cascade collisions and design decisions that
broke in one theme or one input mode.

---

## 1. Correctness bugs

### `SmartLink` — security `rel` was defeated by prop order
```tsx
{...(isExternal && props.target === "_blank"
  ? { rel: props.rel ?? "noopener noreferrer" }
  : {})}
{...props}          // ← overwrites the rel that was just set
```
The guard was spread **before** `{...props}`, so it was the first thing a
caller's own props overwrote. `<SmartLink target="_blank" rel="nofollow">`
ended up with `rel="nofollow"` alone — `noopener` gone, and the cross-origin
tab gets a live `window.opener` handle back to this page (reverse tabnabbing).
Also only protocol-qualified URLs were considered, so an internal route opened
in a new tab was never guarded.

**Fix:** tokens are merged rather than replaced, `rel` is applied *after* the
spread so it can't be clobbered, and internal `target="_blank"` is covered.

### `Pricing` — `$NaN` on any non-trivial price
```ts
const numeric = parseFloat(defaultPrice.replace("$", ""));
```
Returns `NaN` for `"Free"`, `"£5.99"`, `"$1,299"` — rendering a literal `$NaN`.
The 20% rate was a `* 0.8` literal in the component while the "Save 20%" badge
was a separate hard-coded string, so changing one silently made the other lie.

**Fix:** a numeric `priceMonthly` field on `Plan`, one `ANNUAL_DISCOUNT`
constant that both the maths and the badge derive from, `Intl.NumberFormat`
for display.

### `StoragePanel` — clipboard reported success on failure
```ts
navigator.clipboard.writeText(url).then(...).catch(() => { setCopied(true) })
```
The `.catch` set the **same** success state, so the UI said "Copied!" while the
clipboard still held whatever was there before. Worse, `navigator.clipboard` is
`undefined` on insecure origins, so the call threw a synchronous `TypeError`
that the promise `.catch` never saw. Also leaked a `setTimeout` on unmount.

### `Navbar` — first nav item permanently looked active
`isActive || i === 0` meant "Features" rendered in the active style forever,
so the scroll-spy contradicted itself while you read Pricing or the FAQ.

### `Reveal` — content added after mount stayed invisible forever
Queried `.reveal` exactly once. Since `.reveal` ships `opacity: 0` and only
becomes visible when the observer adds `.is-visible`, anything entering the DOM
later was permanently invisible. Now watches for new nodes.

### `Interactions` — first scroll hit-tested the viewport corner
`px`/`py` default to `0, 0`, and the scroll handler re-runs the hit test. Before
the mouse ever moved, a scroll ran `elementFromPoint(0, 0)` and lit up whatever
card was in the top-left, with the ambient bloom pinned to the corner.

### `ThemeToggle` — cross-tab reset forced the wrong theme
`apply(e.newValue === "light" ? "light" : "dark")` — a `StorageEvent` with
`newValue === null` means the key was *removed* (another tab reverted to
"follow the system"), and this forced dark.

---

## 2. Accessibility

### The `<h1>` literally read "Yourcloud,beautifullysimple."
The headline splits into per-word `inline-block` spans with the gaps faked by
`margin-right`. There is no whitespace in the DOM, so that string is what a
screen reader announced, what a crawler indexed, and what you got by
selecting and copying the heading. Verified in the rendered HTML.

**Fix:** real text in one `sr-only` node; the animated words are `aria-hidden`
decoration.

### `StoragePanel` was `aria-hidden` with focusable buttons inside
An ARIA violation and a keyboard trap — the Share buttons stayed in the tab
order but were removed from the accessibility tree, so a screen-reader user
tabbed to a control that announced *nothing*. Now a labelled group with
Escape-to-close, focus return to the trigger, and a real `progressbar`.

### The marquee hid seven real value propositions
`aria-hidden="true"` on the entire section hid "Private by Default", "99.9%
uptime", "No credit card required" and four others. The *content* is
meaningful; only its duplication is decorative. Now only the seam-hiding second
copy is hidden. Added a hover/focus pause (WCAG 2.2.2 — content that moves for
more than five seconds needs a pause mechanism).

### `focus:outline-none` with no replacement
Two controls removed the keyboard focus ring outright.

### Billing toggle was the wrong widget
An `aria-pressed` button labelled "Toggle billing period" — a screen reader
announced "pressed"/"not pressed" with no indication of *which period* that
meant, and the two visible side labels had no programmatic link to the control.
Now `role="switch"` with associated labels and a `role="status"` announcement
so the price change isn't silent.

### Skip link pointed at a target that didn't exist
`href="#top"` — `#top` is only on the landing page, so on `/login`, `/register`
and the 404 the skip link went nowhere. Every route now renders `#main-content`
(which also gave the auth pages a real `<main>` landmark, which they lacked).

### Share buttons were unreachable on touch
`opacity-0` revealed only via `group-hover` — there is no hover on a phone.

### FAQ: global IDs and landmark spam
Hard-coded `faq-trigger-0`; two FAQ blocks on a page would produce duplicate
IDs and cross-wired `aria-controls`. `role="region"` on all four panels also
floods the landmark list with near-identical entries.

---

## 3. Theming & contrast

### `dark:` utilities ignored the site's own theme toggle
Tailwind v4's stock `dark:` variant compiles to
`@media (prefers-color-scheme: dark)`, but this site's theme is driven by
`data-theme` on `<html>` and is user-toggleable. So a visitor on a dark OS who
switched to the mint theme still got dark-only styles. Fixed with
`@custom-variant`; verified the compiled CSS went from
`prefers-color-scheme:dark` to `[data-theme=dark]`.

### Four utilities were fighting over `::after`
`.glow-ring`, `.ring-gradient`, `.spotlight-edge`, `.ring-conic` and
`.pill-btn` all defined `::after`, and they are routinely combined. Whichever
was defined last silently won — which is why the rotating conic border never
appeared on the hero shell and the fill sweep never ran on the auth submit
button. `.glow-ring` moved to `::before`.

### Primary CTAs nearly invisible in dark mode
Every primary button hard-coded `bg-[#1a3d1a]`. Measured contrast against the
page background:

| Theme | Ratio |
|---|---|
| Mint `#effdf0` | 11.57:1 |
| Night `#0c1b0d` | **1.47:1** |

The buttons all but disappeared. Same class of problem for the hover sweep
(2.2:1) and `hover:text-white` on glass pills (invisible in light mode).

### WCAG AA text failures

| Token | Context | Was | Now |
|---|---|---|---|
| `--text-faint` | body text on mint | 3.35:1 | 4.75:1 |
| `text-accent-400` | on mint | 3.07:1 | 6.25:1 |
| white on `#e86a10` | solid accent buttons | 3.23:1 | 5.8:1 |
| `text-brand-400` | on night | 3.36:1 | 9.77:1 |

Fixed by adding theme-aware semantic tokens (`--ink-link`, `--ink-accent`,
`--accent-solid` + matching ink, `--btn-primary-*`) rather than mutating the
brand ramps, so the palette is preserved and each pairing clears 4.5:1 in both
themes. On dark, the accent button inverts to light-orange-with-dark-ink,
because no usable orange clears 4.5:1 against white.

---

## 4. SEO & performance

- **No OG image.** Metadata advertised Open Graph and Twitter cards but no
  image existed, so every share rendered as a bare text link — and the card was
  set to `summary` (small square) rather than `summary_large_image`. Added a
  generated 1200×630 card.
- **No FAQ JSON-LD.** The README claimed `FAQPage` structured data shipped; it
  didn't. Now generated from the same `faqs` array the UI renders.
- **`sitemap.lastModified` was the build timestamp** — told crawlers every page
  changed on every deploy, even for a CSS tweak, which trains them to distrust
  the signal. `/login` was simultaneously `noindex` *and* listed in the sitemap.
- **Single theme-color** painted the browser chrome mint even in dark mode.
- **Raw `<img>` with no dimensions** — layout shift on every image, and a
  1024×1024 / 159 kB avatar downloaded whole for a 32 px slot. Converted to
  `next/image` with responsive `srcSet`; hero image marked `priority` as the LCP
  element.

---

## 5. Structure

- The canonical origin was re-typed in three files.  → `lib/site.ts`
- `Hero.tsx` ended with a dead `function features()` returning a literal array
  that **shadowed the imported `features` export** from `content.ts` — exactly
  the drift the "all copy lives in content.ts" rule exists to prevent. That
  plus ~10 other hard-coded strings moved into `content.ts`.
- Pricing business logic (discount rate, currency formatting) moved out of the
  view.
- README corrected: it described SEO features that didn't exist, and now
  documents the `next/font` migration as an explicit follow-up.

---

## Verification

- `next build` and `tsc --noEmit` clean.
- Production server checked on `/`, `/login`, `/register` and a 404: all 200/404
  as expected, all with a reachable `#main-content`.
- Compiled CSS inspected to confirm the `dark:` variant retargeted and
  `.glow-ring` moved to `::before`.
- Rendered HTML inspected to confirm the `<h1>` text, the OG image (200,
  135 kB), `robots.txt`, `sitemap.xml`, JSON-LD and `next/image` `srcSet`.
- Contrast ratios computed against the WCAG formula, not eyeballed.

## Not done

`next/font/google` migration — the right fix for the render-blocking Google
Fonts `<link>` (self-hosting, no third-party IP leak, size-adjusted fallback
metrics). It fetches at build time and this sandbox is offline, so shipping it
would have broken the build. Left with `preconnect` and documented in the
README.
