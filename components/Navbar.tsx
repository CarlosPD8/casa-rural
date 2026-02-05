"use client";

import { useEffect, useState } from "react";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "La casa", href: "#la-casa" },
  { label: "Disponibilidad", href: "#disponibilidad" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú al navegar
  const onNavClick = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={[
          "transition-all",
          scrolled
            ? "border-b border-black/5 bg-white/70 backdrop-blur shadow-sm"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="container-page h-16 flex items-center justify-between">
          {/* Brand */}
          <a href="#" className="flex items-center gap-3 group" onClick={onNavClick}>
            <span
              aria-hidden
              className="h-10 w-10 rounded-2xl border border-black/5 shadow-sm transition-transform group-hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, rgb(var(--primary) / 0.22), rgb(var(--primary-light) / 0.22), rgb(var(--surface)))",
              }}
            />
            <span className="leading-tight">
              <span className="block font-bold">Casa Rural</span>
              <span className="block text-xs opacity-70">Granada</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium opacity-80 hover:opacity-100 transition"
              >
                {item.label}
              </a>
            ))}

            <a href="#contacto" className="btn btn-primary">
              Reservar
            </a>
          </nav>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-2">
            <a href="#contacto" className="btn btn-primary !px-4 !py-2" onClick={onNavClick}>
              Reservar
            </a>

            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white/70 backdrop-blur shadow-sm"
            >
              {/* Icon */}
              <div className="relative h-4 w-5">
                <span
                  className={[
                    "absolute left-0 top-0 h-[2px] w-5 rounded-full bg-black/70 transition-transform",
                    open ? "translate-y-[7px] rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-black/70 transition-opacity",
                    open ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-black/70 transition-transform",
                    open ? "translate-y-[-7px] -rotate-45" : "",
                  ].join(" ")}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open ? (
          <div className="lg:hidden border-t border-black/5 bg-white/80 backdrop-blur">
            <div className="container-page py-4">
              <nav aria-label="Menú móvil" className="grid gap-2">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onNavClick}
                    className="rounded-2xl px-4 py-3 text-sm font-medium bg-white/70 border border-black/5 shadow-sm hover:opacity-90 transition"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-4 rounded-2xl border border-black/5 bg-[rgb(var(--muted))] p-4">
                <div className="text-sm font-semibold">Consejo</div>
                <div className="text-sm opacity-80">
                  Consulta disponibilidad y escríbenos por WhatsApp o el formulario.
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
