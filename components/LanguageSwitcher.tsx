"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";

const locales = ["es", "en", "it", "fr", "pt"] as const;

const flags: Record<string, string> = {
  es: "🇪🇸",
  en: "🇬🇧",
  it: "🇮🇹",
  fr: "🇫🇷",
  pt: "🇵🇹",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpen(false);
  };

  // cerrar si click fuera
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center gap-2 h-10 px-4 rounded-2xl border border-black/10 bg-white/70 backdrop-blur shadow-sm hover:shadow-md transition"
      >
        <span className="text-lg leading-none">
          {flags[locale]}
        </span>

        {/* Chevron */}
        <svg
          className="w-4 h-4 opacity-70"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-2xl border border-black/5 bg-white shadow-lg overflow-hidden">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => changeLocale(loc)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-black/5 transition ${
                loc === locale ? "font-semibold bg-black/5" : ""
              }`}
            >
              <span className="text-lg">{flags[loc]}</span>
              <span className="uppercase">{loc}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
