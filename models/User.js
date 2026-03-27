import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire']
  },
  role: {
    type: String,
    enum: ['technicien', 'admin'],
    default: 'technicien'
  }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;