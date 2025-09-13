import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_ROUTES = ['/profile', '/notes'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Проверяем наличие токенов авторизации (cookies, которые ставит backend)
  // Проверяем разные возможные имена cookies
  const hasAuthCookie = 
    !!req.cookies.get('accessToken') || 
    !!req.cookies.get('refreshToken') ||
    !!req.cookies.get('token') || 
    !!req.cookies.get('session') ||
    !!req.cookies.get('auth');

  // Для отладки выводим информацию о cookies
  console.log('Middleware check:', { 
    pathname, 
    hasAuthCookie,
    accessToken: !!req.cookies.get('accessToken'),
    refreshToken: !!req.cookies.get('refreshToken')
  });

  // Приватные маршруты - если пользователь неавторизован, редирект на /sign-in
  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    if (!hasAuthCookie) {
      console.log('Redirecting to sign-in: no auth cookie');
      const url = req.nextUrl.clone();
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }
  }

  // Если пользователь авторизован и заходит на страницы входа/регистрации - редирект на профиль
  if (pathname === '/sign-in' || pathname === '/sign-up') {
    if (hasAuthCookie) {
      console.log('Redirecting to profile: user already authenticated');
      const url = req.nextUrl.clone();
      url.pathname = '/profile';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};