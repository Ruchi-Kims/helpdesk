import { connectDB } from '@/lib/mongodb';
import Ticket, { StatutTicket, PrioriteTicket, ITicket } from '@/models/Ticket';
import '@/models/User';

interface AssigneAPopulated {
  _id: string;
  nom: string;
  email: string;
}

interface TicketAvecAssigneLean extends Omit<ITicket, 'assigneA' | '_id'> {
  _id: { toString(): string };
  assigneA: { _id: { toString(): string }; nom: string; email: string } | null;
}

export interface TicketData extends Omit<ITicket, 'assigneA' | '_id'> {
  _id: string;
  assigneA: AssigneAPopulated | null;
}

interface TicketQuery {
  $or?: Array<Record<string, { $regex: string; $options: string }>>;
  statut?: StatutTicket;
  priorite?: PrioriteTicket;
  assigneA?: string;
}

export async function getTicketsData(
  search?: string,
  statut?: StatutTicket,
  priorite?: PrioriteTicket,
  assigneA?: string
): Promise<TicketData[]> {
  await connectDB();

  const query: TicketQuery = {};

  if (search) {
    const regex = { $regex: search, $options: 'i' };
    query.$or = [
      { agence: regex },
      { code: regex },
      { demandeur: regex },
      { ville: regex },
    ];
  }

  if (statut) query.statut = statut;
  if (priorite) query.priorite = priorite;
  if (assigneA) query.assigneA = assigneA;

  const tickets = await Ticket.find(query)
    .populate('assigneA', 'nom email')
    .sort({ createdAt: -1 })
    .lean<TicketAvecAssigneLean[]>();

  return tickets.map((t) => ({
    ...t,
    _id: t._id.toString(),
    assigneA: t.assigneA
      ? { ...t.assigneA, _id: t.assigneA._id.toString() }
      : null,
  }));
}