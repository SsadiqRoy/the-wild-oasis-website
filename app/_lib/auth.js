import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

const nextConfig = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const guest = await getGuest(user.email);

        if (!guest) await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch (error) {
        console.log('nextConfig > callbacks > signIn', error);
        return false;
      }
    },
    async session({ session }) {
      try {
        const guest = await getGuest(session.user.email);
        if (guest) {
          const user = { ...guest, ...session.user, guestId: guest.id };
          session.user = user;
        }

        return session;
      } catch (error) {
        console.log('nextConfig > callbacks > session', error);
        return session;
      }
    },
  },
  pages: {
    signIn: '/login',
  },
};
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(nextConfig);
