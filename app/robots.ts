// app/robots.ts
import type { MetadataRoute } from "next";

function getBaseUrl() {
  // 👉 Define en Vercel:
  // NEXT_PUBLIC_SITE_URL = https://www.huertadelmedio.com
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;

  if (explicit) return explicit.replace(/\/$/, "");

  // fallback SOLO para local
  return "http://localhost:3000";
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl, // 👉 ayuda a Google a saber dominio canónico
  };
}