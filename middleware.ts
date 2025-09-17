import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { serverApi } from './lib/api/serverApi'; // убедись, что экспорт default

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  let hasValidSession = false;

  if (accessToken) {
    hasValidSession = true;
  } else if (refreshToken) {
    try {
      const user = await serverApi.getUser(refreshToken); // серверная проверка
      if (user) hasValidSession = true;
    } catch {
      hasValidSession = false;
    }
  }

  if (['/profile', '/notes'].some(r => pathname.startsWith(r)) && !hasValidSession) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  if ((pathname === '/sign-in' || pathname === '/sign-up') && hasValidSession) {
    const url = req.nextUrl.clone();
    url.pathname = '/profile';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
