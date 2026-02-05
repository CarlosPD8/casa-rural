import { Resend } from "resend";
import { cookies, headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clampStr(s: string, max: number) {
  const trimmed = s.trim();
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

function safeText(s: string) {
  return s.replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

function nowMs() {
  return Date.now();
}

// Best-effort rate limit in memory
const memHits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string, limit: number, windowMs: number) {
  const t = nowMs();
  const entry = memHits.get(key);
  if (!entry || entry.resetAt < t) {
    memHits.set(key, { count: 1, resetAt: t + windowMs });
    return { ok: true as const };
  }
  if (entry.count >= limit) return { ok: false as const, retryAfterMs: entry.resetAt - t };
  entry.count += 1;
  memHits.set(key, entry);
  return { ok: true as const };
}

function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(init?.headers ?? {}),
    },
  });
}

async function getCsrfCookie() {
  const c = await cookies();
  return c.get("csrf")?.value ?? "";
}

export async function POST(req: Request) {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !from || !apiKey) {
    return json({ ok: false, error: "Configuración de envío incompleta." }, { status: 500 });
  }

  // headers() en tu setup es async
  const h = await headers();

  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip")?.trim() ||
    "unknown";

  const ua = h.get("user-agent") || "unknown";
  const key = `${ip}::${ua.slice(0, 40)}`;

  const rl = rateLimit(key, 6, 60_000);
  if (!rl.ok) {
    return json(
      { ok: false, error: "Demasiados intentos. Inténtalo de nuevo en un minuto." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    return json({ ok: false, error: "Formato no válido." }, { status: 415 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Petición inválida." }, { status: 400 });
  }

  // Honeypot
  if (typeof body?.website === "string" && body.website.trim().length > 0) {
    return json({ ok: true }, { status: 200 });
  }

  // Timing anti-bot
  const startedAt = Number(body?.startedAt ?? 0);
  if (Number.isFinite(startedAt) && startedAt > 0) {
    const elapsed = nowMs() - startedAt;
    if (elapsed < 2500) {
      return json({ ok: true }, { status: 200 });
    }
  }

  // CSRF double-submit cookie
  const csrfCookie = await getCsrfCookie();
  const csrfBody = typeof body?.csrf === "string" ? body.csrf : "";
  if (csrfCookie && csrfBody && csrfCookie !== csrfBody) {
    return json({ ok: false, error: "Petición no autorizada." }, { status: 403 });
  }

  const name = safeText(clampStr(String(body?.name ?? ""), 80));
  const email = safeText(clampStr(String(body?.email ?? ""), 120));
  const phone = safeText(clampStr(String(body?.phone ?? ""), 40));
  const message = safeText(clampStr(String(body?.message ?? ""), 2000));

  if (!name || !email || !message) {
    return json({ ok: false, error: "Faltan campos obligatorios." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return json({ ok: false, error: "Email no válido." }, { status: 400 });
  }

  const subject = `Nueva solicitud · Casa Rural (${name})`;
  const text = [
  `Nombre: ${name}`,
  `Email: ${email}`,
  phone ? `Teléfono: ${phone}` : "Teléfono: (no indicado)",
  "",
  "Mensaje:",
  message,
  "",
  "---",
  `Meta: ip=${ip} · ua=${ua}`,
].join("\n");


  try {
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
    });

    return json({ ok: true }, { status: 200 });
  } catch {
    return json({ ok: false, error: "No se pudo enviar el mensaje." }, { status: 500 });
  }
}
