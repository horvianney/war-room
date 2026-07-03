# ⚡ War Room RH — Command Center

Application de gestion du personnel en temps réel. Dashboard militaire pour superviser les présences, alertes et performances des employés.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + Framer Motion
- **Supabase** (Auth + Realtime + RLS)
- **Prisma ORM** (PostgreSQL)
- **Recharts** pour les KPIs

## Installation

```bash
npm install
cp env.example .env.local
# Remplir les variables Supabase dans .env.local
npm run dev
```

## Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | War Room principal : KPIs live, grille employés, alertes, zones |
| `/employes` | Liste complète + filtres par département |
| `/employes/[id]` | Fiche 360° : performance, présence, compétences |
| `/alertes` | Centre d'alertes avec acquittement |
| `/zones` | Carte d'occupation des zones en temps réel |
| `/analytics` | Graphiques, tendances RH, classement performance |
| `/activite` | Journal d'audit complet (timeline) |

## Base de données

```bash
npx prisma generate
npx prisma db push
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
