
import { IronSessionData, SessionOptions } from 'next-iron-session';


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

declare module 'next-iron-session' {
  interface IronSessionData {
    save(): unknown;
    user?: {
      id: number | string;
      admin: boolean;
    };
  }
}
