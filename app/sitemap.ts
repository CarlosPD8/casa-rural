// app/sitemap.ts
import type { MetadataRoute } from "next";
import { locales } from "@/i18n/request";

function getBaseUrl() {
  // ✅ Mejor: define NEXT_PUBLIC_SITE_URL="https://www.huertadelmedio.com"
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // ✅ En Vercel, VERCEL_URL suele venir sin protocolo y sin www.
  // Mejor NO confiar en esto para canónica.
  return "https://www.huertadelmedio.com";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  // ✅ lastModified: siempre "ahora" en UTC y NUNCA en el futuro
  const lastModified = new Date();

  // Rutas por idioma
  const routes: MetadataRoute.Sitemap = locales.flatMap((locale) => {
    return [
      {
        url: `${baseUrl}/${locale}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${baseUrl}/${locale}/availability`,
        lastModified,
        changeFrequency: "daily",
        priority: 0.8,
      },
    ];
  });

  return routes;
}