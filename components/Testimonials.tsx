const testimonials = [
  {
    name: "María G.",
    text: "Casa muy acogedora y limpia. Perfecta para ir con niños. Repetiremos seguro.",
  },
  {
    name: "Antonio R.",
    text: "Ubicación tranquila y muy cerca de Granada. Muy cómoda para grupos.",
  },
  {
    name: "Laura S.",
    text: "La cocina estaba muy bien equipada y el salón es amplio. Muy recomendable.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="opiniones"
      aria-labelledby="opiniones-title"
      className="space-y-8"
    >
      <header className="space-y-3">
        <h2 id="opiniones-title" className="text-3xl font-bold">
          Opiniones de huéspedes
        </h2>
        <p className="max-w-2xl opacity-80">
          Algunas reseñas de personas que ya se han alojado en la casa.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <article key={t.name} className="card">
            <p className="opacity-85 leading-relaxed">“{t.text}”</p>
            <div className="mt-4 font-semibold">— {t.name}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
