'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Dashboard',      href: '/dashboard',   emoji: '📊' },
  { label: 'Nouveau ticket', href: '/tickets/new', emoji: '➕' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-48 min-h-screen bg-white border-r border-gray-200 p-3 flex flex-col gap-1">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
            ${pathname === item.href
              ? 'bg-blue-50 border border-blue-100 text-blue-700 font-medium'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
        >
          <span style={{ fontSize: '14px' }}>{item.emoji}</span>
          {item.label}
        </Link>
      ))}
    </aside>
  );
}