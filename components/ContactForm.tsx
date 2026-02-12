"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("contact");

  const [result, setResult] = useState<Result>({ type: "idle" });
  const [startedAt, setStartedAt] = useState<number>(() => Date.now());
  const csrf = useMemo(() => genToken(), []);

  useEffect(() => {
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
      website: String(fd.get("website") ?? "").trim(),
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
          message: json?.error ?? t("errorDefault"),
        });
        return;
      }

      setResult({ type: "success" });
      formEl.reset();
      setStartedAt(Date.now());
    } catch {
      setResult({ type: "error", message: t("errorDefault") });
    }
  }

  return (
    <section id="contacto" className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold">{t("title")}</h2>
        <p className="max-w-2xl opacity-80">{t("subtitle")}</p>
      </header>

      <form onSubmit={onSubmit} className="card space-y-4" noValidate>
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
            placeholder={t("name")}
            className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 bg-white/80"
          />
          <input
            name="email"
            type="email"
            required
            maxLength={120}
            placeholder={t("email")}
            className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 bg-white/80"
          />
        </div>

        <input
          name="phone"
          inputMode="tel"
          maxLength={40}
          placeholder={t("phoneOptional")}
          className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 bg-white/80"
        />

        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          placeholder={t("messagePlaceholder")}
          rows={5}
          className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 bg-white/80 resize-none"
        />

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? t("sending") : t("send")}
          </button>

          {result.type === "success" && (
            <span className="text-sm opacity-80">{t("success")}</span>
          )}

          {result.type === "error" && (
            <span className="text-sm text-red-600">❌ {result.message}</span>
          )}
        </div>

        <p className="text-xs opacity-60">{t("privacyNote")}</p>
      </form>
    </section>
  );
}
