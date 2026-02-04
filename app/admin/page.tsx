import AvailabilityCalendar from "@/components/AvailabilityCalendar";

export const metadata = {
  title: "Admin · Disponibilidad",
  description: "Panel para bloquear/desbloquear fechas.",
};

export default function AdminPage() {
  return (
    <main className="container-page py-16 space-y-8">
      <h1 className="text-4xl font-bold">Panel Admin</h1>
      <AvailabilityCalendar mode="admin" />
    </main>
  );
}
