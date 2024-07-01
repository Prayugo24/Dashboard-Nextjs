import { withIronSession } from 'next-iron-session';
import { sessionOptions } from '@/config/session';
import { NextApiHandler } from 'next';

export function withIronSessionApiRoute(handler: NextApiHandler) {
  return withIronSession(handler, sessionOptions);
}