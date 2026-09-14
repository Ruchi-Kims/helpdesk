'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatutTicket } from '@/models/Ticket';

interface StatutDataItem {
  statut: StatutTicket;
  label: string;
  total: number;
}

interface StatutChartProps {
  data: StatutDataItem[];
}

const COULEURS: Record<StatutTicket, string> = {
  ouvert: '#DC2626',
  en_cours: '#B45309',
  resolu: '#16A34A',
  ferme: '#8B8FA3',
};

export default function StatutChart({ data }: StatutChartProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-[#1F2338] mb-4">Répartition par statut</h2>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell key={entry.statut} fill={COULEURS[entry.statut] || '#8B8FA3'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}