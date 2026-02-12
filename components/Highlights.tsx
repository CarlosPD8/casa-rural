"use client";

import { siteConfig } from "@/app/siteConfig";
import { useTranslations } from "next-intl";

export default function Highlights() {
  const t = useTranslations("highlights");
  const h = siteConfig.house;

  const items = [
    { label: t("capacity"), value: t("capacityValue", { count: h.guests }) },
    { label: t("bedrooms"), value: String(h.bedrooms) },
    { label: t("bathrooms"), value: String(h.bathrooms) },
    { label: t("size"), value: h.size },
    { label: t("area"), value: h.location },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-2xl bg-white/80 backdrop-blur border border-black/5 px-4 py-3 shadow-sm"
        >
          <div className="text-xs uppercase tracking-wide opacity-70">
            {it.label}
          </div>
          <div className="text-base font-semibold">{it.value}</div>
        </div>
      ))}
    </div>
  );
}
