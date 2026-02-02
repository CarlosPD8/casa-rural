"use client";

import { siteConfig } from "@/app/siteConfig";

export default function ContactForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No funcional todavía (placeholder)
  }

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="space-y-8">
      <header className="space-y-3">
        <h2 id="contacto-title" className="text-3xl font-bold">
          Contacto
        </h2>
        <p className="max-w-2xl opacity-80">
          Rellena el formulario y te responderemos lo antes posible. (De momento
          el envío está pendiente de activar).
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <form className="card space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="font-medium" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Tu nombre"
              name="name"
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="tu@email.com"
              name="email"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium" htmlFor="message">
              Mensaje
            </label>
            <textarea
              id="message"
              className="w-full min-h-[140px] rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Cuéntanos fechas aproximadas, número de personas, etc."
              name="message"
            />
          </div>

          <button className="btn-primary btn w-full" type="submit">
            Enviar (pendiente)
          </button>

          <p className="text-sm opacity-70">
            También puedes escribir a{" "}
            <a
              className="font-semibold underline decoration-black/20 hover:decoration-black/40"
              href={`mailto:${siteConfig.contact.email}`}
            >
              {siteConfig.contact.email}
            </a>
          </p>
        </form>

        <aside className="card space-y-4">
          <h3 className="text-xl font-semibold">Información rápida</h3>
          <div className="space-y-2 opacity-85">
            <p>
              <span className="font-semibold">Zona:</span>{" "}
              {siteConfig.house.location}
            </p>
            <p>
              <span className="font-semibold">Teléfono:</span>{" "}
              <a
                className="underline decoration-black/20 hover:decoration-black/40"
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              >
                {siteConfig.contact.phone}
              </a>
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                className="underline decoration-black/20 hover:decoration-black/40"
                href={`mailto:${siteConfig.contact.email}`}
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
