// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { locales } from "@/i18n/request";
import { Analytics } from "@vercel/analytics/next";

function getBaseUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`.replace(/\/$/, "");

  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
};

type Locale = (typeof locales)[number];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  const lang: Locale = locales.includes(cookieLocale as Locale)
    ? (cookieLocale as Locale)
    : "es";

  return (
    <html lang={lang}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
