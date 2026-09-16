import { connectDB } from '@/lib/mongodb';
import Ticket, { ITicket } from '@/models/Ticket';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const ticket = await Ticket.findById(params.id);
    if (!ticket) return NextResponse.json({ message: 'Ticket non trouvé' }, { status: 404 });
    return NextResponse.json(ticket);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const body: Partial<ITicket> = await request.json();
    const ticket = await Ticket.findByIdAndUpdate(params.id, body, { new: true });
    if (!ticket) return NextResponse.json({ message: 'Ticket non trouvé' }, { status: 404 });
    return NextResponse.json(ticket);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const ticket = await Ticket.findByIdAndDelete(params.id);
    if (!ticket) return NextResponse.json({ message: 'Ticket non trouvé' }, { status: 404 });
    return NextResponse.json({ message: 'Ticket supprimé' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ message }, { status: 500 });
  }
}