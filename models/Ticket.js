import mongoose from 'mongoose';

const CommentaireSchema = new mongoose.Schema({
  texte: { type: String, required: true },
  auteur: { type: String, default: 'Technicien' },
  date: { type: Date, default: Date.now }
});

const TicketSchema = new mongoose.Schema({
  titre: { type: String, required: [true, 'Le titre est obligatoire'] },
  description: { type: String, required: [true, 'La description est obligatoire'] },
  statut: { type: String, enum: ['ouvert', 'en_cours', 'resolu', 'ferme'], default: 'ouvert' },
  priorite: { type: String, enum: ['haute', 'moyenne', 'basse'], default: 'moyenne' },
  source: { type: String, enum: ['mail', 'telephone', 'manuel'], default: 'mail' },
  demandeur: { type: String, required: [true, 'Le demandeur est obligatoire'] },
  agence: { type: String, default: '' },
  code: { type: String, default: '' },
  ville: { type: String, default: '' },
  commentaires: [CommentaireSchema]
}, { timestamps: true });

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);

export default Ticket;