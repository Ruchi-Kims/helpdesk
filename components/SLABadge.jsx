import { calculerSLA } from '@/lib/sla';

const styles = {
  ok:      'bg-green-50 text-green-700 border border-green-100',
  bientot: 'bg-amber-50 text-amber-700 border border-amber-100',
  depasse: 'bg-red-50 text-red-700 border border-red-100',
};

export default function SLABadge({ ticket }) {
  const { status, label } = calculerSLA(ticket);

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${styles[status]}`}>
      {label}
    </span>
  );
}