'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SLADataItem {
  statut: 'respecte' | 'depasse';
  label: string;
  total: number;
}

interface SLAChartProps {
  data: SLADataItem[];
}

const COULEURS: Record<SLADataItem['statut'], string> = {
  respecte: '#16A34A',
  depasse: '#DC2626',
};

export default function SLAChart({ data }: SLAChartProps) {
  const total = data.reduce((acc, d) => acc + d.total, 0);

  if (total === 0) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-[#1F2338] mb-4">Respect des délais SLA</h2>
        <p className="text-sm text-[#8B8FA3] text-center py-16">
          Aucun ticket résolu pour le moment
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-[#1F2338] mb-4">Respect des délais SLA</h2>
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
              <Cell key={entry.statut} fill={COULEURS[entry.statut]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}