import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function authMiddleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const token = cookies.token;

  // Define the paths that don't need authentication
  const publicPaths = ['/api/login', '/api/signup'];

  // Allow access to public paths without authentication
  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Verify token if present
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      console.error('Invalid token:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else {
    // No token present - redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

