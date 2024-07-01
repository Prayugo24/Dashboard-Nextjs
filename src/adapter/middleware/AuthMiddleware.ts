import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { IronSessionData, withIronSession } from 'next-iron-session';
import { sessionOptions } from '@/config/session';
import jwt from 'jsonwebtoken';
import "@/config/session"

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
interface SessionData extends IronSessionData {
  save(): unknown;
  user?: any;
}


export async function authMiddleware(req: NextRequest, res: NextResponse) {
  const session = req.session as SessionData;
  

  if (session?.user) {
    return res;
  }

  // Check for Bearer token in Authorization header
  const authHeader = req.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '');

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET) as any;
      session.user = decodedToken;
      await session.save();
      return res;
    } catch (error) {
      console.error('Invalid token:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // If no valid session or token, redirect to login
  return NextResponse.redirect(new URL('/login', req.url));
}

