"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-black/5" aria-label={t("aria")}>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            `radial-gradient(900px 450px at 20% 10%, rgb(var(--primary) / 0.08), transparent 60%),` +
            `radial-gradient(800px 450px at 85% 30%, rgb(var(--primary-light) / 0.10), transparent 60%),` +
            `linear-gradient(135deg, rgb(var(--bg)), rgb(var(--surface)))`,
        }}
      />

      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="h-11 w-11 rounded-2xl border border-black/5 shadow-sm"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(var(--primary) / 0.18), rgb(var(--primary-light) / 0.18), rgb(var(--surface)))",
                }}
                aria-hidden
              />
              <div>
                <div className="text-lg font-bold leading-tight">{t("brandTitle")}</div>
                <div className="text-sm opacity-75">{t("brandSubtitle")}</div>
              </div>
            </div>

            <p className="max-w-md opacity-80 leading-relaxed">{t("brandBody")}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href={`/${locale}#contacto`} className="btn btn-primary">
                {t("ctaContact")}
              </a>
              <a href={`/${locale}#disponibilidad`} className="btn btn-secondary">
                {t("ctaAvailability")}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="text-sm font-semibold uppercase tracking-wide opacity-70">
              {t("sectionsTitle")}
            </div>
            <ul className="space-y-2">
              <li>
                <a className="hover:opacity-80" href={`/${locale}#disponibilidad`}>
                  {t("sectionsAvailability")}
                </a>
              </li>
              <li>
                <a className="hover:opacity-80" href={`/${locale}#opiniones`}>
                  {t("sectionsReviews")}
                </a>
              </li>
              <li>
                <a className="hover:opacity-80" href={`/${locale}#contacto`}>
                  {t("sectionsContact")}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="text-sm font-semibold uppercase tracking-wide opacity-70">
              {t("infoTitle")}
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur px-4 py-3">
                <div className="text-sm font-semibold">{t("infoLocationTitle")}</div>
                <div className="text-sm opacity-80">{t("infoLocationValue")}</div>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur px-4 py-3">
                <div className="text-sm font-semibold">{t("infoBookingTitle")}</div>
                <div className="text-sm opacity-80">{t("infoBookingValue")}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-black/5 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm opacity-75">{t("copyright", { year })}</div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link className="hover:opacity-80" href="/privacidad">
              {t("privacy")}
            </Link>
            <Link className="hover:opacity-80" href="/cookies">
              {t("cookies")}
            </Link>
            <Link className="hover:opacity-80" href="/aviso-legal">
              {t("legal")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
