# Nasadenie aplikácie "Architekt kúziel" na Vercel a Railway

Tento dokument obsahuje inštrukcie pre nasadenie aplikácie "Architekt kúziel" na platformy Vercel (frontend) a Railway (backend a databáza).

## Nasadenie frontendu na Vercel

### Príprava
1. Vytvorte účet na [Vercel](https://vercel.com) ak ho ešte nemáte
2. Pripojte svoj GitHub repozitár alebo nahrajte kód priamo
3. Nastavte nasledujúce environment variables:
   - `NEXT_PUBLIC_API_URL`: URL vášho backend API (napr. https://api-architekt-kuziel.up.railway.app)

### Kroky nasadenia
1. Prejdite na [Vercel Dashboard](https://vercel.com/dashboard)
2. Kliknite na "New Project"
3. Importujte svoj GitHub repozitár alebo nahrajte priečinok `deployment-web/frontend`
4. Nakonfigurujte projekt:
   - Framework Preset: Next.js
   - Root Directory: `./` (alebo cesta k frontend kódu)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Nastavte environment variables
6. Kliknite na "Deploy"

## Nasadenie backendu na Railway

### Príprava
1. Vytvorte účet na [Railway](https://railway.app) ak ho ešte nemáte
2. Pripojte svoj GitHub repozitár alebo nahrajte kód priamo
3. Nastavte nasledujúce environment variables:
   - `PORT`: 4000
   - `NODE_ENV`: production
   - `JWT_SECRET`: silný tajný kľúč pre JWT tokeny
   - `FRONTEND_URL`: URL vášho frontend nasadenia (napr. https://architekt-kuziel.vercel.app)
   - `DATABASE_URL`: automaticky poskytnuté Railway po vytvorení PostgreSQL databázy

### Kroky nasadenia
1. Prejdite na [Railway Dashboard](https://railway.app/dashboard)
2. Vytvorte nový projekt
3. Pridajte PostgreSQL databázu:
   - Kliknite na "New"
   - Vyberte "Database"
   - Vyberte "PostgreSQL"
4. Pridajte nový service:
   - Kliknite na "New"
   - Vyberte "GitHub Repo" alebo "Deploy from Source"
   - Vyberte alebo nahrajte priečinok `deployment-web/backend`
5. Nakonfigurujte service:
   - Start Command: `node server.js`
   - Nastavte environment variables
6. Spustite migráciu databázy:
   - Otvorte terminál pre service
   - Spustite `node migrate.js`
7. Nastavte doménu pre backend API

## Verifikácia nasadenia

Po úspešnom nasadení overte nasledujúce:

1. Frontend je dostupný na pridelenej Vercel URL
2. Backend API je dostupné na pridelenej Railway URL
3. Registrácia a prihlásenie fungujú správne
4. Dashboard a všetky hlavné funkcie sú funkčné
5. API volania medzi frontendom a backendom fungujú správne
6. Databázové operácie fungujú správne

## Prístupové údaje pre testovanie

Po nasadení môžete použiť nasledujúce prístupové údaje pre testovanie:

- Email: admin@architekt-kuziel.sk
- Heslo: admin123

## Údržba a monitorovanie

- Vercel poskytuje základné analytiky a logy pre frontend
- Railway poskytuje monitorovanie a logy pre backend a databázu
- Pre pokročilejšie monitorovanie zvážte integráciu služieb ako Sentry alebo LogRocket
