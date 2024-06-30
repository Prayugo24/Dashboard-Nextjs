import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/config/session';
import jwt from 'jsonwebtoken';
import "@/config/session"

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function authMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  
  const session = await getIronSession(req, res, sessionOptions) as any;

  if (session?.user) {
    return res;
  }

  // Check for Bearer token in Authorization header
  const authHeader = req.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '');

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      req.session.user = decodedToken as any;
      // await req.session.save();
      return res;
    } catch (error) {
      console.error('Invalid token:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // If no valid session or token, redirect to login
  return NextResponse.redirect(new URL('/login', req.url));
}

function isValidToken(token: string): boolean {
  // Add your token validation logic here
  return token === 'valid-token'; // Example logic
}