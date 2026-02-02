import Carousel from "@/components/Carousel";
import Highlights from "@/components/Highlights";
import Amenities from "@/components/Amenities";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="space-y-24">
      <section className="container-page grid md:grid-cols-2 gap-12 items-center pt-16">
        <Carousel />
        <div className="space-y-6">
          <header className="space-y-3">
            <h1 className="text-4xl font-bold">
              Casa Rural con Encanto en Granada
            </h1>
            <p className="opacity-80">
              Disfruta de unos días de descanso rodeado de naturaleza, comodidad
              y tranquilidad.
            </p>
          </header>
          <Highlights />
        </div>
      </section>

      <section className="container-page">
        <Amenities />
      </section>

      <section className="container-page">
        <Testimonials />
      </section>

      <section className="container-page pb-24">
        <ContactForm />
      </section>

      <footer className="container-page pb-10 opacity-70 text-sm">
        © {new Date().getFullYear()} Casa Rural en Granada — Todos los derechos reservados.
      </footer>
    </main>
  );
}

