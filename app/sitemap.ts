// app/sitemap.ts
import type { MetadataRoute } from "next";
import { locales } from "@/i18n/request";

function getBaseUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`.replace(/\/$/, "");

  return "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const routes = locales.flatMap((locale) => {
    return [
      {
        url: `${baseUrl}/${locale}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/${locale}/availability`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.8,
      },
    ];
  });

  return routes;
}
