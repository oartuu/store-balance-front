// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshTokenId = request.cookies.get("refreshTokenId")?.value;
  const isAdmin = request.cookies.get("isAdmin")?.value === "true";

  // **Novas rotas públicas de login / registro**
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  // Se já estiver logado (tem token) e for pra login ou registro, redireciona para home ou dashboard
  if (refreshTokenId && (isLoginPage || isRegisterPage)) {
    // define para onde redirecionar — pode ser "/" ou algo como "/dashboard"
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/registry/record/create";
    return NextResponse.redirect(redirectUrl);
  }

  // Suas rotas protegidas existentes
  const adminRoute = pathname.startsWith("/admin");
  const registryHistoryDay = /^\/registry\/history\/[^\/]+$/.test(pathname);
  const registryHistoryBase = pathname === "/registry/history";
  const registryRecordCreate = pathname === "/registry/record/create";

  // Se é rota protegida e **não** está autenticado
  if (
    (adminRoute ||
      registryHistoryDay ||
      registryHistoryBase ||
      registryRecordCreate) &&
    !refreshTokenId
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Autorização de admin
  if (adminRoute && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/not-authorized";
    return NextResponse.redirect(url);
  }

  if (registryHistoryDay && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/not-authorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/registry/history/:path*",
    "/registry/record/create",
    "/login",
    "/register", // garantir que middleware roda para login / register também
  ],
};
