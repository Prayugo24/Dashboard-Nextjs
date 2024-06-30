import { authenticateUser } from '@/middleware/AuthenticateUser';
import { NextApiRequest, NextApiResponse } from 'next';
import '@/config/session'
import { sessionOptions } from '@/config/session';
// import { withIronSessionApiRoute } from 'iron-session';
import { withIronSession } from "next-iron-session";


async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  // Validasi kredensial pengguna
  const user = await authenticateUser(username, password);

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  // Tetapkan sesi pengguna
  req.session.user = {
    id: user.id,
    admin: user.admin,
  };

//   await req.session.save();

  res.status(200).json({ message: 'Login successful' });
}
// export default withIronSession(loginRoute, sessionOptions);
