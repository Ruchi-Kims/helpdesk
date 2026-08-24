import { PrioriteTicket, StatutTicket } from '@/models/Ticket';

// Délais de résolution par priorité (en heures)
const DELAIS_HEURES: Record<PrioriteTicket, number> = {
  haute: 4,
  moyenne: 8,
  basse: 24,
};

export type SLAStatus = 'ok' | 'bientot' | 'depasse';

export interface SLAResult {
  echeance: Date;
  status: SLAStatus;
  label: string;
}

interface TicketPourSLA {
  priorite: PrioriteTicket;
  statut: StatutTicket;
  createdAt: Date;
  resolvedAt: Date | null;
}

// Calcule l'état SLA d'un ticket : échéance, statut (ok / bientot / depasse), et texte à afficher
export function calculerSLA(ticket: TicketPourSLA): SLAResult {
  const delaiHeures = DELAIS_HEURES[ticket.priorite] || 24;
  const dateCreation = new Date(ticket.createdAt);
  const echeance = new Date(dateCreation.getTime() + delaiHeures * 60 * 60 * 1000);

  const estCloture = ticket.statut === 'resolu' || ticket.statut === 'ferme';
  // Si le ticket est clôturé, on fige l'horloge à la date de résolution. Sinon on compare à maintenant.
  const dateReference = estCloture && ticket.resolvedAt ? new Date(ticket.resolvedAt) : new Date();

  const diffMs = echeance.getTime() - dateReference.getTime();
  const diffHeures = diffMs / (1000 * 60 * 60);

  let status: SLAStatus;
  if (diffMs < 0) {
    status = 'depasse';
  } else if (diffHeures <= 1) {
    status = 'bientot';
  } else {
    status = 'ok';
  }

  const absHeures = Math.abs(diffHeures);
  let label: string;

  if (estCloture) {
    label =
      status === 'depasse'
        ? `Résolu avec ${Math.round(absHeures)}h de retard`
        : 'Résolu dans les délais';
  } else if (absHeures < 1) {
    const minutes = Math.round(absHeures * 60);
    label = status === 'depasse' ? `Dépassé de ${minutes}min` : `${minutes}min restantes`;
  } else {
    const heures = Math.round(absHeures);
    label = status === 'depasse' ? `Dépassé de ${heures}h` : `${heures}h restantes`;
  }

  return { echeance, status, label };
}