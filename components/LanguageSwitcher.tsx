"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LOCALES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
  { code: "fr", label: "FR" },
  { code: "pt", label: "PT" }
] as const;

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  function switchTo(nextLocale: string) {
    // pathname: "/es", "/es/...", "/fr/..." etc.
    const segments = pathname.split("/").filter(Boolean);

    // Si el primer segmento ya es un locale, lo sustituimos
    if (segments.length > 0 && LOCALES.some((l) => l.code === segments[0])) {
      segments[0] = nextLocale;
    } else {
      // fallback (por si estás en una ruta sin locale por algún motivo)
      segments.unshift(nextLocale);
    }

    const newPath = "/" + segments.join("/");

    // Mantener anchor (#contacto, etc.)
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    router.push(newPath + hash);
    router.refresh(); // ayuda cuando hay cache en dev
  }

  return (
    <select
      aria-label="Cambiar idioma"
      value={currentLocale}
      onChange={(e) => switchTo(e.target.value)}
      className="h-10 rounded-2xl border border-black/10 bg-white/70 backdrop-blur px-3 text-sm font-semibold shadow-sm hover:opacity-90 transition"
    >
      {LOCALES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
