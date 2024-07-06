import { AuthUser } from '@/core/domain/entities/AuthUser';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authApi } from './lib/service';


export const { signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required');
        }

        try {
          const user: any = await authApi.login(credentials.username, credentials.password);

          if (user) {
            return {
              name: user.username,
              email: user.email,
              token: user.token,
            } as any;
          }

          throw new Error('Invalid username or password');
        } catch (err) {
          console.error('Authorize error:', err);
          return null;
        }
      },
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.name; 
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: token.username as string,
          email: token.email as string,
        };
        
      }
      return session;
    },
  },
});
