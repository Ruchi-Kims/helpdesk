'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErreur('');

    const result = await signIn('credentials', {
      email:    form.email,
      password: form.password,
      redirect: false  // on gère la redirection manuellement
    });

    if (result?.error) {
      setErreur('Email ou mot de passe incorrect');
      setLoading(false);
      return;
    }

    // Connexion réussie → dashboard
    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
          <span className="text-base font-medium text-gray-900">HelpDesk IT</span>
        </div>

        <h1 className="text-sm font-medium text-gray-900 mb-1">
          Connexion technicien
        </h1>
        <p className="text-xs text-gray-400 mb-6">
          Accès réservé au support informatique
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Adresse e-mail
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="technicien@entreprise.com"
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-300"
            />
          </div>

          {erreur && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg">
              {erreur}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors mt-1"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Accès réservé aux techniciens support
        </p>
      </div>
    </div>
  );
}