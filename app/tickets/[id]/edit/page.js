'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ModifierTicket({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [form, setForm] = useState({
  titre: '',
  description: '',
  demandeur: '',
  priorite: 'moyenne',
  source: 'mail',
  agence: '',
  code: '',
  ville: '',
});

  // Charger les données du ticket au chargement de la page
  useEffect(() => {
    async function chargerTicket() {
      const res = await fetch(`/api/tickets/${params.id}`);
      const data = await res.json();
      setForm({
        titre: data.titre,
        description: data.description,
        demandeur: data.demandeur,
        priorite: data.priorite,
        source: data.source,
        agence: data.agence || '',
        code:   data.code   || '',
        ville:  data.ville  || '',
      });
      setChargement(false);
    }
    chargerTicket();
  }, [params.id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErreur('');

    try {
      const res = await fetch(`/api/tickets/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json();
        setErreur(data.message || 'Une erreur est survenue');
        setLoading(false);
        return;
      }

      // Succès → retour au détail du ticket
      router.push(`/tickets/${params.id}`);
      router.refresh();

    } catch (err) {
      setErreur('Erreur de connexion au serveur');
      setLoading(false);
    }
  }

  // Pendant le chargement des données
  if (chargement) {
    return <div className="text-sm text-gray-400">Chargement...</div>;
  }

  return (
    <div className="max-w-2xl">
      <Link
        href={`/tickets/${params.id}`}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-flex items-center gap-1"
      >
        ← Retour
      </Link>

      <h1 className="text-xl font-medium text-gray-900 mt-3 mb-6">
        Modifier le ticket
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Titre *
          </label>
          <input
            type="text"
            name="titre"
            value={form.titre}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300 resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Demandeur *
          </label>
          <input
            type="text"
            name="demandeur"
            value={form.demandeur}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300"
          />
        </div>

                {/* Agence + Code côte à côte */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Agence
            </label>
            <input
              type="text"
              name="agence"
              value={form.agence}
              onChange={handleChange}
              placeholder="Ex : Agence Casablanca Centre"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Code
            </label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Ex : AGC-001"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300"
            />
          </div>
        </div>

        {/* Ville */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Ville
          </label>
          <input
            type="text"
            name="ville"
            value={form.ville}
            onChange={handleChange}
            placeholder="Ex : Casablanca"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Priorité
            </label>
            <select
              name="priorite"
              value={form.priorite}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300 bg-white"
            >
              <option value="basse">Basse</option>
              <option value="moyenne">Moyenne</option>
              <option value="haute">Haute</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Source
            </label>
            <select
              name="source"
              value={form.source}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300 bg-white"
            >
              <option value="mail">Mail</option>
              <option value="telephone">Téléphone</option>
              <option value="manuel">Manuel</option>
            </select>
          </div>
        </div>

        {erreur && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg">
            {erreur}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-2">
          <Link
            href={`/tickets/${params.id}`}
            className="text-sm text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>

      </form>
    </div>
  );
}