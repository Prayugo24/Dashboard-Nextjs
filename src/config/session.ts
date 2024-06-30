
import { IronSessionData, SessionOptions } from 'iron-session';


export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: 'myapp_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
declare module 'next' {
    interface NextApiRequest {
        session: IronSessionData;
    }
}
declare module 'next/server' {
    interface NextRequest {
        session: IronSessionData;
    }
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
      admin: boolean;
    };
  }
}
