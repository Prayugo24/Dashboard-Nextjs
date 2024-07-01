import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest, res: NextResponse) {
  const { username, password } = await req.json();

  // Dummy authentication - replace with your actual authentication logic
  if (username === 'user' && password === 'password') {
    // Generate JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    // Set cookie with token
    const res = NextResponse.json({
      message: 'Logged in',
      token: `Bearer ${token}` // Add Bearer token to the response
    });
    res.headers.set('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    }));

    return res;
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}


