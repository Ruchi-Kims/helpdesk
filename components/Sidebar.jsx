'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, X } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
];

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          w-64 sm:w-56 bg-white p-4 flex flex-col gap-1 flex-shrink-0
          fixed lg:static inset-y-0 left-0 z-50
          transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#1F2338] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">HD</span>
            </div>
            <span className="text-sm font-semibold text-[#1F2338]">HelpDesk IT</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-[#8B8FA3]">
            <X size={18} />
          </button>
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const actif = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-full text-sm transition-colors
                ${actif
                  ? 'bg-[#7C5CFC] text-white font-medium shadow-sm'
                  : 'text-[#8B8FA3] hover:bg-[#F4F2FC] hover:text-[#1F2338]'
                }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </aside>
    </>
  );
}