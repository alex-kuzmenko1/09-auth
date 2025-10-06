import { NextRequest, NextResponse } from "next/server";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  // 🔹 Если нет accessToken, пробуем обновить по refreshToken
  if (!accessToken && refreshToken) {
    const refreshed = await checkServerSession();

    if (refreshed && refreshed.accessToken) {
      const response = NextResponse.next();

      // ✅ Устанавливаем новые куки в ответ
      response.cookies.set({
        name: "accessToken",
        value: refreshed.accessToken,
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60,
      });

      if (isPublicRoute) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return response;
    }

    // ❌ если refreshToken невалиден
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  // 🔹 Если вообще нет токенов
  if (!accessToken && !refreshToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  // 🔹 Если пользователь авторизован и заходит на публичную страницу — редиректим
  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Всё ок — продолжаем
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
