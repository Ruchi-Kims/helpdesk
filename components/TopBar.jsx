'use client';

import { signOut, useSession } from 'next-auth/react';

export default function TopBar() {
  const { data: session } = useSession();

  return (
    <header className="h-12 bg-white border-b border-gray-200 px-5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
        <span className="text-sm font-medium text-gray-900">HelpDesk IT</span>
      </div>
      <div className="flex items-center gap-3">
        {session && (
          <span className="text-xs text-gray-400">
            {session.user.nom}
          </span>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}