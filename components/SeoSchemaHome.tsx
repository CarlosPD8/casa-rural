// components/SeoSchemaHome.tsx
import Script from "next/script";
import { getTranslations } from "next-intl/server";

function getBaseUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`.replace(/\/$/, "");

  return "http://localhost:3000";
}

type FaqItem = { q: string; a: string };

export default async function SeoSchemaHome({ locale }: { locale: string }) {
  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}/${locale}`;

  const t = await getTranslations({ locale, namespace: "homeSeo" });
  const faq = (t.raw("faq") as FaqItem[]) ?? [];

  const faqMainEntity = faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  }));

  // ✅ Reemplaza por una imagen real absoluta (ideal 1200x630)
  const ogImage = `${baseUrl}/images/og-home.jpg`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      // 1) WebSite
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Vivienda Rural Huerta del Medio",
        inLanguage: locale,
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/${locale}?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },

      // 2) Breadcrumbs
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "es" ? "Inicio" : "Home",
            item: canonical,
          },
        ],
      },

      // 3) LodgingBusiness
      {
        "@type": "LodgingBusiness",
        "@id": `${canonical}#lodging`,
        name: "Vivienda Rural Huerta del Medio",
        url: canonical,
        image: [ogImage],
        description:
          locale === "es"
            ? "Casa rural en Granada ideal para familias y grupos. Consulta disponibilidad y reserva directamente."
            : "Rural accommodation in Granada for families and groups. Check availability and book directly.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Granada",
          addressRegion: "Andalucía",
          addressCountry: "ES",
        },
        priceRange: "€€",
        // ✅ opcional (recomendado): enlace al mapa real (Google Maps share link)
        // hasMap: "https://maps.google.com/?q=....",
        // ✅ opcional: teléfono real
        // telephone: "+34XXXXXXXXX",
      },

      // 4) FAQPage (desde messages, siempre coincide con el visible)
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: faqMainEntity,
      },
    ],
  };

  return (
    <Script
      id={`schema-home-${locale}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
