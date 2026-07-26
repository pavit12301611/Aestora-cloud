import type { MetadataRoute } from "next";

const SITE_URL = "https://cloud.aestora.cc";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/login`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/register`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
