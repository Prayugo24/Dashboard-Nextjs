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
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  const tokenFromCookie = cookies.token;
  const authHeader = req.headers.get('Authorization');
  const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : '';
  const token = tokenFromHeader || tokenFromCookie;
  console.log("Token:", token);

  const publicPaths = ['/api/login', '/api/signup'];

  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  
  try {
    // Decrypt and validate token
    const parsed = await decrypt(token);
    console.log("Parsed:", parsed);

    // Check if token has expired
    if (parsed) {
      return NextResponse.next();
    } else {
      // Handle expired token
      console.error('Token expired:', token);
      if (req.nextUrl.pathname.startsWith('/api/')) {
        // For API requests, return a JSON response with an appropriate status
        return NextResponse.json({
          message: "Session expired. Please log in again.",
          errorCode: 'JWTExpired'
        }, { status: 401 });
      } else {
        // For UI requests, redirect to login
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
  } catch (error) {
    // Handle decryption or token validation errors
    console.error('Token error:', error);
    if (req.nextUrl.pathname.startsWith('/api/')) {
      // For API requests, return a JSON response with an appropriate status
      return NextResponse.json({
        message: "Invalid token. Please log in again.",
        errorCode: 'TokenError'
      }, { status: 401 });
    } else {
      // For UI requests, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
}
