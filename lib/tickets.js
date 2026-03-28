// lib/tickets.js
import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';

export async function getTicketsData(search, statut, priorite) {
  await connectDB();

  let query = {};
  if (search)   query.titre = { $regex: search, $options: 'i' };
  if (statut)   query.statut = statut;
  if (priorite) query.priorite = priorite;

  // Récupère les tickets directement depuis la base
  const tickets = await Ticket.find(query).sort({ createdAt: -1 }).lean();
  
  // Conversion des _id en string pour éviter les erreurs de sérialisation
  return tickets.map(t => ({ ...t, _id: t._id.toString() }));
}