'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AssignTechnicien({ ticketId, technicienActuelId, techniciens }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    const nouveauId = e.target.value;
    setLoading(true);

    await fetch(`/api/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assigneA: nouveauId || null }),
    });

    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#8B8FA3] uppercase tracking-wide">
        Assigné à
      </label>
      <select
        defaultValue={technicienActuelId || ''}
        onChange={handleChange}
        disabled={loading}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1F2338] focus:outline-none focus:border-[#7C5CFC] bg-white disabled:opacity-50"
      >
        <option value="">Non assigné</option>
        {techniciens.map((t) => (
          <option key={t._id} value={t._id}>{t.nom}</option>
        ))}
      </select>
    </div>
  );
}