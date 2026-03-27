'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatusBadge from './StatusBadge';

export default function TicketActions({ ticketId, statut }) {
  const router = useRouter();
  const [commentaire, setCommentaire] = useState('');
  const [loading, setLoading] = useState(false);

  // Changer le statut du ticket
  async function changerStatut(nouveauStatut) {
    await fetch(`/api/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut: nouveauStatut })
    });
    router.refresh(); // recharge la page pour voir le nouveau statut
  }

  // Ajouter un commentaire
  async function ajouterCommentaire(e) {
    e.preventDefault();
    if (!commentaire.trim()) return;
    setLoading(true);

    await fetch(`/api/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        $push: { commentaires: { texte: commentaire, auteur: 'Technicien' } }
      })
    });

    setCommentaire('');
    setLoading(false);
    router.refresh();
  }

  const statuts = ['ouvert', 'en_cours', 'resolu', 'ferme'];

  return (
    <div>
      {/* Boutons changement de statut */}
      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-2">Changer le statut</div>
        <div className="flex gap-2 flex-wrap">
          {statuts.map((s) => (
            <button
              key={s}
              onClick={() => changerStatut(s)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors
                ${statut === s
                  ? 'border-blue-300 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
            >
              <StatusBadge statut={s} />
            </button>
          ))}
        </div>
      </div>

      {/* Zone de commentaire */}
      <div className="border-t border-gray-100 pt-4">
        <form onSubmit={ajouterCommentaire} className="flex gap-2">
          <input
            type="text"
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? '...' : 'Envoyer'}
          </button>
        </form>
      </div>
    </div>
  );
}