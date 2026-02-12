import AvailabilityCalendarAdmin from "@/components/AvailabilityCalendarAdmin";

export default function AdminPage() {
  return (
    <main className="container-page py-16 space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">Panel de administración</h1>
        <p className="opacity-80 max-w-2xl">
          Gestiona la disponibilidad bloqueando o liberando fechas.
        </p>
      </header>

      <AvailabilityCalendarAdmin />
    </main>
  );
}
