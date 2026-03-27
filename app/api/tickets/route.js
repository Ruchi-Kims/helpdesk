import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();

    // Récupère les paramètres de l'URL
    const { searchParams } = new URL(request.url);
    const search   = searchParams.get('search')   || '';
    const statut   = searchParams.get('statut')   || '';
    const priorite = searchParams.get('priorite') || '';

    const filtre = {};
    if (statut) {
      filtre.statut = statut;
    }
    if (priorite) {
      filtre.priorite = priorite;
    }

    // Recherche dans le titre OU le demandeur
    if (search) {
      filtre.$or = [
        { titre:     { $regex: search, $options: 'i' } },
        { demandeur: { $regex: search, $options: 'i' } },
      ];
    }

    const tickets = await Ticket.find(filtre).sort({ createdAt: -1 });
    return NextResponse.json(tickets);

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const ticket = await Ticket.create(body);
    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}