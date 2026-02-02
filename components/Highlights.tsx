import { siteConfig } from "@/app/siteConfig";

export default function Highlights() {
  const h = siteConfig.house;

  const items = [
    { label: "Capacidad", value: `${h.guests} personas` },
    { label: "Dormitorios", value: `${h.bedrooms}` },
    { label: "Baños", value: `${h.bathrooms}` },
    { label: "Tamaño", value: h.size },
    { label: "Zona", value: h.location },
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
