import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import Filtres from '@/components/Filtres';
import { Suspense } from 'react';
import { getTicketsData } from '@/lib/tickets';


export default async function Dashboard({ searchParams }) {
  // On attend que les searchParams soient résolus
  const { search = '', statut = '', priorite = '' } = await searchParams;

  // APPEL DIRECT À LA BASE DE DONNÉES (Plus de fetch !)
  const tickets = await getTicketsData(search, statut, priorite);

  const stats = {
    total:   tickets.length,
    ouverts: tickets.filter(t => t.statut === 'ouvert').length,
    enCours: tickets.filter(t => t.statut === 'en_cours').length,
    resolus: tickets.filter(t => t.statut === 'resolu').length,
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-gray-900">Dashboard</h1>
        <Link
          href="/tickets/new"
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nouveau ticket
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-sky-300 border border-gray-200 rounded-lg p-4">
          <div className="text-xs text-gray-500 mb-1">Total</div>
          <div className="text-2xl font-medium text-blue-600">{stats.total}</div>
        </div>
        <div className="bg-red-300 border border-gray-200 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-1">Ouverts</div>
          <div className="text-2xl font-medium text-amber-600">{stats.ouverts}</div>
        </div>
        <div className="bg-yellow-300 border border-gray-200 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-1">En cours</div>
          <div className="text-2xl font-medium text-blue-500">{stats.enCours}</div>
        </div>
        <div className="bg-green-300 border border-gray-200 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-1">Résolus</div>
          <div className="text-2xl font-medium text-green-600">{stats.resolus}</div>
      </div>
      </div>

      {/* Filtres */}
      <Suspense fallback={null}>
        <Filtres />
      </Suspense>

      {/* Tableau */}
      <div className="bg-white border border-gray-500 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-500">
            <tr>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3">ID</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3">Agence</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3">Code</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3">Demandeur</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3">Priorité</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3">Ville</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3">Statut</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-gray-400 text-sm py-8">
                  Aucun ticket trouvé
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-gray-400">#{ticket._id.slice(-6)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/tickets/${ticket._id}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {ticket.agence || ticket.titre}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{ticket.code || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{ticket.demandeur}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border
                      ${ticket.priorite === 'haute'   ? 'bg-red-50 text-red-700 border-red-100'      : ''}
                      ${ticket.priorite === 'moyenne' ? 'bg-amber-50 text-amber-700 border-amber-100': ''}
                      ${ticket.priorite === 'basse'   ? 'bg-gray-100 text-gray-500 border-gray-200'  : ''}
                    `}>
                      {ticket.priorite.charAt(0).toUpperCase() + ticket.priorite.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge statut={ticket.statut} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{ticket.ville || '—'}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {new Date(ticket.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))
            )}
          </tbody> 
        </table>
</div>
    </div>
  );
}

