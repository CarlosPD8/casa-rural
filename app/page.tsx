import Carousel from "@/components/Carousel";
import Highlights from "@/components/Highlights";
import Amenities from "@/components/Amenities";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";



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
    background: `
      radial-gradient(800px 600px at 15% 20%, rgb(var(--primary) / 0.35), transparent 65%),
      radial-gradient(700px 500px at 80% 15%, rgb(var(--primary-light) / 0.30), transparent 60%),
      radial-gradient(600px 600px at 70% 80%, rgb(var(--primary-dark) / 0.22), transparent 65%),
      radial-gradient(900px 500px at 30% 85%, rgb(var(--primary-light) / 0.18), transparent 70%),
      linear-gradient(
        135deg,
        rgb(var(--bg)),
        rgb(var(--surface))
      )
    `,
  }}
/>

      <div
  aria-hidden
  className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full blur-[100px] opacity-60 -z-10"
  style={{ background: "rgb(var(--primary) / 0.35)" }}
/>

<div
  aria-hidden
  className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full blur-[120px] opacity-50 -z-10"
  style={{ background: "rgb(var(--primary-light) / 0.35)" }}
/>


        <div className="container-page pt-16 pb-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur px-4 py-2 shadow-sm">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: "rgb(var(--primary))" }}
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
                      style={{ background: "rgb(var(--primary))" }}
                    />
                    <span className="opacity-90">{t}</span>
                  </li>
                ))}
              </ul>

              {/* Highlights + CTAs */}
              <div className="space-y-5 pt-2">
                <Highlights />

                <div className="flex flex-wrap gap-3">
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
                    `linear-gradient(135deg, ` +
                    `rgb(var(--primary) / 0.18), ` +
                    `rgb(var(--primary-light) / 0.14), ` +
                    `rgb(var(--surface) / 0.35))`,
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
            background: `linear-gradient(90deg, transparent, rgb(var(--primary) / 0.18), transparent)`,
          }}
        />
      </section>

      {/* CONTENT */}
      <section id="la-casa" className="container-page">
        <Amenities />
      </section>

      <section id="opiniones" className="container-page scroll-mt-24">
        <Testimonials />
      </section>

      {/* DISPONIBILIDAD EN HOME */}
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

      <section id="ubicacion" className="container-page">
        <LocationMap />
      </section>

      <section id="contacto" className="container-page pb-24">
        <ContactForm />
      </section>

      <Footer />

    </main>
  );
}
