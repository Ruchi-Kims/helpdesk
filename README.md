# 🖥️ HelpDesk IT

Système de gestion de tickets support informatique développé avec **Next.js 14**, **React** et **MongoDB**.

---

## 📋 Description

HelpDesk IT est une application web interne conçue pour automatiser et centraliser la gestion des incidents informatiques en entreprise. Elle remplace le suivi manuel sur fichier Excel par une interface moderne, rapide et sécurisée.

L'application permet aux techniciens support de :
- Réceptionner et enregistrer les demandes des utilisateurs
- Suivre l'avancement des tickets en temps réel
- Filtrer et rechercher les incidents rapidement
- Gérer les priorités et les statuts
- Ajouter des commentaires et un historique par ticket

---

## 🚀 Fonctionnalités

- **Dashboard** — Vue d'ensemble avec statistiques (total, ouverts, en cours, résolus)
- **Gestion des tickets** — Créer, lire, modifier et supprimer des tickets
- **Suivi du statut** — Ouvert → En cours → Résolu → Fermé
- **Priorités** — Haute, Moyenne, Basse
- **Sources** — Mail, Téléphone, Manuel
- **Informations agence** — Agence, Code, Ville
- **Commentaires** — Historique des échanges par ticket
- **Filtres & Recherche** — Filtrer par statut, priorité, recherche par titre ou demandeur
- **Authentification** — Accès sécurisé réservé aux techniciens support
- **Protection des routes** — Redirection automatique vers /login si non connecté

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

---

## 📁 Structure du projet

```
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
│   ├── login/page.js
│   ├── tickets/
│   │   ├── new/page.js
│   │   └── [id]/
│   │       ├── page.js
│   │       └── edit/page.js
│   └── layout.js
├── components/
│   ├── DeleteButton.jsx
│   ├── Filtres.jsx
│   ├── Providers.jsx
│   ├── Sidebar.jsx
│   ├── StatusBadge.jsx
│   ├── TicketActions.jsx
│   └── TopBar.jsx
├── lib/
│   ├── auth.js
│   ├── mongodb.js
│   └── utils.js
├── models/
│   ├── Ticket.js
│   └── User.js
├── scripts/
│   └── createUser.mjs
└── middleware.js
```

---

## ⚙️ Installation

### Prérequis

- Node.js 18+
- Compte MongoDB Atlas (gratuit)

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
```

**4. Créer un compte technicien**

Modifie le script `scripts/createUser.mjs` avec tes informations puis lance :
```bash
node scripts/createUser.mjs
```

**5. Lancer le serveur**
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

## 🔐 Sécurité

- Authentification via **NextAuth.js** avec stratégie JWT
- Mots de passe hashés avec **bcryptjs** (10 rounds)
- Routes protégées via **middleware Next.js**
- Variables sensibles dans `.env.local` (non versionné)

---

## 📡 API Routes

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/tickets` | Récupérer tous les tickets (avec filtres) |
| POST | `/api/tickets` | Créer un nouveau ticket |
| GET | `/api/tickets/:id` | Récupérer un ticket par ID |
| PATCH | `/api/tickets/:id` | Modifier un ticket |
| DELETE | `/api/tickets/:id` | Supprimer un ticket |
| POST | `/api/auth/register` | Créer un compte technicien |

---

## 👨‍💻 Auteur

Développé par **Ruchi Kimpolo**  
Technicien support IT & Développeur fullstack  

---

## 📄 Licence

Projet interne — usage privé en entreprise.