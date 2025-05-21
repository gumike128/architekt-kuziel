# Architekt kúziel

Inteligentný, automatizovaný ekosystém pre prácu s informáciami a obsahom.

![Architekt kúziel Logo](assets/architekt-kuziel-logo-001.png)

## Popis

Aplikácia "Architekt kúziel" je plne funkčný inteligentný ekosystém pre prácu s informáciami a obsahom, ktorý zahŕňa:

1. **Univerzálny Prompt Interface** - intuitívne rozhranie pre interakciu s aplikáciou
2. **Adaptívny Dashboard** - personalizovaný dashboard s konfigurovateľnými widgetmi
3. **MindFinder Navigator** - inteligentná organizácia a vizualizácia obsahu
4. **Content Creation Studio** - pokročilý editor s AI asistentom
5. **AI/ML komponenty** - vrátane Context Analyzer, Semantic Tagger, Pattern Recognizer a ďalších

## Technológie

Aplikácia je implementovaná pomocou moderných technológií:
- Frontend: Next.js, TypeScript, Redux, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, GraphQL, Socket.IO
- Databáza: PostgreSQL
- AI: Integrácia s OpenAI API a Groq AI API

## Architektúra systému

Aplikácia je postavená na modernej mikroslužbovej architektúre s jasným oddelením frontendu a backendu:

+----------------------------------+
| Frontend |
| (Next.js, React, Redux, UI) |
+----------------------------------+
|
| HTTP/WebSocket
|
+----------------------------------+
| Backend |
| (Node.js, Express, GraphQL) |
+----------------------------------+
|
| ORM
|
+----------------------------------+
| Databáza |
| (PostgreSQL) |
+----------------------------------+
|
| API
|
+----------------------------------+
| Externé služby |
| (OpenAI API, Groq API, atď.) |
+----------------------------------+

## Požiadavky

- Node.js (v16+)
- npm (v8+) alebo yarn (v1.22+)
- PostgreSQL (v13+)
- Git

## Inštalácia

Podrobné inštrukcie pre inštaláciu nájdete v súbore [LOCAL_INSTALLATION.md](docs/LOCAL_INSTALLATION.md).

### Rýchly štart

```bash
# Klonovanie repozitára
git clone https://github.com/your-username/architekt-kuziel.git
cd architekt-kuziel

# Inštalácia závislostí
npm install

# Inštalácia frontend závislostí
cd src/frontend
npm install
cd ../..

# Inštalácia backend závislostí
cd src/backend
npm install
cd ../..

# Spustenie vývojových serverov
# V jednom termináli (backend)
cd src/backend
npm run dev

# V druhom termináli (frontend)
cd src/frontend
npm run dev


Tento README.md súbor poskytuje komplexný prehľad o vašom projekte, jeho funkciách, architektúre, technológiách a inštalačnom procese. Obsahuje tiež sekcie pre roadmap, prispievanie a kontaktné informácie.

Pred použitím nezabudnite:
1. Nahradiť placeholder pre logo skutočným logom projektu (ak ho máte)
2. Aktualizovať GitHub URL adresy vašim skutočným používateľským menom
3. Doplniť vaše kontaktné informácie
4. Upraviť roadmap podľa aktuálneho stavu projektu

Chcete, aby som upravil niektorú časť tohto README súboru?

