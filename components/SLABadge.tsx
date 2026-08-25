import { calculerSLA, SLAStatus } from '@/lib/sla';
import { PrioriteTicket, StatutTicket } from '@/models/Ticket';

const styles: Record<SLAStatus, string> = {
  ok: 'bg-green-50 text-green-700 border border-green-100',
  bientot: 'bg-amber-50 text-amber-700 border border-amber-100',
  depasse: 'bg-red-50 text-red-700 border border-red-100',
};

interface TicketPourBadge {
  priorite: PrioriteTicket;
  statut: StatutTicket;
  createdAt: Date;
  resolvedAt: Date | null;
}

interface SLABadgeProps {
  ticket: TicketPourBadge;
}

export default function SLABadge({ ticket }: SLABadgeProps) {
  const { status, label } = calculerSLA(ticket);

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${styles[status]}`}>
      {label}
    </span>
  );
}