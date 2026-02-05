import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-24 border-t border-black/5"
      aria-label="Pie de página"
    >
      {/* Fondo suave */}
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
          {/* Marca */}
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
                <div className="text-lg font-bold leading-tight">
                  Casa Rural en Granada
                </div>
                <div className="text-sm opacity-75">
                  Naturaleza · Tranquilidad · Escapadas
                </div>
              </div>
            </div>

            <p className="max-w-md opacity-80 leading-relaxed">
              Disfruta de una estancia acogedora cerca de Granada: espacios amplios,
              entorno natural y la calma perfecta para desconectar.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#contacto" className="btn btn-primary">
                Contactar
              </a>
              <a href="#disponibilidad" className="btn btn-secondary">
                Ver disponibilidad
              </a>
            </div>
          </div>

          {/* Enlaces */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-sm font-semibold uppercase tracking-wide opacity-70">
              Secciones
            </div>
            <ul className="space-y-2">
              <li>
                <a className="hover:opacity-80" href="#disponibilidad">
                  Disponibilidad
                </a>
              </li>
              <li>
                <a className="hover:opacity-80" href="#opiniones">
                  Opiniones
                </a>
              </li>
              <li>
                <a className="hover:opacity-80" href="#contacto">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-sm font-semibold uppercase tracking-wide opacity-70">
              Información
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur px-4 py-3">
                <div className="text-sm font-semibold">Ubicación</div>
                <div className="text-sm opacity-80">
                  Granada, Andalucía (España)
                </div>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur px-4 py-3">
                <div className="text-sm font-semibold">Reservas</div>
                <div className="text-sm opacity-80">
                  Escríbenos por el formulario o por WhatsApp.
                </div>
              </div>

              {/* Si quieres poner email/teléfono real, añade aquí */}
              {/* 
              <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur px-4 py-3">
                <div className="text-sm font-semibold">Email</div>
                <a className="text-sm hover:opacity-80" href="mailto:reservas@tudominio.com">
                  reservas@tudominio.com
                </a>
              </div>
              */}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-12 flex flex-col gap-4 border-t border-black/5 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm opacity-75">
            © {year} Casa Rural en Granada. Todos los derechos reservados.
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {/* Si aún no tienes páginas legales, déjalo como anchors o quítalo */}
            <Link className="hover:opacity-80" href="/privacidad">
              Privacidad
            </Link>
            <Link className="hover:opacity-80" href="/cookies">
              Cookies
            </Link>
            <Link className="hover:opacity-80" href="/aviso-legal">
              Aviso legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
