import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const ticket = await Ticket.findById(params.id);
    if (!ticket) return NextResponse.json({ message: 'Ticket non trouvé' }, { status: 404 });
    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }){
  try{
    await connectDB();
    const body = await request.json();
    const ticket = await Ticket.findByIdAndUpdate(params.id, body, { new: true });
    if (!ticket) return NextResponse.json({ message: 'Ticket non trouvé' }, { status: 404 });
    return NextResponse.json(ticket);
  }
    catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const ticket = await Ticket.findByIdAndDelete(params.id);
    if (!ticket) return NextResponse.json({ message: 'Ticket non trouvé' }, { status: 404 });
    return NextResponse.json({ message: 'Ticket supprimé' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}