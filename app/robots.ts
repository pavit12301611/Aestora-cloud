import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * The site advertised `robots: { index: true }` in metadata but shipped no
 * robots.txt and no sitemap, so crawlers had nothing to discover routes from.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Authenticated / personal areas shouldn't be indexed. `/login` is
      // listed too: its page metadata already sets `noindex`, but a crawler
      // that never fetches the page can't see that.
      disallow: ["/storage", "/reset-password", "/login", "/membership/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
