'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface TechnicienDataItem {
  nom: string;
  total: number;
}

interface TechnicienChartProps {
  data: TechnicienDataItem[];
}

export default function TechnicienChart({ data }: TechnicienChartProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-[#1F2338] mb-4">Tickets par technicien</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: '#8B8FA3' }} />
          <YAxis type="category" dataKey="nom" width={100} tick={{ fontSize: 12, fill: '#1F2338' }} />
          <Tooltip />
          <Bar dataKey="total" fill="#7C5CFC" radius={[0, 6, 6, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}