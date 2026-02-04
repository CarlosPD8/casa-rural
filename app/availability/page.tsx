import AvailabilityCalendar from "@/components/AvailabilityCalendar";

export const metadata = {
  title: "Disponibilidad",
  description: "Consulta los días disponibles y ocupados de la casa rural.",
};

export default function AvailabilityPage() {
  return (
    <main className="container-page py-16 space-y-8">
      <h1 className="text-4xl font-bold">Disponibilidad</h1>
      <AvailabilityCalendar mode="public" />
    </main>
  );
}
