"use client";

import { useEffect, useMemo, useState } from "react";

type Result =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success" }
  | { type: "error"; message: string };

type ContactResponse = { ok?: boolean; error?: string };

function genToken() {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax`;
}

function getCookie(name: string) {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : "";
}

export default function ContactForm() {
  const [result, setResult] = useState<Result>({ type: "idle" });

  // ✅ startedAt se fija al cargar el componente (sin useEffect)
  const [startedAt, setStartedAt] = useState<number>(() => Date.now());

  // CSRF token creado una vez por carga
  const csrf = useMemo(() => genToken(), []);

  useEffect(() => {
    // Double-submit cookie
    setCookie("csrf", csrf);
  }, [csrf]);

  const isLoading = result.type === "loading";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formEl = e.currentTarget;
    setResult({ type: "loading" });

    const fd = new FormData(formEl);

    const payload = {
      name: String(fd.get("name") ?? "").trim().slice(0, 80),
      email: String(fd.get("email") ?? "").trim().slice(0, 120),
      phone: String(fd.get("phone") ?? "").trim().slice(0, 40),
      message: String(fd.get("message") ?? "").trim().slice(0, 2000),
      website: String(fd.get("website") ?? "").trim(), // honeypot
      startedAt,
      csrf: getCookie("csrf") || csrf,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let json: ContactResponse | null = null;
      try {
        json = (await res.json()) as ContactResponse;
      } catch {
        json = null;
      }

      if (!res.ok) {
        setResult({
          type: "error",
          message: json?.error ?? "No se pudo enviar el mensaje.",
        });
        return;
      }

      setResult({ type: "success" });
      formEl.reset();

      // ✅ reiniciamos el timer anti-bot para el siguiente envío
      setStartedAt(Date.now());
    } catch {
      setResult({ type: "error", message: "No se pudo enviar el mensaje." });
    }
  }

  return (
    <section id="contacto" className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold">Contacto</h2>
        <p className="max-w-2xl opacity-80">
          Escríbenos para consultar disponibilidad, precios y cualquier duda. Te responderemos lo antes posible.
        </p>
      </header>

      <form onSubmit={onSubmit} className="card space-y-4" noValidate>
        {/* Honeypot anti-spam */}
        <input
          name="website"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="grid md:grid-cols-2 gap-3">
          <input
            name="name"
            required
            minLength={2}
            maxLength={80}
            placeholder="Nombre"
            className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 bg-white/80"
          />
          <input
            name="email"
            type="email"
            required
            maxLength={120}
            placeholder="Email"
            className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 bg-white/80"
          />
        </div>

        <input
          name="phone"
          inputMode="tel"
          maxLength={40}
          placeholder="Teléfono (opcional)"
          className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 bg-white/80"
        />

        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          placeholder="Cuéntanos fechas aproximadas, número de personas y cualquier detalle…"
          rows={5}
          className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 bg-white/80 resize-none"
        />

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Enviando…" : "Enviar mensaje"}
          </button>

          {result.type === "success" && (
            <span className="text-sm opacity-80">
              ✅ Mensaje enviado. ¡Gracias! Te responderemos en breve.
            </span>
          )}

          {result.type === "error" && (
            <span className="text-sm text-red-600">❌ {result.message}</span>
          )}
        </div>

        <p className="text-xs opacity-60">
          Al enviar este formulario aceptas que usemos tu información únicamente para responder a tu solicitud.
        </p>
      </form>
    </section>
  );
}
