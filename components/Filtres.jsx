'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Filtres() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Récupère les valeurs actuelles des filtres depuis l'URL
  const searchActuel = searchParams.get('search') || '';
  const statutActuel = searchParams.get('statut') || '';
  const prioriteActuelle = searchParams.get('priorite') || '';

  // Met à jour l'URL quand un filtre change
  function mettreAJourFiltres(cle, valeur) {
    const params = new URLSearchParams(searchParams.toString());

    if (valeur) {
      params.set(cle, valeur);
    } else {
      params.delete(cle);
    }

    router.push(`/dashboard?${params.toString()}`);
  }

  // Réinitialise tous les filtres
  function reinitialiser() {
    router.push('/dashboard');
  }

  // Vérifie si un filtre est actif
  const filtreActif = searchActuel || statutActuel || prioriteActuelle;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">

      {/* Barre de recherche */}
      <div className="flex-1 min-w-48">
        <input
          type="text"
          placeholder="Rechercher un ticket..."
          defaultValue={searchActuel}
          onChange={(e) => {
            clearTimeout(window._searchTimeout);
            window._searchTimeout = setTimeout(() => {
              mettreAJourFiltres('search', e.target.value);
            }, 400);
          }}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300"
        />
      </div>

      {/* Filtre statut */}
      <select
        value={statutActuel}
        onChange={(e) => mettreAJourFiltres('statut', e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300 bg-white"
      >
        <option value="">Tous les statuts</option>
        <option value="ouvert">Ouvert</option>
        <option value="en_cours">En cours</option>
        <option value="resolu">Résolu</option>
        <option value="ferme">Fermé</option>
      </select>

      {/* Filtre priorité */}
      <select
        value={prioriteActuelle}
        onChange={(e) => mettreAJourFiltres('priorite', e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300 bg-white"
      >
        <option value="">Toutes les priorités</option>
        <option value="haute">Haute</option>
        <option value="moyenne">Moyenne</option>
        <option value="basse">Basse</option>
      </select>

      {/* Bouton réinitialiser — visible seulement si un filtre est actif */}
      {filtreActif && (
        <button
          onClick={reinitialiser}
          className="text-sm text-gray-500 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ✕ Réinitialiser
        </button>
      )}

    </div>
  );
}