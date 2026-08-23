import { DefaultSession } from 'next-auth';
import { RoleUser } from '@/models/User';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      nom: string;
      role: RoleUser;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    nom: string;
    role: RoleUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    nom: string;
    role: RoleUser;
  }
}