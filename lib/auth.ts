import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },

      async authorize(credentials) {
        try {
          await connectDB();

          if (!credentials?.email || !credentials?.password) return null;

          const user = await User.findOne({ email: credentials.email });

          if (!user) return null;

          const passwordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordCorrect) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            nom: user.nom,
            role: user.role,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nom = user.nom;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.nom = token.nom;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
};