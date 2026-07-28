import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * `lastModified` used to be `new Date()`, i.e. the build timestamp. That told
 * crawlers every page had just changed on every single deploy — even a CSS
 * tweak — which trains them to distrust the signal. It is now a content
 * revision date that is bumped deliberately when copy actually changes.
 *
 * `/login` is deliberately absent: it is `noindex` and disallowed in
 * robots.txt, and listing a blocked URL in the sitemap is a crawl-budget
 * contradiction that Search Console flags.
 */
const CONTENT_REVISED = new Date("2026-07-28T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: CONTENT_REVISED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/register`,
      lastModified: CONTENT_REVISED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
