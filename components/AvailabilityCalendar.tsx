"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

type RangeRow = {
  id: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  note: string | null;
};

type Mode = "public" | "admin";

function ymdToLocalNoon(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

function dateToYMDLocal(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}

export default function AvailabilityCalendar({
  mode = "public",
}: {
  mode?: Mode;
}) {
  const [ranges, setRanges] = useState<RangeRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<DateRange | undefined>();
  const [note, setNote] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/availability", { cache: "no-store" });
      const json = (await res.json()) as { ranges?: RangeRow[] };
      setRanges(json.ranges ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const blockedRanges = useMemo(
    () =>
      ranges.map((r) => ({
        from: ymdToLocalNoon(r.start_date),
        to: ymdToLocalNoon(r.end_date),
      })),
    [ranges]
  );

  async function blockSelected() {
    if (!selected?.from || !selected?.to) return;

    const startDate = dateToYMDLocal(selected.from);
    const endDate = dateToYMDLocal(selected.to);

    await fetch("/api/admin/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        note: note.trim() ? note.trim() : undefined,
      }),
    });

    setSelected(undefined);
    setNote("");
    await refresh();
  }

  async function removeRange(id: string) {
    await fetch(`/api/admin/availability?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    await refresh();
  }

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-xl font-semibold">
            {mode === "admin" ? "Gestionar disponibilidad" : "Disponibilidad"}
          </h3>
          <p className="opacity-80">
            {mode === "admin"
              ? "Selecciona un rango para bloquearlo o elimina bloqueos existentes."
              : "Los días marcados como ocupados no están disponibles."}
          </p>
        </div>

        <button className="btn btn-secondary" type="button" onClick={refresh}>
          {loading ? "Cargando…" : "Actualizar"}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm border border-black/10 bg-white" />
          <span className="opacity-80">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-sm border border-black/10"
            style={{ background: "rgb(var(--primary-light) / 0.35)" }}
          />
          <span className="opacity-80">Ocupado</span>
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur p-4 overflow-x-auto">
        {mode === "admin" ? (
          <DayPicker
            mode="range"
            selected={selected}
            onSelect={setSelected}
            numberOfMonths={2}
            modifiers={{ blocked: blockedRanges }}
            modifiersStyles={{
              blocked: {
                background: "rgb(var(--primary-light) / 0.35)",
                color: "rgb(var(--primary-dark))",
                opacity: 0.95,
              },
            }}
            footer={
              <div className="text-sm opacity-80">
                Consejo: selecciona inicio y fin del rango en el calendario.
              </div>
            }
          />
        ) : (
          <DayPicker
            mode="single"
            numberOfMonths={2}
            disabled={blockedRanges}
            modifiers={{ blocked: blockedRanges }}
            modifiersStyles={{
              blocked: {
                background: "rgb(var(--primary-light) / 0.35)",
                color: "rgb(var(--primary-dark))",
                opacity: 0.95,
              },
              disabled: {
                background: "rgb(var(--primary-light) / 0.35)",
                color: "rgb(var(--primary-dark))",
                opacity: 0.95,
              },
            }}
          />
        )}
      </div>

      {mode === "public" ? (
        <div className="rounded-2xl border border-black/5 bg-[rgb(var(--muted))] p-4">
          <div className="text-sm opacity-80">
            Para reservar, usa el formulario de contacto indicando fechas y
            número de personas.
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-3">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="md:col-span-2 w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Nota opcional (Booking, Airbnb, teléfono...)"
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={blockSelected}
              disabled={!selected?.from || !selected?.to}
              style={{
                opacity: !selected?.from || !selected?.to ? 0.6 : 1,
                cursor:
                  !selected?.from || !selected?.to ? "not-allowed" : "pointer",
              }}
            >
              Bloquear rango
            </button>
          </div>

          <div className="space-y-3">
            <div className="font-semibold">Rangos bloqueados</div>

            <div className="grid gap-3">
              {ranges.length === 0 ? (
                <div className="opacity-70">No hay rangos bloqueados.</div>
              ) : (
                ranges.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-black/5 bg-white/80 backdrop-blur px-4 py-3 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-semibold">
                        {r.start_date} → {r.end_date}
                      </div>
                      {r.note ? (
                        <div className="text-sm opacity-75">{r.note}</div>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => removeRange(r.id)}
                    >
                      Desbloquear
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
