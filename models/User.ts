import mongoose, { Schema, Document, Model } from 'mongoose';

export type RoleUser = 'technicien' | 'admin';

export interface IUser extends Document {
  nom: string;
  email: string;
  password: string;
  role: RoleUser;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est obligatoire'],
    },
    role: {
      type: String,
      enum: ['technicien', 'admin'],
      default: 'technicien',
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;