import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://cloud.aestora.cc";
const DESCRIPTION =
  "Aestora — Secure Cloud Storage. Fast, private, and ridiculously easy cloud storage. Upload, share, and access your files from anywhere.";

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
    <html lang="en" data-theme="dark">
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
      <body className="min-h-screen antialiased bg-[#060218]">
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
