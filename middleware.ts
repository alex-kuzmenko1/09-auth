// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/', '/sign-in', '/sign-up', '/favicon.ico', '/_next'];
const AUTH_ROUTES = ['/profile', '/notes']; // будь-який маршрут, що починається з...

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // cookie, які ставить backend (наприклад session token). Ім'я cookie залежить від бекенду.
  const hasAuthCookie = !!req.cookies.get('token') || !!req.cookies.get('session'); 
  // Якщо бекенд формує інше ім'я — замініть вище на відповідне.

  // приватні шляхи — якщо користувач неавторизований, редірект на /sign-in
  if (AUTH_ROUTES.some(p => pathname.startsWith(p))) {
    if (!hasAuthCookie) {
      const url = req.nextUrl.clone();
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }
  }

  // якщо користувач авторизований і заходить на сторінки входу/реєстрації — редірект на профиль
  if ((pathname === '/sign-in' || pathname === '/sign-up')) {
    if (hasAuthCookie) {
      const url = req.nextUrl.clone();
      url.pathname = '/profile';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static).*)'],
};
