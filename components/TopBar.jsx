'use client';

import { signOut, useSession } from 'next-auth/react';
import { LogOut, Menu } from 'lucide-react';

export default function TopBar({ onMenuClick }) {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white px-4 sm:px-6 flex items-center justify-between lg:justify-end gap-3">
      <button onClick={onMenuClick} className="lg:hidden text-[#1F2338]">
        <Menu size={22} />
      </button>

      <div className="flex items-center gap-3">
        {session && (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#EFE8FF] flex items-center justify-center text-xs font-semibold text-[#7C5CFC] flex-shrink-0">
              {session.user.nom?.charAt(0).toUpperCase() || 'T'}
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-medium text-[#1F2338]">{session.user.nom}</span>
              <span className="text-xs text-[#8B8FA3]">{session.user.email}</span>
            </div>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-1.5 text-xs text-[#8B8FA3] border border-gray-200 px-3 py-1.5 rounded-full hover:bg-[#F4F2FC] transition-colors flex-shrink-0"
        >
          <LogOut size={13} />
          <span className="hidden sm:inline">Déconnexion</span>
        </button>
      </div>
    </header>
  );
}