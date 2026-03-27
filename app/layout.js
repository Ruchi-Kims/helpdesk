import { Inter } from 'next/font/google';
import './globals.css';
import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Sidebar';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HelpDesk IT',
  description: 'Système de gestion des tickets support',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <TopBar />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-6 bg-gray-50">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}