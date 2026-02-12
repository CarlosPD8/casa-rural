"use client";

import { useTranslations } from "next-intl";

type Testimonial = { name: string; text: string };

export default function Testimonials() {
  const t = useTranslations("reviews");
  const testimonials = t.raw("items") as Testimonial[];

  return (
    <section
      id="opiniones"
      aria-labelledby="opiniones-title"
      className="space-y-8"
    >
      <header className="space-y-3">
        <h2 id="opiniones-title" className="text-3xl font-bold">
          {t("title")}
        </h2>
        <p className="max-w-2xl opacity-80">{t("subtitle")}</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((it) => (
          <article key={it.name} className="card">
            <p className="opacity-85 leading-relaxed">“{it.text}”</p>
            <div className="mt-4 font-semibold">— {it.name}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
