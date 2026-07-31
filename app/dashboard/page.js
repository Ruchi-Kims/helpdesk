import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import Filtres from '@/components/Filtres';
import { Suspense } from 'react';
import { getTicketsData } from '@/lib/tickets';
import { LayoutGrid, CircleDot, Clock, CheckCircle2 } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Dashboard({ searchParams }) {
  const { search = '', statut = '', priorite = '', mesTickets = '' } = await searchParams;
  const session = await getServerSession(authOptions);

  const assigneAFiltre = mesTickets === '1' ? session?.user?.id : '';
  const tickets = await getTicketsData(search, statut, priorite, assigneAFiltre);

  const stats = {
    total:   tickets.length,
    ouverts: tickets.filter(t => t.statut === 'ouvert').length,
    enCours: tickets.filter(t => t.statut === 'en_cours').length,
    resolus: tickets.filter(t => t.statut === 'resolu').length,
  };

  const statCards = [
    { label: 'Total',    value: stats.total,   icon: LayoutGrid,   tint: '#EFE8FF', accent: '#7C5CFC' },
    { label: 'Ouverts',  value: stats.ouverts, icon: CircleDot,    tint: '#FDECEC', accent: '#DC2626' },
    { label: 'En cours', value: stats.enCours, icon: Clock,        tint: '#FFF6E5', accent: '#B45309' },
    { label: 'Résolus',  value: stats.resolus, icon: CheckCircle2, tint: '#E9FBEF', accent: '#16A34A' },
  ];

  return (
    <div>
      {/* Header — message de bienvenue */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-[#1F2338]">
            Bonjour, {session?.user?.nom || 'Technicien'} 👋
          </h1>
          <p className="text-sm text-[#8B8FA3] mt-0.5">
            Voici un aperçu de vos tickets support
          </p>
        </div>
        <Link
          href="/tickets/new"
          className="bg-[#7C5CFC] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#6C46F0] transition-colors text-center"
        >
          + Nouveau ticket
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {statCards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white rounded-2xl p-4 shadow-sm">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: c.tint }}
              >
                <Icon size={16} color={c.accent} />
              </div>
              <div className="text-xs text-[#8B8FA3] mb-1">{c.label}</div>
              <div className="text-2xl font-semibold text-[#1F2338]">{c.value}</div>
            </div>
          );
        })}
      </div>

      {/* Filtres */}
      <Suspense fallback={null}>
        <Filtres />
      </Suspense>

      {/* Tableau */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead className="border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-medium text-[#8B8FA3] uppercase tracking-wide px-4 py-3">ID</th>
                <th className="text-left text-xs font-medium text-[#8B8FA3] uppercase tracking-wide px-4 py-3">Agence</th>
                <th className="text-left text-xs font-medium text-[#8B8FA3] uppercase tracking-wide px-4 py-3">Code</th>
                <th className="text-left text-xs font-medium text-[#8B8FA3] uppercase tracking-wide px-4 py-3">Demandeur</th>
                <th className="text-left text-xs font-medium text-[#8B8FA3] uppercase tracking-wide px-4 py-3">Priorité</th>
                <th className="text-left text-xs font-medium text-[#8B8FA3] uppercase tracking-wide px-4 py-3">Ville</th>
                <th className="text-left text-xs font-medium text-[#8B8FA3] uppercase tracking-wide px-4 py-3">Statut</th>
                <th className="text-left text-xs font-medium text-[#8B8FA3] uppercase tracking-wide px-4 py-3">Assigné à</th>
                <th className="text-left text-xs font-medium text-[#8B8FA3] uppercase tracking-wide px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center text-[#8B8FA3] text-sm py-8">
                    Aucun ticket trouvé
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-[#F4F2FC] transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-[#8B8FA3]">#{ticket._id.slice(-6)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/tickets/${ticket._id}`}
                        className="text-sm font-medium text-[#1F2338] hover:text-[#7C5CFC] transition-colors"
                      >
                        {ticket.agence || ticket.titre}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#8B8FA3]">{ticket.code || '—'}</td>
                    <td className="px-4 py-3 text-sm text-[#8B8FA3]">{ticket.demandeur}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full
                        ${ticket.priorite === 'haute'   ? 'bg-red-50 text-red-700'    : ''}
                        ${ticket.priorite === 'moyenne' ? 'bg-amber-50 text-amber-700': ''}
                        ${ticket.priorite === 'basse'   ? 'bg-gray-100 text-gray-500' : ''}
                      `}>
                        {ticket.priorite.charAt(0).toUpperCase() + ticket.priorite.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#8B8FA3]">{ticket.ville || '—'}</td>
                    <td className="px-4 py-3">
                      <StatusBadge statut={ticket.statut} />
                    </td>
                    <td className="px-4 py-3 text-sm text-[#8B8FA3]">
                      {ticket.assigneA?.nom || <span className="italic">Non assigné</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#8B8FA3]">
                      {new Date(ticket.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}