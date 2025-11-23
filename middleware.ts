// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Obtém os cookies
  const refreshTokenId = request.cookies.get("refreshTokenId")?.value;
  const isAdmin = request.cookies.get("isAdmin")?.value === "true";

  // Definição das rotas protegidas
  const adminRoute = pathname.startsWith("/admin");

  // Rotas do registro (registry):
  // /registry/history/[day]
  const registryHistoryDay = /^\/registry\/history\/[^\/]+$/.test(pathname);
  // /registry/history (sem um dia específico)
  const registryHistoryBase = pathname === "/registry/history";
  // /registry/record/create
  const registryRecordCreate = pathname === "/registry/record/create";

  // PROTEÇÃO DE LOGIN (precisa estar autenticado para essas rotas protegidas)
  if (
    (adminRoute ||
      registryHistoryDay ||
      registryHistoryBase ||
      registryRecordCreate) &&
    !refreshTokenId
  ) {
    return NextResponse.redirect(`${origin}/login`);
  }

  // AUTORIZAÇÃO ADMIN

  // /admin: apenas admin
  if (adminRoute && !isAdmin) {
    return NextResponse.redirect(`${origin}/not-authorized`);
  }

  // /registry/history/[day]: apenas admin
  if (registryHistoryDay && !isAdmin) {
    return NextResponse.redirect(`${origin}/not-authorized`);
  }

  // Outras rotas de registry (history base ou record/create): são permitidas para qualquer usuário autenticado
  // Então, se chegou aqui, e tem refreshTokenId (verificado acima), deixa passar.

  return NextResponse.next();
}

// Configurações de quais rotas o middleware deve ser aplicado
export const config = {
  matcher: [
    "/admin/:path*",
    "/registry/history/:path*", // cobre /registry/history e /registry/history/[day]
    "/registry/record/create",
  ],
};
