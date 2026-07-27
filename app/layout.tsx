import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://cloud.aestora.cc";
const DESCRIPTION =
  "Aestora — Your cloud, beautifully simple. Fast, private, and ridiculously easy cloud storage. Upload, share, and access your files from anywhere.";

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
    default: "Aestora — Secure Cloud Storage",
    template: "%s — Aestora",
  },
  description: DESCRIPTION,
  applicationName: "Aestora",
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
    siteName: "Aestora",
    locale: "en_US",
    title: "Aestora — Secure Cloud Storage",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "Aestora — Secure Cloud Storage",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#effdf0",
  width: "device-width",
  initialScale: 1,
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
        {/* Google Fonts: Inter (400/500/600) + DM Serif Display (400, hero display) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
