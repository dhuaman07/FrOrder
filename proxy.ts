import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  return NextResponse.next();
}

// Configurar qué rutas ejecutan el middleware
export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*',
    '/products/:path*',
    '/orders/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
};