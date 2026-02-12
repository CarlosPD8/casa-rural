export const dynamic = "force-dynamic";
export const revalidate = 0;

import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import { getTranslations } from "next-intl/server";

export default async function AvailabilityPage() {
  const t = await getTranslations("availabilityHome");

  return (
    <main className="container-page py-16 space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="opacity-80 max-w-2xl">{t("description")}</p>
      </header>

      <AvailabilityCalendar mode="public" />
    </main>
  );
}
