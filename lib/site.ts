/**
 * Single source of truth for site-level constants.
 *
 * The canonical origin used to be re-typed in `app/layout.tsx`, `app/robots.ts`
 * and `app/sitemap.ts` independently, so moving the site to a new domain meant
 * finding three string literals and hoping none were missed.
 */
export const SITE_URL = "https://cloud.aestora.cc";

export const SITE_NAME = "Aestora";

export const SITE_TITLE = "Aestora — Secure Cloud Storage";

export const SITE_DESCRIPTION =
  "Aestora — Your cloud, beautifully simple. Fast, private, and ridiculously easy cloud storage. Upload, share, and access your files from anywhere.";

/** Brand colours that need to exist outside CSS (theme-color, OG image). */
export const BRAND = {
  mint: "#effdf0",
  forest: "#1a3d1a",
  night: "#0c1b0d",
  pumpkin: "#e86a10",
} as const;
