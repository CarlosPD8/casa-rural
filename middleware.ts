import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["es", "en", "it", "fr", "pt"] as const;
const defaultLocale = "es";

// Middleware de next-intl
const intlMiddleware = createMiddleware({
  locales: [...locales],
  defaultLocale,
});

function unauthorized() {
  return new NextResponse("Auth required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

function isAdminPath(pathname: string) {
  // Soporta:
  // /admin, /api/admin
  // /es/admin, /en/admin...
  // /es/api/admin, /en/api/admin...
  const adminPrefixes = ["/admin", "/api/admin"];
  if (adminPrefixes.some((p) => pathname.startsWith(p))) return true;

  for (const l of locales) {
    if (pathname.startsWith(`/${l}/admin`)) return true;
    if (pathname.startsWith(`/${l}/api/admin`)) return true;
  }
  return false;
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1) Proteger admin (antes de intl)
  if (isAdminPath(pathname)) {
    const user = process.env.ADMIN_USER;
    const pass = process.env.ADMIN_PASS;
    if (!user || !pass) return unauthorized();

    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Basic ")) return unauthorized();

    const base64 = auth.split(" ")[1];
    const decoded = Buffer.from(base64, "base64").toString("utf8");
    const [u, p] = decoded.split(":");

    if (u !== user || p !== pass) return unauthorized();
    // ok -> seguimos
  }

  // 2) Aplicar i18n para el resto (y también admin si ha pasado auth)
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};



