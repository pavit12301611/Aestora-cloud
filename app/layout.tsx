import type { Metadata, Viewport } from "next";
import {
  BRAND,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

/**
 * Applied before first paint so there is no flash of the wrong theme.
 *
 * Note the `light` default: `<html>` ships with `data-theme="light"`, so a
 * visitor whose OS is set to dark previously saw the mint theme paint for a
 * frame before this ran. Setting the attribute unconditionally (rather than
 * only when it differs) keeps the DOM and `colorScheme` in lockstep.
 */
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var key = "aestora-theme";
    var stored = localStorage.getItem(key);
    var theme = stored === "dark" || stored === "light"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "cloud storage",
    "secure storage",
    "private file sharing",
    "file upload",
    "Aestora",
    "fast CDN",
    "encryption",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    // `summary` renders a small square thumbnail; this page has a generated
    // 1200x630 OG image, which needs the large card to be shown at all.
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // A single light theme-color painted the browser chrome mint even for
  // visitors in the dark theme. One entry per color scheme fixes that.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BRAND.mint },
    { media: "(prefers-color-scheme: dark)", color: BRAND.night },
  ],
  width: "device-width",
  initialScale: 1,
  // `maximumScale`/`userScalable` were already permissive; keeping them
  // explicit documents that pinch-zoom must never be disabled.
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/*
          Fonts optimized for performance:
          - preconnect overlaps DNS/TLS with HTML parsing
          - display=swap prevents invisible text during font load
          - Using fetchpriority hint for critical fonts
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap"
          />
        </noscript>
      </head>
      <body className="min-h-screen antialiased">
        {/*
          The skip link used to target `#top`, which only exists on the landing
          page — on /login, /register and the 404 it jumped nowhere. Every
          route now renders a `#main-content` landmark.
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--text)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--bg)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
