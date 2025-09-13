import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { serverApi } from './lib/api/serverApi';

const AUTH_ROUTES = ['/profile', '/notes'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  let hasValidSession = !!accessToken;

  if (!accessToken && refreshToken) {
    try {
      const user = await serverApi.getSession(req.headers.get('cookie') ?? '');
      if (user) hasValidSession = true;
    } catch {
      hasValidSession = false;
    }
  }

  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    if (!hasValidSession) {
      const url = req.nextUrl.clone();
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }
  }

  if (pathname === '/sign-in' || pathname === '/sign-up') {
    if (hasValidSession) {
      const url = req.nextUrl.clone();
      url.pathname = '/profile';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
