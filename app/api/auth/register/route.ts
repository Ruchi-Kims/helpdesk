import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

interface RegisterBody {
  nom: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { nom, email, password }: RegisterBody = await request.json();

    // Vérifie si l'email existe déjà
    const userExiste = await User.findOne({ email });
    if (userExiste) {
      return NextResponse.json(
        { message: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    // Hash le mot de passe avant de sauvegarder
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      nom,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: 'Compte créé avec succès' },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ message }, { status: 500 });
  }
}