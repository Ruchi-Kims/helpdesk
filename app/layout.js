import { Sora } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import AppShell from '@/components/AppShell';

const sora = Sora({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata = {
  title: 'HelpDesk IT',
  description: 'Système de gestion des tickets support',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={sora.className}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}