# Návod na prenos aplikácie "Architekt kúziel" na GitHub

Tento dokument obsahuje podrobný návod na prenos aplikácie "Architekt kúziel" na GitHub, vrátane vytvorenia repozitára, inicializácie Git, pridania súborov a nahratia na GitHub.

## Obsah

1. [Príprava lokálneho Git repozitára](#1-príprava-lokálneho-git-repozitára)
2. [Vytvorenie GitHub repozitára](#2-vytvorenie-github-repozitára)
3. [Prepojenie lokálneho repozitára s GitHub](#3-prepojenie-lokálneho-repozitára-s-github)
4. [Nahratie súborov na GitHub](#4-nahratie-súborov-na-github)
5. [Ďalšie kroky a odporúčania](#5-ďalšie-kroky-a-odporúčania)

## 1. Príprava lokálneho Git repozitára

### 1.1 Kontrola inštalácie Git

Najprv skontrolujte, či máte nainštalovaný Git:

```bash
git --version
```

Ak Git nie je nainštalovaný, nainštalujte ho podľa vášho operačného systému.

### 1.2 Inicializácia Git repozitára

Prejdite do koreňového adresára projektu a inicializujte Git repozitár:

```bash
cd /home/ubuntu/architekt-kuziel
git init
```

### 1.3 Vytvorenie .gitignore súboru

Vytvorte alebo upravte súbor `.gitignore` pre vylúčenie nepotrebných súborov:

```bash
cat > .gitignore << 'EOL'
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Next.js
.next/
out/

# Production
build
dist

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# IDE
.idea
.vscode
*.swp
*.swo

# Logs
logs
*.log

# Cache
.npm
.eslintcache
.cache
EOL
```

### 1.4 Pridanie súborov do Git

Pridajte všetky súbory do Git:

```bash
git add .
```

### 1.5 Vytvorenie prvého commitu

Vytvorte prvý commit:

```bash
git commit -m "Initial commit - Architekt kúziel application"
```

## 2. Vytvorenie GitHub repozitára

### 2.1 Prihlásenie do GitHub

1. Navštívte [GitHub](https://github.com) a prihláste sa do svojho účtu
2. Ak nemáte účet, vytvorte si nový

### 2.2 Vytvorenie nového repozitára

1. Kliknite na tlačidlo "+" v pravom hornom rohu a vyberte "New repository"
2. Zadajte názov repozitára (napr. "architekt-kuziel")
3. Voliteľne pridajte popis repozitára
4. Vyberte viditeľnosť repozitára (verejný alebo súkromný)
5. **Nezaškrtávajte** možnosti "Initialize this repository with a README", "Add .gitignore", ani "Add a license"
6. Kliknite na tlačidlo "Create repository"

## 3. Prepojenie lokálneho repozitára s GitHub

Po vytvorení repozitára na GitHub sa zobrazí stránka s inštrukciami. Použite nasledujúce príkazy pre prepojenie vášho lokálneho repozitára s GitHub:

### 3.1 Pridanie vzdialeného repozitára

```bash
git remote add origin https://github.com/VASE_POUZIVATELSKE_MENO/architekt-kuziel.git
```

Nahraďte `VASE_POUZIVATELSKE_MENO` vaším používateľským menom na GitHub.

### 3.2 Overenie vzdialeného repozitára

Overte, či bol vzdialený repozitár správne pridaný:

```bash
git remote -v
```

Mali by ste vidieť niečo podobné:

```
origin  https://github.com/VASE_POUZIVATELSKE_MENO/architekt-kuziel.git (fetch)
origin  https://github.com/VASE_POUZIVATELSKE_MENO/architekt-kuziel.git (push)
```

## 4. Nahratie súborov na GitHub

### 4.1 Nahratie hlavnej vetvy

Nahrajte vašu hlavnú vetvu na GitHub:

```bash
git push -u origin main
```

Ak používate staršiu verziu Git, hlavná vetva môže byť pomenovaná "master" namiesto "main":

```bash
git push -u origin master
```

### 4.2 Zadanie prihlasovacích údajov

Pri prvom nahratí budete požiadaní o zadanie vašich prihlasovacích údajov pre GitHub. Zadajte vaše používateľské meno a heslo.

**Poznámka:** GitHub už nepodporuje autentifikáciu pomocou hesla cez príkazový riadok. Namiesto toho budete musieť použiť osobný prístupový token (Personal Access Token):

1. Navštívte [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Kliknite na "Generate new token"
3. Zadajte popis tokenu (napr. "Architekt kúziel")
4. Vyberte rozsah "repo" pre plný prístup k repozitárom
5. Kliknite na "Generate token"
6. Skopírujte vygenerovaný token
7. Použite tento token namiesto hesla pri nahrávaní na GitHub

Alternatívne môžete nastaviť SSH kľúč pre bezpečnejšiu autentifikáciu bez hesla.

## 5. Ďalšie kroky a odporúčania

### 5.1 Vytvorenie README.md

Vytvorte súbor README.md s popisom projektu:

```bash
cat > README.md << 'EOL'
# Architekt kúziel

Inteligentný, automatizovaný ekosystém pre prácu s informáciami a obsahom.

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

## Inštalácia

Podrobné inštrukcie pre inštaláciu nájdete v súbore [LOCAL_INSTALLATION.md](LOCAL_INSTALLATION.md).

## Dokumentácia

- [Dokumentácia pre vývojárov](docs/DEVELOPER_DOCUMENTATION.md)
- [Používateľská príručka](docs/USER_DOCUMENTATION.md)

## Licencia

Tento projekt je licencovaný pod [MIT licenciou](LICENSE).
EOL

git add README.md
git commit -m "Add README.md"
git push origin main
```

### 5.2 Vytvorenie vetiev pre vývoj

Pre lepšiu organizáciu vývoja vytvorte vývojové vetvy:

```bash
# Vytvorenie vývojovej vetvy
git checkout -b develop
git push -u origin develop

# Vytvorenie vetvy pre funkcie
git checkout -b feature/new-feature develop
# Po dokončení funkcie
git checkout develop
git merge --no-ff feature/new-feature
git push origin develop
git branch -d feature/new-feature
```

### 5.3 Nastavenie GitHub Pages (voliteľné)

Ak chcete zobraziť dokumentáciu alebo demo aplikácie na GitHub Pages:

1. Na GitHub prejdite do nastavení repozitára (Settings)
2. Prejdite do sekcie "Pages"
3. Vyberte vetvu a adresár pre GitHub Pages
4. Kliknite na "Save"

### 5.4 Nastavenie GitHub Actions (voliteľné)

Pre automatizáciu procesov (CI/CD) môžete nastaviť GitHub Actions:

1. Vytvorte adresár `.github/workflows` v koreňovom adresári projektu
2. Vytvorte súbor `ci.yml` s konfiguráciou pre testovanie a nasadenie

```bash
mkdir -p .github/workflows
cat > .github/workflows/ci.yml << 'EOL'
name: CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: |
          npm ci
          cd src/frontend && npm ci
          cd ../backend && npm ci
      - name: Run tests
        run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: |
          npm ci
          cd src/frontend && npm ci
          cd ../backend && npm ci
      - name: Build
        run: |
          cd src/frontend && npm run build
          cd ../backend && npm run build
EOL

git add .github/workflows/ci.yml
git commit -m "Add GitHub Actions CI/CD workflow"
git push origin main
```

## Záver

Teraz máte aplikáciu "Architekt kúziel" úspešne nahratú na GitHub. Repozitár obsahuje všetky zdrojové súbory, dokumentáciu a konfiguráciu pre ďalší vývoj a spoluprácu.

Pre prístup k vášmu repozitáru navštívte:
```
https://github.com/VASE_POUZIVATELSKE_MENO/architekt-kuziel
```

Nahraďte `VASE_POUZIVATELSKE_MENO` vaším používateľským menom na GitHub.
