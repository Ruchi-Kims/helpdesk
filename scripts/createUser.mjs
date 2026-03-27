import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config({ path: '.env.local' });

async function createUser() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Vérifie si l'email existe déjà
  const existant = await mongoose.connection.collection('users').findOne({
    email: 'ruchik@gmail.com'
  });

  if (existant) {
    console.log('⚠️ Ce compte existe déjà !');
    mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash('1234567890', 10);

  await mongoose.connection.collection('users').insertOne({
    nom: 'Ruchi K',
    email: 'ruchik@gmail.com',
    password: hashedPassword,
    role: 'technicien',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  console.log('✅ Compte créé avec succès !');
  mongoose.disconnect();
}

createUser();