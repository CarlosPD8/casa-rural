"use client";

import { useTranslations } from "next-intl";
import Carousel from "@/components/Carousel";
import { INTERIOR_SLIDES } from "@/lib/gallery";

export default function Amenities() {
  const t = useTranslations("house");

  const amenities = t.raw("amenities") as string[];
  const chips = t.raw("chips") as string[];

  return (
    <section aria-labelledby="la-casa" className="space-y-10">
      <header className="space-y-3">
        <h2 id="la-casa" className="text-3xl font-bold">
          {t("title")}
        </h2>
        <p className="max-w-2xl opacity-80">{t("intro")}</p>
      </header>

      {/* ✅ Carrusel interior */}
      <Carousel
        images={INTERIOR_SLIDES}
        intervalMs={6000}
        ariaLabel="Galería interior de la casa rural"
      />

      <div className="grid md:grid-cols-3 gap-6">
        <article className="card md:col-span-2">
          <h3 className="text-xl font-semibold mb-2">
            {t("sectionTitle")}
          </h3>
          <p className="opacity-80 leading-relaxed">
            {t("sectionBody")}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full bg-[rgb(var(--muted))] px-4 py-2 border border-black/5"
              >
                {c}
              </span>
            ))}
          </div>
        </article>

        <aside className="card">
          <h3 className="text-xl font-semibold mb-3">
            {t("servicesTitle")}
          </h3>
          <ul className="space-y-2">
            {amenities.map((a) => (
              <li key={a} className="flex gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[rgb(var(--primary))]" />
                <span className="opacity-85">{a}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
