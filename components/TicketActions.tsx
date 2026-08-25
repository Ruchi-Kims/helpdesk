'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatusBadge from './StatusBadge';
import { StatutTicket } from '@/models/Ticket';

interface TicketActionsProps {
  ticketId: string;
  statut: StatutTicket;
  resolvedAt: Date | null;
}

interface PatchBody {
  statut?: StatutTicket;
  resolvedAt?: Date | null;
  $push?: { commentaires: { texte: string; auteur: string } };
}

export default function TicketActions({ ticketId, statut, resolvedAt }: TicketActionsProps) {
  const router = useRouter();
  const [commentaire, setCommentaire] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Changer le statut du ticket
  async function changerStatut(nouveauStatut: StatutTicket) {
    const estCloture = nouveauStatut === 'resolu' || nouveauStatut === 'ferme';
    const body: PatchBody = { statut: nouveauStatut };

    if (estCloture && !resolvedAt) {
      // Première fois qu'on clôture → on fige la date pour le calcul SLA
      body.resolvedAt = new Date();
    } else if (!estCloture) {
      // Ticket rouvert → l'horloge SLA repart de maintenant
      body.resolvedAt = null;
    }

    await fetch(`/api/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    router.refresh();
  }

  // Ajouter un commentaire
  async function ajouterCommentaire(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!commentaire.trim()) return;
    setLoading(true);

    const body: PatchBody = {
      $push: { commentaires: { texte: commentaire, auteur: 'Technicien' } },
    };

    await fetch(`/api/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setCommentaire('');
    setLoading(false);
    router.refresh();
  }

  const statuts: StatutTicket[] = ['ouvert', 'en_cours', 'resolu', 'ferme'];

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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommentaire(e.target.value)}
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