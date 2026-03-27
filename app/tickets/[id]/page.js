import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import TicketActions from '@/components/TicketActions';
import DeleteButton from '@/components/DeleteButton';

// Récupère un seul ticket par son ID
async function getTicket(id) {
  const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function TicketDetail({ params }) {
  const ticket = await getTicket(params.id);

  // Si le ticket n'existe pas
  if (!ticket) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Ticket non trouvé</p>
        <Link href="/dashboard" className="text-blue-600 text-sm mt-2 inline-block">
          Retour au dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Bouton retour */}
      <Link
        href="/dashboard"
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-flex items-center gap-1"
      >
        ← Retour
      </Link>

       <div className="flex gap-2">
    <Link
      href={`/tickets/${ticket._id}/edit`}
      className="text-sm border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
    >
      ✏️ Modifier
    </Link>
    <DeleteButton ticketId={ticket._id} />
  </div>

      <div className="grid grid-cols-3 gap-6 mt-4">

        {/* Colonne principale (gauche) */}
        <div className="col-span-2 flex flex-col gap-6">

          {/* Infos principales du ticket */}
          <div className="border border-gray-200 rounded-lg p-5">
            {/* Badges en haut */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-gray-400">
                #{ticket._id.slice(-6)}
              </span>
              <StatusBadge statut={ticket.statut} />
              <span className={`text-xs font-medium px-2 py-1 rounded-full
                ${ticket.priorite === 'haute'   ? 'bg-red-50 text-red-700'    : ''}
                ${ticket.priorite === 'moyenne' ? 'bg-amber-50 text-amber-700': ''}
                ${ticket.priorite === 'basse'   ? 'bg-gray-100 text-gray-500' : ''}
              `}>
                {ticket.priorite.charAt(0).toUpperCase() + ticket.priorite.slice(1)} priorité
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                {ticket.source === 'mail' ? '📧 Mail' : ticket.source === 'telephone' ? '📞 Téléphone' : '✍️ Manuel'}
              </span>
            </div>

            {/* Titre */}
            <h1 className="text-lg font-medium text-gray-900 mb-3">
              {ticket.titre}
            </h1>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {ticket.description}
            </p>
          </div>

          {/* Section commentaires */}
          <div className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
              Historique & commentaires
            </h2>

            {/* Message système automatique */}
            <div className="flex gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-400 flex-shrink-0">
                S
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2 flex-1">
                <div className="text-xs font-medium text-gray-500 mb-1">Système</div>
                <div className="text-xs text-gray-500">Ticket créé le {new Date(ticket.createdAt).toLocaleDateString('fr-FR')} à {new Date(ticket.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </div>

            {/* Liste des commentaires */}
            {ticket.commentaires && ticket.commentaires.map((comment, index) => (
              <div key={index} className="flex gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-700 font-medium flex-shrink-0">
                  T
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-2 flex-1">
                  <div className="text-xs font-medium text-gray-700 mb-1">{comment.auteur}</div>
                  <div className="text-xs text-gray-600">{comment.texte}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(comment.date).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            ))}

            {/* Formulaire d'ajout de commentaire */}
            <TicketActions ticketId={ticket._id} statut={ticket.statut} />
          </div>
        </div>

        {/* Colonne droite - Informations */}
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
              Informations
            </h2>
       <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm py-2 border-b border-gray-100">
            <span className="text-gray-400">Demandeur</span>
            <span className="text-gray-900 font-medium">{ticket.demandeur}</span>
          </div>

          {/* Agence */}
          <div className="flex justify-between text-sm py-2 border-b border-gray-100">
            <span className="text-gray-400">Agence</span>
            <span className="text-gray-900 font-medium">{ticket.agence || '—'}</span>
          </div>

          {/* Code */}
          <div className="flex justify-between text-sm py-2 border-b border-gray-100">
            <span className="text-gray-400">Code</span>
            <span className="text-gray-900 font-medium">{ticket.code || '—'}</span>
          </div>

          {/* Ville */}
          <div className="flex justify-between text-sm py-2 border-b border-gray-100">
            <span className="text-gray-400">Ville</span>
            <span className="text-gray-900 font-medium">{ticket.ville || '—'}</span>
          </div>

          <div className="flex justify-between text-sm py-2 border-b border-gray-100">
            <span className="text-gray-400">Source</span>
            <span className="text-gray-900 font-medium">
              {ticket.source === 'mail' ? 'Mail' : ticket.source === 'telephone' ? 'Téléphone' : 'Manuel'}
            </span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-gray-100">
            <span className="text-gray-400">Créé le</span>
            <span className="text-gray-900 font-medium">
              {new Date(ticket.createdAt).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span className="text-gray-400">Mis à jour</span>
            <span className="text-gray-900 font-medium">
              {new Date(ticket.updatedAt).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
          </div>
        </div>

      </div>
    </div>
  );
}