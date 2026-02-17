"use client";

import { useLocale, useTranslations } from "next-intl";

export default function HomeSeo() {
  const locale = useLocale();
  const t = useTranslations("homeSeo");

  const bullets = t.raw("bullets") as string[];

  return (
    <section className="container-page">
      <div className="card space-y-8">
        <header className="space-y-3">
          <h2 className="text-3xl font-bold">{t("title")}</h2>
          <p className="opacity-85 max-w-3xl">{t("intro")}</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <article className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold">{t("section1Title")}</h3>
            <p className="opacity-85 leading-relaxed">{t("section1Body")}</p>

            <h3 className="text-xl font-semibold pt-2">{t("section2Title")}</h3>
            <p className="opacity-85 leading-relaxed">{t("section2Body")}</p>

            <h3 className="text-xl font-semibold pt-2">{t("section3Title")}</h3>
            <p className="opacity-85 leading-relaxed">{t("section3Body")}</p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a href={`/${locale}#disponibilidad`} className="btn btn-primary">
                {t("ctaAvailability")}
              </a>
              <a href={`/${locale}#contacto`} className="btn btn-secondary">
                {t("ctaContact")}
              </a>
            </div>
          </article>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur p-5">
              <h3 className="text-lg font-semibold mb-3">{t("asideTitle")}</h3>
              <ul className="space-y-2">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[rgb(var(--primary))]" />
                    <span className="opacity-85">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur p-5">
              <h3 className="text-lg font-semibold mb-2">{t("noteTitle")}</h3>
              <p className="opacity-85">{t("noteBody")}</p>
            </div>
          </aside>
        </div>

        {/* FAQ indexable */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{t("faqTitle")}</h3>

          <div className="grid md:grid-cols-2 gap-3">
            {(
              t.raw("faq") as Array<{
                q: string;
                a: string;
              }>
            ).map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur p-5"
              >
                <summary className="cursor-pointer font-semibold">
                  {item.q}
                </summary>
                <p className="mt-3 opacity-85 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
