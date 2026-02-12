import Carousel from "@/components/Carousel";
import Highlights from "@/components/Highlights";
import Amenities from "@/components/Amenities";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";

import { useLocale, useTranslations } from "next-intl";

export default function Home() {
  const locale = useLocale();
  const tHero = useTranslations("hero");
  const tAvailability = useTranslations("availabilityHome");

  const tags = tHero.raw("tags") as string[];
  const bullets = tHero.raw("bullets") as string[];

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
              linear-gradient(135deg, rgb(var(--bg)), rgb(var(--surface)))
            `,
          }}
        />

        <div className="container-page pt-12 pb-10">
          {/* 1) TITULAR ARRIBA (SEO) */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur px-4 py-2 shadow-sm">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: "rgb(var(--primary))" }}
              />
              <span className="text-sm font-semibold">{tHero("badge")}</span>
            </div>

            <header className="space-y-3 max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {tHero("title")}
              </h1>

              <p className="text-lg opacity-85 max-w-2xl">
                {tHero("subtitle")}
              </p>
            </header>
          </div>

          {/* 2) CARRUSEL DEBAJO */}
          <div className="mt-8 relative">
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
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/5 bg-white/75 backdrop-blur px-4 py-2 text-sm shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 3) INFO DEBAJO DEL CARRUSEL */}
          <div className="mt-10 grid lg:grid-cols-2 gap-10 items-start">
            {/* Bullets */}
            <ul className="grid sm:grid-cols-2 gap-3">
              {bullets.map((txt) => (
                <li
                  key={txt}
                  className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white/70 backdrop-blur px-4 py-3 shadow-sm"
                >
                  <span
                    className="mt-1 inline-block h-3 w-3 rounded-full"
                    style={{ background: "rgb(var(--primary))" }}
                  />
                  <span className="opacity-90">{txt}</span>
                </li>
              ))}
            </ul>

            {/* Highlights + CTAs */}
            <div className="space-y-5">
              <Highlights />

              <div className="flex flex-wrap gap-3">
                <a href={`/${locale}#disponibilidad`} className="btn btn-primary">
                  {tHero("ctaAvailability")}
                </a>
                <a href={`/${locale}#opiniones`} className="btn btn-secondary">
                  {tHero("ctaReviews")}
                </a>
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
      <section id="la-casa" className="container-page scroll-mt-24">
        <Amenities />
      </section>

      <section id="opiniones" className="container-page scroll-mt-24">
        <Testimonials />
      </section>

      {/* DISPONIBILIDAD EN HOME */}
      <section id="disponibilidad" className="container-page scroll-mt-24">
        <header className="space-y-3 mb-8">
          <h2 className="text-3xl font-bold">{tAvailability("title")}</h2>
          <p className="max-w-2xl opacity-80">{tAvailability("description")}</p>
        </header>

        <AvailabilityCalendar mode="public" />
      </section>

      <section id="ubicacion" className="container-page scroll-mt-24">
        <LocationMap />
      </section>

      <section id="contacto" className="container-page scroll-mt-24">
        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}
