# Architekt kúziel - Finálna dokumentácia

## Prehľad projektu

Architekt kúziel je inteligentný, automatizovaný ekosystém pre prácu s informáciami a obsahom. Aplikácia je navrhnutá tak, aby nielen plnila úlohy, ale predvídala potreby používateľa, zjednodušovala komplexnosť a prinášala pocit kontroly a ľahkosti do každodennej práce s dátami.

## Kľúčové komponenty

1. **Univerzálny Prompt Interface** - intuitívne rozhranie pre interakciu s aplikáciou, ktoré predvída potreby používateľa a zjednodušuje komplexné úlohy
2. **Adaptívny Dashboard** - personalizovaný dashboard s konfigurovateľnými widgetmi, ktorý sa prispôsobuje preferenciám používateľa
3. **MindFinder Navigator** - inteligentná organizácia a vizualizácia obsahu s pokročilým filtrovaním a vyhľadávaním
4. **Content Creation Studio** - pokročilý editor s inteligentnými návrhmi pre vylepšenie obsahu
5. **AI/ML komponenty** - súbor inteligentných nástrojov vrátane Context Analyzer, Semantic Tagger, Pattern Recognizer, Content Generator a Predictive Engine

## Technický stack

### Frontend
- Next.js (React framework)
- TypeScript
- Redux pre správu stavu
- Tailwind CSS pre štýlovanie
- Framer Motion pre animácie

### Backend
- Node.js s Express
- GraphQL API s Apollo Server
- Socket.IO pre real-time funkcionalitu
- JWT autentifikácia

### Databáza
- PostgreSQL

### AI/ML
- Vlastné AI/ML komponenty integrované do aplikácie

## Štruktúra projektu

```
architekt-kuziel/
├── src/
│   ├── frontend/           # Next.js aplikácia
│   │   ├── components/     # React komponenty
│   │   ├── pages/          # Next.js stránky
│   │   ├── store/          # Redux store
│   │   ├── styles/         # CSS štýly
│   │   ├── contexts/       # React kontexty
│   │   └── ...
│   ├── backend/            # Express server
│   │   ├── schema/         # GraphQL schéma
│   │   ├── models/         # Databázové modely
│   │   ├── services/       # Biznis logika
│   │   ├── routes/         # API endpointy
│   │   └── ...
│   └── shared/             # Zdieľané typy a utility
├── scripts/                # Skripty pre build a deployment
├── deployment/             # Deployment konfigurácie
└── docker-compose.yml      # Docker Compose konfigurácia
```

## Inštalácia a spustenie

### Požiadavky
- Node.js 16+
- npm 8+
- PostgreSQL 13+

### Lokálne spustenie
1. Klonujte repozitár
2. Nainštalujte závislosti:
   ```
   cd architekt-kuziel
   npm install
   cd src/frontend
   npm install
   cd ../backend
   npm install
   ```
3. Vytvorte `.env` súbor v `src/backend` podľa vzoru `.env.example`
4. Spustite aplikáciu:
   ```
   # V jednom termináli
   cd src/backend
   npm run dev
   
   # V druhom termináli
   cd src/frontend
   npm run dev
   ```
5. Otvorte prehliadač na adrese `http://localhost:3000`

### Použitie Docker Compose
1. Klonujte repozitár
2. Spustite pomocou Docker Compose:
   ```
   docker-compose up -d
   ```
3. Otvorte prehliadač na adrese `http://localhost:3000`

## Deployment

Pre deployment aplikácie do produkčného prostredia použite pripravený skript:

```
./prepare-deployment.sh
```

Tento skript vytvorí nasledujúce deployment balíčky:
- `deployment/frontend-package.zip` - Frontend aplikácia
- `deployment/backend-package.zip` - Backend aplikácia
- `deployment/full-package.zip` - Kompletný balíček s inštrukciami a Docker konfiguráciami

Detailné inštrukcie pre deployment nájdete v súbore `deployment/DEPLOYMENT.md`.

## Testovanie

Aplikácia obsahuje komplexný súbor testov pre všetky kľúčové komponenty:

```
# Spustenie frontend testov
cd src/frontend
npm test

# Spustenie backend testov
cd src/backend
npm test
```

## Optimalizácia

Pre optimalizáciu aplikácie pred nasadením použite pripravený skript:

```
node scripts/optimize.js
```

Tento skript vykoná nasledujúce optimalizácie:
- Spustenie testov s pokrytím kódu
- Analýzu a opravu kódu pomocou ESLint
- Analýzu veľkosti bundlov
- Kontrolu výkonu pomocou Lighthouse
- Kontrolu prístupnosti
- Optimalizáciu obrázkov
- Vytvorenie produkčných buildov

## Ďalší vývoj

Plán pre ďalší vývoj aplikácie zahŕňa:
1. Rozšírenie AI/ML funkcionalít
2. Implementácia pokročilých vizualizácií dát
3. Mobilná aplikácia
4. Integrácie s ďalšími službami a nástrojmi
5. Rozšírenie jazykovej podpory

## Kontakt

V prípade otázok alebo problémov kontaktujte podporu na adrese support@architekt-kuziel.sk
