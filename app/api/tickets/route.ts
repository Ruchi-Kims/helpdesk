import { connectDB } from '@/lib/mongodb';
import Ticket, { StatutTicket, PrioriteTicket, ITicket } from '@/models/Ticket';
import { NextRequest, NextResponse } from 'next/server';

interface TicketFilter {
  statut?: StatutTicket;
  priorite?: PrioriteTicket;
  $or?: Array<Record<string, { $regex: string; $options: string }>>;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Récupère les paramètres de l'URL
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const statut = searchParams.get('statut') as StatutTicket | null;
    const priorite = searchParams.get('priorite') as PrioriteTicket | null;

    const filtre: TicketFilter = {};
    if (statut) {
      filtre.statut = statut;
    }
    if (priorite) {
      filtre.priorite = priorite;
    }

    // Recherche dans le titre OU le demandeur
    if (search) {
      filtre.$or = [
        { titre: { $regex: search, $options: 'i' } },
        { demandeur: { $regex: search, $options: 'i' } },
      ];
    }

    const tickets = await Ticket.find(filtre).sort({ createdAt: -1 });
    return NextResponse.json(tickets);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: Partial<ITicket> = await request.json();
    const ticket = await Ticket.create(body);
    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ message }, { status: 500 });
  }
}