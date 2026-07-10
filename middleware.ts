import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if we have our fake auth cookie
  const isAuthenticated = request.cookies.has('utiqx_auth');

  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboardRoute && !isAuthenticated) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
