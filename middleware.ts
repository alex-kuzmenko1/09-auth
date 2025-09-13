import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = ["/profile", "/notes"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Проверяем только accessToken
  const hasAuthCookie = !!req.cookies.get("accessToken");

  // Для отладки (можно убрать на проде)
  console.log("Middleware check:", {
    pathname,
    hasAuthCookie,
  });

  // Если роут приватный, а куки нет → редирект на /sign-in
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!hasAuthCookie) {
      const url = req.nextUrl.clone();
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }

  // Если юзер уже авторизован и заходит на sign-in/sign-up → редиректим в /profile
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    if (hasAuthCookie) {
      const url = req.nextUrl.clone();
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Перехватываем все запросы, кроме:
    // - /api
    // - _next/static
    // - _next/image
    // - favicon.ico
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
