import { getStatistiques } from '@/lib/statistiques';
import StatutChart from '@/components/stats/StatutChart';
import TechnicienChart from '@/components/stats/TechnicienChart';
import VilleChart from '@/components/stats/VilleChart';
import SLAChart from '@/components/stats/SLAChart';
import { Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default async function Statistiques() {
  const stats = await getStatistiques();

  const kpis = [
    {
      label: 'Temps moyen de résolution',
      value: `${stats.tempsMoyenHeures}h`,
      icon: Clock,
      tint: '#EFE8FF',
      accent: '#7C5CFC',
    },
    {
      label: 'Respect du SLA',
      value: stats.tauxSLA !== null ? `${stats.tauxSLA}%` : '—',
      icon: ShieldCheck,
      tint: '#E9FBEF',
      accent: '#16A34A',
    },
    {
      label: 'Tickets résolus (total)',
      value: stats.totalResolus,
      icon: CheckCircle2,
      tint: '#FFF6E5',
      accent: '#B45309',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl font-semibold text-[#1F2338]">Statistiques</h1>
        <p className="text-sm text-[#8B8FA3] mt-0.5">
          Vue d&apos;ensemble de la performance du support
        </p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white rounded-2xl p-4 shadow-sm">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: k.tint }}
              >
                <Icon size={16} color={k.accent} />
              </div>
              <div className="text-xs text-[#8B8FA3] mb-1">{k.label}</div>
              <div className="text-2xl font-semibold text-[#1F2338]">{k.value}</div>
            </div>
          );
        })}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <StatutChart data={stats.parStatut} />
        <SLAChart data={stats.parSLA} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TechnicienChart data={stats.parTechnicien} />
        <VilleChart data={stats.parVille} />
      </div>
    </div>
  );
}