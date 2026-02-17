// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { locales } from "@/i18n/request";

function getBaseUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`.replace(/\/$/, "");

  // Fallback local
  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const lang = locales.includes(cookieLocale as any) ? cookieLocale : "es";

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
