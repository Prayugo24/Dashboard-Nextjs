import { NextAuthOptions } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';

export const authConfig: NextAuthOptions = {
  providers: [
    // Tambahkan provider yang diperlukan di sini
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // async authorized({ auth, request }: { auth: Session | null; request: NextRequest }) {
    //   const isLoggedIn = auth?.user;
    //   const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false;
    //   } else if (isLoggedIn) {
    //     return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    //   }
    //   return true;
    // },
  },
};
