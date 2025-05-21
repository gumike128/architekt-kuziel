# Lokálna inštalácia aplikácie "Architekt kúziel"

Tento dokument obsahuje inštrukcie pre lokálnu inštaláciu a spustenie aplikácie "Architekt kúziel" na vašom počítači.

## Požiadavky

Pred inštaláciou sa uistite, že máte nainštalované nasledujúce nástroje:

1. **Node.js** (verzia 16 alebo novšia)
2. **npm** (verzia 8 alebo novšia)
3. **PostgreSQL** (verzia 13 alebo novšia)
4. **Git** (voliteľné, pre klonovanie repozitára)

## Kroky inštalácie

### 1. Príprava projektu

Najprv si pripravte adresárovú štruktúru projektu:

```bash
# Vytvorte hlavný adresár projektu
mkdir architekt-kuziel
cd architekt-kuziel

# Skopírujte súbory z deployment-web do vášho adresára
cp -r /cesta/k/deployment-web/* .
```

Alebo môžete použiť priamo adresár `architekt-kuziel` z tohto projektu.

### 2. Inštalácia a spustenie backendu

```bash
# Prejdite do adresára backendu
cd backend

# Inštalácia závislostí
npm install

# Vytvorte .env súbor
cp .env.example .env
```

Upravte `.env` súbor podľa vašej lokálnej konfigurácie:

```
PORT=4000
NODE_ENV=development
JWT_SECRET=lokalne_tajomstvo_pre_vyvoj
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgres://username:password@localhost:5432/architekt_kuziel
```

Nahraďte `username` a `password` vašimi PostgreSQL prihlasovacími údajmi.

Vytvorte databázu v PostgreSQL:

```bash
# Pripojte sa k PostgreSQL
psql -U username

# V PostgreSQL konzole vytvorte databázu
CREATE DATABASE architekt_kuziel;
\q
```

Spustite migráciu databázy:

```bash
# Spustite migračný skript
node migrate.js
```

Spustite backend server:

```bash
# Spustenie vývojového servera
npm run dev
```

Backend by mal byť dostupný na adrese `http://localhost:4000`.

### 3. Inštalácia a spustenie frontendu

Otvorte nový terminál a prejdite do adresára frontendu:

```bash
# Prejdite do adresára frontendu
cd frontend

# Inštalácia závislostí
npm install
```

Vytvorte `.env.local` súbor s nasledujúcim obsahom:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Spustite frontend vývojový server:

```bash
# Spustenie vývojového servera
npm run dev
```

Frontend by mal byť dostupný na adrese `http://localhost:3000`.

## Testovanie aplikácie

Po úspešnom spustení backendu a frontendu môžete otestovať aplikáciu:

1. Otvorte webový prehliadač a prejdite na `http://localhost:3000`
2. Prihláste sa pomocou predvytvorených prihlasovacích údajov:
   - Email: admin@architekt-kuziel.sk
   - Heslo: admin123

## Riešenie problémov

### Problémy s databázou

Ak máte problémy s pripojením k databáze:
- Skontrolujte, či je PostgreSQL server spustený
- Overte správnosť prihlasovacích údajov v `.env` súbore
- Skontrolujte, či databáza `architekt_kuziel` existuje

### Problémy s Node.js

Ak máte problémy s Node.js:
- Skontrolujte verziu Node.js pomocou `node -v` (mala by byť 16 alebo novšia)
- Skúste vymazať adresáre `node_modules` a súbory `package-lock.json`, a potom znova spustiť `npm install`

### Problémy s portami

Ak sú porty 3000 alebo 4000 obsadené:
- Môžete zmeniť port pre backend v `.env` súbore
- Pre frontend môžete zmeniť port pomocou `npm run dev -- -p 3001`

## Vývoj a úpravy

### Frontend

Frontend je postavený na Next.js s React a Redux. Hlavné súbory:
- `pages/` - Next.js stránky
- `components/` - React komponenty
- `styles/` - CSS štýly

### Backend

Backend je postavený na Express s GraphQL. Hlavné súbory:
- `server.js` - Hlavný súbor servera
- `models/` - Databázové modely
- `schema/` - GraphQL schéma
- `routes/` - API endpointy
- `services/` - Biznis logika

## Produkčný build

Pre vytvorenie produkčného buildu:

### Frontend

```bash
cd frontend
npm run build
```

### Backend

Backend nevyžaduje špeciálny build proces, stačí nastaviť `NODE_ENV=production` v `.env` súbore.

## Ďalšie informácie

Pre viac informácií o architektúre a funkcionalite aplikácie si pozrite `README.md` a `FINAL_REPORT.md`.
