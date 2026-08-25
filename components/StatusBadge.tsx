import { StatutTicket } from '@/models/Ticket';

interface StatusBadgeProps {
  statut: StatutTicket;
}

export default function StatusBadge({ statut }: StatusBadgeProps) {
  const styles: Record<StatutTicket, string> = {
    ouvert: 'bg-blue-50 text-blue-700 border border-blue-100',
    en_cours: 'bg-amber-50 text-amber-700 border border-amber-100',
    resolu: 'bg-green-50 text-green-700 border border-green-100',
    ferme: 'bg-gray-100 text-gray-500 border border-gray-200',
  };

  const labels: Record<StatutTicket, string> = {
    ouvert: 'Ouvert',
    en_cours: 'En cours',
    resolu: 'Résolu',
    ferme: 'Fermé',
  };

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[statut]}`}>
      {labels[statut]}
    </span>
  );
}