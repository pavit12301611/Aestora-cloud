import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cloud.aestora.cc"),
  title: {
    default: "Aestora — Secure Cloud Storage",
    template: "%s — Aestora",
  },
  description:
    "Aestora is fast, private, and ridiculously easy cloud storage. Upload, share, and access your files from anywhere.",
  keywords: [
    "cloud storage",
    "file sharing",
    "secure uploads",
    "private cloud",
    "Aestora",
  ],
  openGraph: {
    type: "website",
    url: "https://cloud.aestora.cc",
    siteName: "Aestora",
    title: "Aestora — Secure Cloud Storage",
    description:
      "Fast, private, and ridiculously easy cloud storage. Upload, share, and access your files from anywhere.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aestora — Secure Cloud Storage",
    description:
      "Fast, private, and ridiculously easy cloud storage. Upload, share, and access your files from anywhere.",
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
};

/* Applied before paint to avoid a theme flash. */
const themeBootstrap = `
(function () {
  try {
    var stored = localStorage.getItem("aestora-theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
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
