'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface VilleDataItem {
  ville: string;
  total: number;
}

interface VilleChartProps {
  data: VilleDataItem[];
}

export default function VilleChart({ data }: VilleChartProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-[#1F2338] mb-4">Tickets par ville</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="ville" tick={{ fontSize: 11, fill: '#8B8FA3' }} angle={-20} textAnchor="end" interval={0} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#8B8FA3' }} />
          <Tooltip />
          <Bar dataKey="total" fill="#5B4FE0" radius={[6, 6, 0, 0]} barSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}