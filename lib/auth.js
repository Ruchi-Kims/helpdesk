import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',         type: 'email'    },
        password: { label: 'Mot de passe',  type: 'password' }
      },

      async authorize(credentials) {
        try {
          await connectDB();

          // Cherche l'utilisateur par email
          const user = await User.findOne({ email: credentials.email });

          // Si utilisateur non trouvé
          if (!user) return null;

          // Vérifie le mot de passe
          const passwordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordCorrect) return null;

          // Retourne les infos de l'utilisateur
          return {
            id:    user._id.toString(),
            email: user.email,
            nom:   user.nom,
            role:  user.role
          };

        } catch (error) {
          return null;
        }
      }
    })
  ],

  // Personnalise le token JWT avec les infos utilisateur
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id;
        token.nom  = user.nom;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id   = token.id;
        session.user.nom  = token.nom;
        session.user.role = token.role;
      }
      return session;
    }
  },

  pages: {
    signIn: '/login'  // page de login personnalisée
  },

  session: {
    strategy: 'jwt'   // on utilise JWT pour les sessions
  },

  secret: process.env.NEXTAUTH_SECRET
};