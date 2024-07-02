import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import * as jose from 'jose'
import { decrypt } from '@/utils/jwtHelpers';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const jwtConfig = {
  secret: new TextEncoder().encode(JWT_SECRET),
}

export async function authMiddleware(req: NextRequest) {
  // Get token from cookie
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const tokenFromCookie = cookies.token;

  // Get token from Authorization header
  const authHeader = req.headers.get('Authorization');
  const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : '';

  // Choose the token to use
  const token = tokenFromHeader || tokenFromCookie;

  console.log("Token:", token);

  // Define the paths that don't need authentication
  const publicPaths = ['/api/login', '/api/signup'];

  // Allow access to public paths without authentication
  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const session = req.cookies.get("session")?.value;
  if (!session) return;
  
  const parsed = await decrypt(session);

  if (token) {
    try {
      // jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      console.error('Invalid token:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else {
    // No token present - redirect to login
    console.log(token)
    // return NextResponse.redirect(new URL('/login', req.url));
  }
}
