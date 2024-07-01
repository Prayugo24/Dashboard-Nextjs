import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Clear cookie by setting it to max-age: 0
    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    }));

    res.status(200).json({ message: 'Logged out' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default logoutRoute;