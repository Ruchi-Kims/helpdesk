import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// 1. On définit des types précis pour les champs à valeurs limitées (enum)
export type StatutTicket = 'ouvert' | 'en_cours' | 'resolu' | 'ferme';
export type PrioriteTicket = 'haute' | 'moyenne' | 'basse';
export type SourceTicket = 'mail' | 'telephone' | 'manuel';

// 2. Interface pour un commentaire (sous-document)
export interface IComment {
  texte: string;
  auteur: string;
  date: Date;
}

// 3. Interface principale du Ticket — décrit la forme exacte des données
export interface ITicket extends Document {
  titre: string;
  description: string;
  statut: StatutTicket;
  priorite: PrioriteTicket;
  source: SourceTicket;
  demandeur: string;
  agence: string;
  code: string;
  ville: string;
  commentaires: IComment[];
  assigneA: Types.ObjectId | null;
  resolvedAt: Date | null;
  pieceJointe: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentaireSchema = new Schema<IComment>({
  texte: { type: String, required: true },
  auteur: { type: String, default: 'Technicien' },
  date: { type: Date, default: Date.now },
});

const TicketSchema = new Schema<ITicket>(
  {
    titre: { type: String, required: [true, 'Le titre est obligatoire'] },
    description: { type: String, required: [true, 'La description est obligatoire'] },
    statut: {
      type: String,
      enum: ['ouvert', 'en_cours', 'resolu', 'ferme'],
      default: 'ouvert',
    },
    priorite: {
      type: String,
      enum: ['haute', 'moyenne', 'basse'],
      default: 'moyenne',
    },
    source: {
      type: String,
      enum: ['mail', 'telephone', 'manuel'],
      default: 'mail',
    },
    demandeur: { type: String, required: [true, 'Le demandeur est obligatoire'] },
    agence: { type: String, default: '' },
    code: { type: String, default: '' },
    ville: { type: String, default: '' },
    commentaires: [CommentaireSchema],
    assigneA: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    resolvedAt: { type: Date, default: null },
    pieceJointe: { type: String, default: '' },
  },
  { timestamps: true }
);

const Ticket: Model<ITicket> =
  mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', TicketSchema);

export default Ticket;