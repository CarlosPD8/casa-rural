import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/request";
import { useTranslations } from "next-intl";

// ⚠️ Ajusta este import si tu componente se llama distinto
import AvailabilityCalendar from "@/components/AvailabilityCalendar";

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
  ) as Record<string, string>;

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

export default function AvailabilityPage({
  params,
}: {
  params: { locale: string };
}) {
  // (Opcional) si quieres forzar locale aquí también, puedes hacerlo en server component.
  // En un page.tsx de App Router, esto ya es Server Component por defecto.
  const t = useTranslations("availabilityPage");

  return (
    <main className="container-page space-y-8 py-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="opacity-80 max-w-2xl">{t("description")}</p>
      </header>

      <AvailabilityCalendar mode="public" />
    </main>
  );
}
