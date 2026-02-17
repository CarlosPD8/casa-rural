import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/request";

function getBaseUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`.replace(/\/$/, "");

  return "http://localhost:3000";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}/${locale}/availability`;

  const title =
    locale === "es"
      ? "Disponibilidad | Vivienda Rural Huerta del Medio en Granada"
      : "Availability | Vivienda Rural Huerta del Medio in Granada";

  const description =
    locale === "es"
      ? "Consulta el calendario de disponibilidad de nuestra casa rural en Granada y reserva tus fechas directamente por WhatsApp o formulario."
      : "Check availability of our rural house in Granada and book your stay via WhatsApp or contact form.";

  const languages = Object.fromEntries(
    locales.map((l) => [l, `${baseUrl}/${l}/availability`])
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": `${baseUrl}/es/availability`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Vivienda Rural Huerta del Medio",
      type: "website",
    },
  };
}
