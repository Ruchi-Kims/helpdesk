'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NouveauTicket() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState('');

  // État du formulaire — un objet avec tous les champs
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

  // Met à jour le champ correspondant dans l'objet form
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Envoie le formulaire à l'API
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErreur('');

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json();
        setErreur(data.message || 'Une erreur est survenue');
        setLoading(false);
        return;
      }

      // Succès → on redirige vers le dashboard
      router.push('/dashboard');
      router.refresh();

    } catch (err) {
      setErreur('Erreur de connexion au serveur');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      {/* Bouton retour + titre */}
      <Link
        href="/dashboard"
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-flex items-center gap-1"
      >
        ← Retour
      </Link>

      <h1 className="text-xl font-medium text-gray-900 mt-3 mb-6">
        Créer un nouveau ticket
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Titre */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Titre du problème *
          </label>
          <input
            type="text"
            name="titre"
            value={form.titre}
            onChange={handleChange}
            placeholder="Ex : Impossible d'accéder à la messagerie Outlook"
            required
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Décrivez le problème en détail..."
            required
            rows={4}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300 resize-none"
          />
        </div>

        {/* Demandeur */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Demandeur *
          </label>
          <input
            type="text"
            name="demandeur"
            value={form.demandeur}
            onChange={handleChange}
            placeholder="Nom ou email de l'utilisateur"
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

        {/* Priorité + Source côte à côte */}
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

        {/* Message d'erreur */}
        {erreur && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg">
            {erreur}
          </div>
        )}

        {/* Boutons */}
        <div className="flex justify-end gap-3 mt-2">
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Création...' : 'Créer le ticket'}
          </button>
        </div>

      </form>
    </div>
  );
}