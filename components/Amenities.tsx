export default function Amenities() {
  const amenities = [
    "Cocina completa equipada",
    "Salón amplio con zona de comedor",
    "Wi-Fi (si aplica)",
    "Calefacción / chimenea (si aplica)",
    "Terraza o patio exterior (si aplica)",
    "Aparcamiento cercano",
    "Entorno natural y rutas",
    "Ideal para familias y grupos",
  ];

  return (
    <section aria-labelledby="la-casa" className="space-y-8">
      <header className="space-y-3">
        <h2 id="la-casa" className="text-3xl font-bold">
          La casa
        </h2>
        <p className="max-w-2xl opacity-80">
          Una casa rural pensada para descansar, desconectar y disfrutar de
          Granada. Espacios cómodos, buena distribución y todo lo necesario para
          una estancia agradable.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <article className="card md:col-span-2">
          <h3 className="text-xl font-semibold mb-2">Distribución y comodidad</h3>
          <p className="opacity-80 leading-relaxed">
            Perfecta para escapadas en pareja, fines de semana con amigos o
            reuniones familiares. La casa cuenta con zonas comunes amplias y
            habitaciones cómodas para descansar.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-[rgb(var(--muted))] px-4 py-2 border border-black/5">
              Check-in flexible (si aplica)
            </span>
            <span className="rounded-full bg-[rgb(var(--muted))] px-4 py-2 border border-black/5">
              Entorno tranquilo
            </span>
            <span className="rounded-full bg-[rgb(var(--muted))] px-4 py-2 border border-black/5">
              Cerca de Granada
            </span>
          </div>
        </article>

        <aside className="card">
          <h3 className="text-xl font-semibold mb-3">Servicios</h3>
          <ul className="space-y-2">
            {amenities.map((a) => (
              <li key={a} className="flex gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[rgb(var(--primary))]" />
                <span className="opacity-85">{a}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
