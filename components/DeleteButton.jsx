'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteButton({ ticketId }) {
  const router = useRouter();
  const [confirmer, setConfirmer] = useState(false);
  const [loading, setLoading] = useState(false);

  async function supprimerTicket() {
    setLoading(true);
    await fetch(`/api/tickets/${ticketId}`, {
      method: 'DELETE'
    });
    router.push('/dashboard');
    router.refresh();
  }

  // Si pas encore confirmé → bouton rouge simple
  if (!confirmer) {
    return (
      <button
        onClick={() => setConfirmer(true)}
        className="text-sm border border-red-200 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
      >
        🗑️ Supprimer
      </button>
    );
  }

  // Si confirmé → demande confirmation
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">Confirmer ?</span>
      <button
        onClick={supprimerTicket}
        disabled={loading}
        className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
      >
        {loading ? '...' : 'Oui, supprimer'}
      </button>
      <button
        onClick={() => setConfirmer(false)}
        className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Annuler
      </button>
    </div>
  );
}