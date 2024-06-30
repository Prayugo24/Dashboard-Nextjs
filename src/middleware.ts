import { authMiddleware } from '@/middleware/AuthMiddleware';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  return authMiddleware(req);
}

export const config = {
  matcher: ['/api/dashboard/:path*', '/dashboard/:path*'],
};