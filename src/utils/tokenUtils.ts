import { NextRequest } from 'next/server';
import cookie from 'cookie';

// Extract token from request
export function extractToken(req: NextRequest): string | null {
  const cookieHeader = req.headers.get('cookie');
  const cookies = cookieHeader ? cookie.parse(cookieHeader) : {};
  const tokenFromCookie = cookies.session;
  const authHeader = req.headers.get('Authorization');
  const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : '';

  return tokenFromHeader || tokenFromCookie || null;
}
export const publicPaths = ['/api/login', '/api/signup'];
