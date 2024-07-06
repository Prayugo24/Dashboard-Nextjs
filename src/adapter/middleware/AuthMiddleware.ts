import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import * as jose from 'jose'
import { decrypt } from '@/utils/jwtHelpers';
import { extractToken, publicPaths } from '@/utils/tokenUtils';
import { handleApiError, handleExpiredToken, handleRedirect } from '@/utils/responseUtils';



const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const jwtConfig = {
  secret: new TextEncoder().encode(JWT_SECRET),
}
export async function authMiddleware(req: NextRequest){
  const token = extractToken(req);
  console.log("token",token)
    if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  if (!token) {
    return handleRedirect(req);
  }
  try {
    const parsed = await decrypt(token);
    console.log("Parsed:", parsed);

    if (parsed) {
      return NextResponse.next();
    } else {
      return handleExpiredToken(req);
    }
  } catch (error) {
    return handleApiError(error, req);
  }
}
// export async function authMiddleware(req: NextRequest) {
//   const cookies = cookie.parse(req.headers.get('cookie') || '');
//   const tokenFromCookie = cookies.token;
//   const authHeader = req.headers.get('Authorization');
//   const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : '';
//   const token = tokenFromHeader || tokenFromCookie;
//   console.log("Token:", token);

//   const publicPaths = ['/api/login', '/api/signup'];

//   if (publicPaths.includes(req.nextUrl.pathname)) {
//     return NextResponse.next();
//   }
//   if (!token) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
  
  
//   try {
//     const parsed = await decrypt(token);
//     console.log("Parsed:", parsed);

//     if (parsed) {
//       return NextResponse.next();
//     } else {
//       console.error('Token expired:', token);
//       if (req.nextUrl.pathname.startsWith('/api/')) {
//         return NextResponse.json({
//           message: "Session expired. Please log in again.",
//           errorCode: 'JWTExpired'
//         }, { status: 401 });
//       } else {
//         return NextResponse.redirect(new URL('/login', req.url));
//       }
//     }
//   } catch (error) {
//     console.error('Token error:', error);
//     if (req.nextUrl.pathname.startsWith('/api/')) {
//       return NextResponse.json({
//         message: "Invalid token. Please log in again.",
//         errorCode: 'TokenError'
//       }, { status: 401 });
//     } else {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }
// }
