import type { MetadataRoute } from "next";

/**
 * The site advertised `robots: { index: true }` in metadata but shipped no
 * robots.txt and no sitemap, so crawlers had nothing to discover routes from.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Authenticated / personal areas shouldn't be indexed.
      disallow: ["/storage", "/reset-password"],
    },
    sitemap: "https://cloud.aestora.cc/sitemap.xml",
  };
}
