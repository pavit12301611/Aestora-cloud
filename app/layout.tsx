import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://cloud.aestora.cc";
const DESCRIPTION =
  "Aestora is fast, private, and ridiculously easy cloud storage. Upload, share, and access your files from anywhere.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aestora — Secure Cloud Storage",
    template: "%s — Aestora",
  },
  description: DESCRIPTION,
  applicationName: "Aestora",
  keywords: [
    "cloud storage",
    "file sharing",
    "secure uploads",
    "private cloud",
    "Aestora",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Aestora",
    locale: "en_US",
    title: "Aestora — Secure Cloud Storage",
    description: DESCRIPTION,
  },
  twitter: {
    // `summary_large_image` promises an image the site does not ship, so
    // Twitter/X falls back to a bare, broken-looking card. `summary` is the
    // honest card type until real OG artwork exists in /public.
    card: "summary",
    title: "Aestora — Secure Cloud Storage",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05060f" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
  ],
  width: "device-width",
  initialScale: 1,
  // The default of 1 locked users out of pinch-zoom on mobile.
  maximumScale: 5,
  userScalable: true,
};

/**
 * Applied before paint to avoid a theme flash.
 *
 * Only ever writes a value from a known allow-list, so a corrupted or
 * hand-edited localStorage entry can't put `data-theme="null"` (or anything
 * else with no matching CSS) on <html> and leave the page unstyled.
 */
const themeBootstrap = `
(function () {
  try {
    var stored = localStorage.getItem("aestora-theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        {/* `.reveal` starts at opacity:0 and is only un-hidden by an
            IntersectionObserver. Without JS that observer never runs, so
            most of the page would render permanently blank. */}
        <noscript>
          <style>{`.reveal,.word{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
