import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import { calculerSLA } from '@/lib/sla';

export async function getStatistiques() {
  await connectDB();

  // 1. Répartition par statut
  const parStatutRaw = await Ticket.aggregate([
    { $group: { _id: '$statut', total: { $sum: 1 } } }
  ]);
  const labelsStatut = { ouvert: 'Ouvert', en_cours: 'En cours', resolu: 'Résolu', ferme: 'Fermé' };
  const parStatut = parStatutRaw.map(s => ({
    statut: s._id,
    label: labelsStatut[s._id] || s._id,
    total: s.total,
  }));

  // 2. Par technicien
  const parTechnicienRaw = await Ticket.aggregate([
    { $group: { _id: '$assigneA', total: { $sum: 1 } } },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'technicien'
      }
    },
  ]);
  const parTechnicien = parTechnicienRaw
    .map(t => ({
      nom: t.technicien[0]?.nom || 'Non assigné',
      total: t.total,
    }))
    .sort((a, b) => b.total - a.total);

  // 3. Par ville (top 8)
  const parVilleRaw = await Ticket.aggregate([
    { $group: { _id: { $ifNull: ['$ville', ''] }, total: { $sum: 1 } } },
    { $sort: { total: -1 } },
    { $limit: 8 }
  ]);
  const parVille = parVilleRaw.map(v => ({
    ville: v._id === '' ? 'Non renseignée' : v._id,
    total: v.total,
  }));

  // 4 & 5. Tickets "clôturés" au sens du statut (résolu OU fermé) — pas seulement ceux avec resolvedAt renseigné
  const ticketsClotures = await Ticket.find({ statut: { $in: ['resolu', 'ferme'] } })
    .select('createdAt resolvedAt priorite statut')
    .lean();

  // Temps moyen de résolution — uniquement sur ceux qui ont un resolvedAt fiable
  const avecResolvedAt = ticketsClotures.filter(t => t.resolvedAt);
  let tempsMoyenHeures = 0;
  if (avecResolvedAt.length > 0) {
    const totalHeures = avecResolvedAt.reduce((acc, t) => {
      return acc + (new Date(t.resolvedAt) - new Date(t.createdAt)) / (1000 * 60 * 60);
    }, 0);
    tempsMoyenHeures = totalHeures / avecResolvedAt.length;
  }

  // Répartition SLA — sur TOUS les tickets clôturés (resolvedAt manquant = calculerSLA compare à maintenant, comme dans le tableau)
  const respectes = ticketsClotures.filter(t => calculerSLA(t).status !== 'depasse').length;
  const depasses = ticketsClotures.length - respectes;

  const parSLA = [
    { statut: 'respecte', label: 'Résolu dans les délais', total: respectes },
    { statut: 'depasse', label: 'Délai dépassé', total: depasses },
  ];

  const tauxSLA = ticketsClotures.length > 0
    ? Math.round((respectes / ticketsClotures.length) * 100)
    : null;

  return {
    parStatut,
    parTechnicien,
    parVille,
    parSLA,
    tempsMoyenHeures: Math.round(tempsMoyenHeures * 10) / 10,
    tauxSLA,
    totalResolus: ticketsClotures.length,
  };
}