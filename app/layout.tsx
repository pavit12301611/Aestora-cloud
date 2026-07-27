import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./marketeam.css";

const SITE_URL = "https://cloud.aestora.cc";
const DESCRIPTION =
  "Marketeam — Unlock top marketing talent you thought was out of reach. Now just one click away.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marketeam — Unlock Top Marketing Talent",
    template: "%s — Marketeam",
  },
  description: DESCRIPTION,
  applicationName: "Marketeam",
  keywords: [
    "marketing talent",
    "freelance marketers",
    "growth specialists",
    "marketing platform",
    "Marketeam",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Marketeam",
    locale: "en_US",
    title: "Marketeam — Unlock Top Marketing Talent",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "Marketeam — Unlock Top Marketing Talent",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060218",
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
    <html lang="en">
      <head>
        {/* Google Fonts: Inter (400/500/600/700) + Urbanist (600/700) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Urbanist:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
