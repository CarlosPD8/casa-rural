export default function LocationMap() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold">Ubicación</h2>
        <p className="max-w-2xl opacity-80">
          La casa se encuentra en un entorno tranquilo de la provincia de Granada,
          ideal para desconectar y disfrutar de la naturaleza.
        </p>
      </header>

      {/* Responsive map container */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-black/5 shadow-sm">
        <div className="aspect-[16/9] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.399678076918!2d-3.6119890999999997!3d37.1669716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fdb28cfeced3%3A0x97fa649bcbf12cb9!2sCasa%20Rural%20Huerta%20del%20Medio!5e0!3m2!1ses!2ses!4v1770288465728!5m2!1ses!2ses"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Casa Rural en Granada"
          />
        </div>
      </div>
    </section>
  );
}
