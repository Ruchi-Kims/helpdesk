# 🖥️ HelpDesk IT

<!-- test workflow git -->
Système de gestion de tickets support informatique développé avec **Next.js 14**, **React** et **MongoDB**.

---

## 📋 Description

HelpDesk IT est une application web interne conçue pour automatiser et centraliser la gestion des incidents informatiques en entreprise. Elle remplace le suivi manuel sur fichier Excel par une interface moderne, rapide et sécurisée.

L'application permet aux techniciens support de :
- Réceptionner et enregistrer les demandes des utilisateurs
- Suivre l'avancement des tickets en temps réel
- Filtrer et rechercher les incidents rapidement
- Gérer les priorités, statuts et délais de résolution (SLA)
- Assigner les tickets aux techniciens et suivre leur charge de travail
- Joindre des captures d'écran ou photos liées à l'incident
- Consulter des statistiques de performance du support

---

## 🚀 Fonctionnalités

### Gestion des tickets
- **Dashboard** — Vue d'ensemble avec statistiques (total, ouverts, en cours, résolus)
- **CRUD complet** — Créer, lire, modifier et supprimer des tickets
- **Suivi du statut** — Ouvert → En cours → Résolu → Fermé
- **Priorités** — Haute, Moyenne, Basse
- **Sources** — Mail, Téléphone, Manuel
- **Informations agence** — Agence, Code, Ville
- **Commentaires** — Historique des échanges par ticket
- **Filtres & Recherche** — Recherche par agence, code, demandeur ou ville ; filtres par statut et priorité

### Assignation & suivi
- **Assignation de techniciens** — Chaque ticket peut être assigné à un technicien
- **Filtre "Mes tickets"** — Chaque technicien peut visualiser uniquement ses tickets assignés
- **Colonne "Assigné à"** — Visible directement dans le tableau du dashboard

### SLA — Délais de résolution
- **Calcul automatique du délai** selon la priorité :
  - Haute → 4h
  - Moyenne → 8h
  - Basse → 24h
- **Badge visuel dynamique** — Vert (dans les délais), Orange (moins d'1h restante), Rouge (délai dépassé)
- **Horloge figée à la résolution** — Le délai ne continue pas de courir après clôture du ticket

### Pièces jointes
- **Upload d'image** — Ajout d'une capture d'écran ou photo directement liée à un ticket (via Cloudinary)
- Possible à la création du ticket ou après coup, depuis la page détail

### Statistiques
- **Page dédiée `/statistiques`** avec :
  - Temps moyen de résolution
  - Taux de respect du SLA
  - Répartition des tickets par statut
  - Répartition des tickets résolus dans les délais vs dépassés
  - Répartition des tickets par technicien
  - Répartition des tickets par ville

### Authentification & sécurité
- **Authentification** via NextAuth.js — Accès sécurisé réservé aux techniciens support
- **Protection des routes** — Redirection automatique vers `/login` si non connecté

### Interface
- **Design responsive** — Sidebar en drawer sur mobile, tableau scrollable, grilles adaptatives
- **Interface moderne** — Cartes arrondies, palette violette, police Sora

---

## 🛠️ Stack technique

| Technologie | Rôle |
|---|---|
| **Next.js 14** | Framework fullstack (frontend + backend) |
| **React 18** | Interface utilisateur |
| **Tailwind CSS** | Style et design |
| **MongoDB Atlas** | Base de données cloud |
| **Mongoose** | ODM — modélisation des données |
| **NextAuth.js** | Authentification et sessions JWT |
| **bcryptjs** | Hashage des mots de passe |
| **shadcn/ui** | Composants UI |
| **Recharts** | Graphiques et visualisation de données |
| **Cloudinary** | Hébergement des pièces jointes (images) |
| **Lucide React** | Icônes |

---

## 📁 Structure du projet

helpdesk/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.js
│   │   │   └── register/route.js
│   │   └── tickets/
│   │       ├── route.js
│   │       └── [id]/route.js
│   ├── dashboard/page.js
│   ├── statistiques/page.js
│   ├── login/page.js
│   ├── tickets/
│   │   ├── new/page.js
│   │   └── [id]/
│   │       ├── page.js
│   │       └── edit/page.js
│   ├── layout.js
│   └── globals.css
├── components/
│   ├── stats/
│   │   ├── StatutChart.jsx
│   │   ├── TechnicienChart.jsx
│   │   ├── VilleChart.jsx
│   │   └── SLAChart.jsx
│   ├── AppShell.jsx
│   ├── AssignTechnicien.jsx
│   ├── DeleteButton.jsx
│   ├── Filtres.jsx
│   ├── Providers.jsx
│   ├── Sidebar.jsx
│   ├── SLABadge.jsx
│   ├── StatusBadge.jsx
│   ├── TicketActions.jsx
│   ├── TopBar.jsx
│   ├── UploadImage.jsx
│   └── UploadImageTicket.jsx
├── lib/
│   ├── auth.js
│   ├── mongodb.js
│   ├── sla.js
│   ├── statistiques.js
│   ├── tickets.js
│   └── utils.js
├── models/
│   ├── Ticket.js
│   └── User.js
├── scripts/
│   └── createUser.mjs
└── middleware.js

---

## ⚙️ Installation

### Prérequis

- Node.js 18+
- Compte MongoDB Atlas (gratuit)
- Compte Cloudinary (gratuit)

### Étapes

**1. Cloner le projet**
```bash
git clone https://github.com/ton-username/helpdesk.git
cd helpdesk
```

**2. Installer les dépendances**
```bash
npm install
```

**3. Configurer les variables d'environnement**

Crée un fichier `.env.local` à la racine :
```env
MONGODB_URI=
NEXTAUTH_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

**4. Configurer Cloudinary**

- Crée un compte sur [cloudinary.com](https://cloudinary.com)
- Récupère ton **Cloud Name** depuis le dashboard
- Crée un **Upload Preset** en mode **Unsigned** (Settings → Upload → Upload presets)

**5. Créer un compte technicien**

Modifie le script `scripts/createUser.mjs` avec tes informations puis lance :
```bash
node scripts/createUser.mjs
```

**6. Lancer le serveur**
```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

---

## 🗄️ Modèle de données

### Ticket
```js
{
  titre:        String  (obligatoire),
  description:  String  (obligatoire),
  statut:       String  (ouvert | en_cours | resolu | ferme),
  priorite:     String  (haute | moyenne | basse),
  source:       String  (mail | telephone | manuel),
  demandeur:    String  (obligatoire),
  agence:       String,
  code:         String,
  ville:        String,
  commentaires: Array,
  assigneA:     ObjectId (référence vers User),
  resolvedAt:   Date    (date de clôture, utilisée pour le calcul SLA),
  pieceJointe:  String  (URL Cloudinary),
  createdAt:    Date    (automatique),
  updatedAt:    Date    (automatique)
}
```

### User
```js
{
  nom:       String  (obligatoire),
  email:     String  (obligatoire, unique),
  password:  String  (hashé avec bcrypt),
  role:      String  (technicien | admin)
}
```

---

## ⏱️ Fonctionnement du SLA

Le délai de résolution est calculé dynamiquement (non stocké en base) à partir de `createdAt` et de la priorité du ticket :

| Priorité | Délai |
|---|---|
| Haute | 4h |
| Moyenne | 8h |
| Basse | 24h |

- Si le ticket est **résolu ou fermé**, l'horloge est figée à `resolvedAt`
- Sinon, le délai est comparé à l'heure actuelle
- Le badge devient **rouge** si le délai est dépassé, **orange** si moins d'1h restante, **vert** sinon

Logique centralisée dans `lib/sla.js`, réutilisée à la fois dans le tableau du dashboard, la page détail du ticket et les statistiques.

---

## 🔐 Sécurité

- Authentification via **NextAuth.js** avec stratégie JWT
- Mots de passe hashés avec **bcryptjs** (10 rounds)
- Routes protégées via **middleware Next.js** (`/dashboard`, `/tickets`, `/statistiques`)
- Variables sensibles dans `.env.local` (non versionné)
- Upload d'images en mode "unsigned" côté Cloudinary (aucune clé secrète exposée)

---

## 📡 API Routes

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/tickets` | Récupérer tous les tickets (avec filtres) |
| POST | `/api/tickets` | Créer un nouveau ticket |
| GET | `/api/tickets/:id` | Récupérer un ticket par ID |
| PATCH | `/api/tickets/:id` | Modifier un ticket (statut, assignation, pièce jointe, commentaires...) |
| DELETE | `/api/tickets/:id` | Supprimer un ticket |
| POST | `/api/auth/register` | Créer un compte technicien |

---

## 🗺️ Roadmap

- [ ] Base de connaissances / FAQ interne
- [ ] Notifications email automatiques (changement de statut, nouvelle assignation)
- [ ] Historique d'activité détaillé (audit log)
- [ ] Vue Kanban (drag & drop des statuts)
- [ ] Tags/catégories de tickets (Matériel, Réseau, Logiciel...)
- [ ] Architecture multi-tenant (plusieurs entreprises clientes)

---

## 👨‍💻 Auteur

Développé par **Ruchi Kimpolo**
Technicien support IT & Développeur fullstack

---

## 📄 Licence

Projet interne — usage privé en entreprise.