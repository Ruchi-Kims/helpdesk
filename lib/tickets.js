import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import '@/models/User'; // nécessaire pour que populate() fonctionne

export async function getTicketsData(search, statut, priorite, assigneA) {
  await connectDB();

  let query = {};
  if (search)   query.titre = { $regex: search, $options: 'i' };
  if (statut)   query.statut = statut;
  if (priorite) query.priorite = priorite;
  if (assigneA) query.assigneA = assigneA;

  const tickets = await Ticket.find(query)
    .populate('assigneA', 'nom email')
    .sort({ createdAt: -1 })
    .lean();

  return tickets.map(t => ({
    ...t,
    _id: t._id.toString(),
    assigneA: t.assigneA ? { ...t.assigneA, _id: t.assigneA._id.toString() } : null,
  }));
}