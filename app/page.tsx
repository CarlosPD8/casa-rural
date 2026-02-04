import Carousel from "@/components/Carousel";
import Highlights from "@/components/Highlights";
import Amenities from "@/components/Amenities";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";

export default function Home() {
  return (
    <main className="space-y-24">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background decor */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 500px at 20% 10%, rgba(139,99,66,.18), transparent 60%)," +
              "radial-gradient(700px 450px at 90% 20%, rgba(195,165,139,.22), transparent 55%)," +
              "linear-gradient(135deg, rgba(250,247,243,1), rgba(255,255,255,1))",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-50 -z-10"
          style={{ background: "rgba(139,99,66,.18)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-40 -z-10"
          style={{ background: "rgba(195,165,139,.25)" }}
        />

        <div className="container-page pt-16 pb-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur px-4 py-2 shadow-sm">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--brown-600)" }}
                />
                <span className="text-sm font-semibold">
                  Casa rural en Granada · Naturaleza · Tranquilidad
                </span>
              </div>

              {/* Title */}
              <header className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Escápate a una casa rural con encanto{" "}
                  <span className="whitespace-nowrap">en Granada</span>
                </h1>
                <p className="text-lg opacity-85 max-w-xl">
                  Espacios amplios, estilo cálido y todo lo necesario para
                  disfrutar en familia o con amigos. Ideal para desconectar y
                  vivir Granada con calma.
                </p>
              </header>

              {/* Bullets */}
              <ul className="grid sm:grid-cols-2 gap-3 max-w-xl">
                {[
                  "Distribución cómoda para grupos",
                  "Zona tranquila y entorno natural",
                  "Cocina equipada y salón amplio",
                  "Perfecta para fines de semana",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white/70 backdrop-blur px-4 py-3 shadow-sm"
                  >
                    <span
                      className="mt-1 inline-block h-3 w-3 rounded-full"
                      style={{ background: "var(--brown-600)" }}
                    />
                    <span className="opacity-90">{t}</span>
                  </li>
                ))}
              </ul>

              {/* Highlights + CTAs */}
              <div className="space-y-5 pt-2">
                <Highlights />

                <div className="flex flex-wrap gap-3">
                  {/* ✅ ahora va a disponibilidad */}
                  <a href="#disponibilidad" className="btn btn-primary">
                    Consultar disponibilidad
                  </a>
                  <a href="#opiniones" className="btn btn-secondary">
                    Ver opiniones
                  </a>
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[2rem] -z-10 blur-2xl opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,99,66,.22), rgba(195,165,139,.18), rgba(255,255,255,.35))",
                }}
              />
              <Carousel />
              <div className="mt-4 flex flex-wrap gap-2">
                {["Acogedora", "Amplia", "Luminosa", "Perfecta para grupos"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/5 bg-white/75 backdrop-blur px-4 py-2 text-sm shadow-sm"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          aria-hidden
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(91,63,44,.18), transparent)",
          }}
        />
      </section>

      {/* ✅ DISPONIBILIDAD EN HOME */}
      <section id="disponibilidad" className="container-page scroll-mt-24">
        <header className="space-y-3 mb-8">
          <h2 className="text-3xl font-bold">Disponibilidad</h2>
          <p className="max-w-2xl opacity-80">
            Consulta de forma rápida qué días están libres u ocupados. Para
            reservar, envíanos un mensaje con las fechas y el número de
            personas.
          </p>
        </header>

        <AvailabilityCalendar mode="public" />
      </section>

      {/* CONTENT */}
      <section className="container-page">
        <Amenities />
      </section>

      <section className="container-page">
        <Testimonials />
      </section>

      <section className="container-page pb-24">
        <ContactForm />
      </section>

      <footer className="container-page pb-10 text-sm opacity-70">
        © {new Date().getFullYear()} Casa Rural en Granada — Todos los derechos
        reservados.
      </footer>
    </main>
  );
}
