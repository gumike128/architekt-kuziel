const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const archiver = require('archiver');

// Skript pre prípravu deployment balíčka aplikácie "Architekt kúziel"
const prepareDeploymentPackage = async () => {
  console.log('Spúšťam prípravu deployment balíčka pre aplikáciu "Architekt kúziel"...');
  
  // Cesty k adresárom
  const rootDir = path.resolve(__dirname, '..');
  const frontendDir = path.join(rootDir, 'src', 'frontend');
  const backendDir = path.join(rootDir, 'src', 'backend');
  const deploymentDir = path.join(rootDir, 'deployment');
  const frontendBuildDir = path.join(frontendDir, '.next');
  const backendBuildDir = path.join(backendDir, 'dist');
  
  // Vytvorenie deployment adresára, ak neexistuje
  if (!fs.existsSync(deploymentDir)) {
    fs.mkdirSync(deploymentDir, { recursive: true });
  }
  
  try {
    // 1. Vyčistenie predchádzajúcich buildov
    console.log('\n--- Čistenie predchádzajúcich buildov ---');
    if (fs.existsSync(path.join(deploymentDir, 'frontend.zip'))) {
      fs.unlinkSync(path.join(deploymentDir, 'frontend.zip'));
    }
    if (fs.existsSync(path.join(deploymentDir, 'backend.zip'))) {
      fs.unlinkSync(path.join(deploymentDir, 'backend.zip'));
    }
    if (fs.existsSync(path.join(deploymentDir, 'full-package.zip'))) {
      fs.unlinkSync(path.join(deploymentDir, 'full-package.zip'));
    }
    
    // 2. Vytvorenie produkčných buildov
    console.log('\n--- Vytváram produkčný build frontendu ---');
    execSync('npm run build', { 
      cwd: frontendDir,
      stdio: 'inherit'
    });
    
    console.log('\n--- Vytváram produkčný build backendu ---');
    execSync('npm run build', { 
      cwd: backendDir,
      stdio: 'inherit'
    });
    
    // 3. Vytvorenie frontend deployment balíčka
    console.log('\n--- Vytváram frontend deployment balíček ---');
    await createZipArchive(
      frontendBuildDir,
      path.join(deploymentDir, 'frontend.zip'),
      'Frontend build'
    );
    
    // Pridanie package.json a ďalších potrebných súborov pre frontend
    const frontendPackageOutput = fs.createWriteStream(path.join(deploymentDir, 'frontend-package.zip'));
    const frontendPackageArchive = archiver('zip', { zlib: { level: 9 } });
    
    frontendPackageArchive.pipe(frontendPackageOutput);
    frontendPackageArchive.file(path.join(frontendDir, 'package.json'), { name: 'package.json' });
    frontendPackageArchive.file(path.join(frontendDir, 'next.config.js'), { name: 'next.config.js' });
    frontendPackageArchive.directory(frontendBuildDir, '.next');
    frontendPackageArchive.directory(path.join(frontendDir, 'public'), 'public');
    
    await new Promise((resolve, reject) => {
      frontendPackageOutput.on('close', resolve);
      frontendPackageArchive.on('error', reject);
      frontendPackageArchive.finalize();
    });
    
    // 4. Vytvorenie backend deployment balíčka
    console.log('\n--- Vytváram backend deployment balíček ---');
    await createZipArchive(
      backendBuildDir,
      path.join(deploymentDir, 'backend.zip'),
      'Backend build'
    );
    
    // Pridanie package.json a ďalších potrebných súborov pre backend
    const backendPackageOutput = fs.createWriteStream(path.join(deploymentDir, 'backend-package.zip'));
    const backendPackageArchive = archiver('zip', { zlib: { level: 9 } });
    
    backendPackageArchive.pipe(backendPackageOutput);
    backendPackageArchive.file(path.join(backendDir, 'package.json'), { name: 'package.json' });
    backendPackageArchive.file(path.join(backendDir, '.env.example'), { name: '.env.example' });
    backendPackageArchive.directory(backendBuildDir, 'dist');
    
    await new Promise((resolve, reject) => {
      backendPackageOutput.on('close', resolve);
      backendPackageArchive.on('error', reject);
      backendPackageArchive.finalize();
    });
    
    // 5. Vytvorenie kompletného deployment balíčka
    console.log('\n--- Vytváram kompletný deployment balíček ---');
    const fullPackageOutput = fs.createWriteStream(path.join(deploymentDir, 'full-package.zip'));
    const fullPackageArchive = archiver('zip', { zlib: { level: 9 } });
    
    fullPackageArchive.pipe(fullPackageOutput);
    
    // Pridanie README a deployment inštrukcií
    fullPackageArchive.file(path.join(rootDir, 'README.md'), { name: 'README.md' });
    
    // Vytvorenie deployment inštrukcií
    const deploymentInstructions = `# Inštrukcie pre nasadenie aplikácie "Architekt kúziel"

## Požiadavky
- Node.js 16+ 
- npm 8+
- PostgreSQL 13+
- Redis (voliteľné, pre cache)

## Kroky pre nasadenie

### Frontend
1. Rozbaľte súbor \`frontend-package.zip\`
2. Nainštalujte závislosti: \`npm install --production\`
3. Spustite aplikáciu: \`npm start\`
4. Aplikácia bude dostupná na porte 3000 (alebo podľa nastavenia PORT v prostredí)

### Backend
1. Rozbaľte súbor \`backend-package.zip\`
2. Nainštalujte závislosti: \`npm install --production\`
3. Vytvorte súbor \`.env\` podľa vzoru \`.env.example\` a nastavte potrebné premenné prostredia
4. Spustite aplikáciu: \`npm start\`
5. API bude dostupné na porte 4000 (alebo podľa nastavenia PORT v prostredí)

## Premenné prostredia

### Frontend
- \`NEXT_PUBLIC_API_URL\`: URL backendu (napr. http://localhost:4000)

### Backend
- \`PORT\`: Port, na ktorom bude bežať backend (predvolene 4000)
- \`NODE_ENV\`: Prostredie (production/development)
- \`FRONTEND_URL\`: URL frontendu pre CORS (napr. http://localhost:3000)
- \`JWT_SECRET\`: Tajný kľúč pre JWT tokeny
- \`DATABASE_URL\`: URL pripojenia k PostgreSQL databáze

## Docker nasadenie
Pre nasadenie pomocou Dockeru sú k dispozícii Dockerfile súbory v adresároch frontend a backend.

### Frontend
\`\`\`bash
docker build -t architekt-kuziel-frontend ./frontend
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://api.example.com architekt-kuziel-frontend
\`\`\`

### Backend
\`\`\`bash
docker build -t architekt-kuziel-backend ./backend
docker run -p 4000:4000 -e DATABASE_URL=postgresql://user:password@db:5432/architekt_kuziel -e JWT_SECRET=your_secret architekt-kuziel-backend
\`\`\`

## Docker Compose
Pre jednoduché nasadenie celej aplikácie vrátane databázy použite priložený docker-compose.yml súbor:

\`\`\`bash
docker-compose up -d
\`\`\`

## Kontakt
V prípade problémov s nasadením kontaktujte podporu na adrese support@architekt-kuziel.sk
`;
    
    // Uloženie deployment inštrukcií do súboru
    fs.writeFileSync(path.join(deploymentDir, 'DEPLOYMENT.md'), deploymentInstructions);
    fullPackageArchive.file(path.join(deploymentDir, 'DEPLOYMENT.md'), { name: 'DEPLOYMENT.md' });
    
    // Pridanie Docker súborov
    // Docker pre frontend
    const frontendDockerfile = `FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production

COPY .next ./.next
COPY public ./public
COPY next.config.js ./

EXPOSE 3000

CMD ["npm", "start"]
`;
    fs.writeFileSync(path.join(deploymentDir, 'frontend-Dockerfile'), frontendDockerfile);
    fullPackageArchive.file(path.join(deploymentDir, 'frontend-Dockerfile'), { name: 'frontend/Dockerfile' });
    
    // Docker pre backend
    const backendDockerfile = `FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production

COPY dist ./dist
COPY .env.example ./

EXPOSE 4000

CMD ["npm", "start"]
`;
    fs.writeFileSync(path.join(deploymentDir, 'backend-Dockerfile'), backendDockerfile);
    fullPackageArchive.file(path.join(deploymentDir, 'backend-Dockerfile'), { name: 'backend/Dockerfile' });
    
    // Docker Compose
    const dockerCompose = `version: '3'

services:
  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:4000
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    build:
      context: ./backend
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - NODE_ENV=production
      - FRONTEND_URL=http://localhost:3000
      - JWT_SECRET=change_this_to_a_secure_secret
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/architekt_kuziel
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:13-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=architekt_kuziel
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
`;
    fs.writeFileSync(path.join(deploymentDir, 'docker-compose.yml'), dockerCompose);
    fullPackageArchive.file(path.join(deploymentDir, 'docker-compose.yml'), { name: 'docker-compose.yml' });
    
    // Pridanie frontend a backend balíčkov
    fullPackageArchive.file(path.join(deploymentDir, 'frontend-package.zip'), { name: 'frontend-package.zip' });
    fullPackageArchive.file(path.join(deploymentDir, 'backend-package.zip'), { name: 'backend-package.zip' });
    
    await new Promise((resolve, reject) => {
      fullPackageOutput.on('close', resolve);
      fullPackageArchive.on('error', reject);
      fullPackageArchive.finalize();
    });
    
    // 6. Vytvorenie .env súboru pre lokálne testovanie
    console.log('\n--- Vytváram .env súbor pre lokálne testovanie ---');
    const envContent = `PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=local_development_secret_key
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/architekt_kuziel
`;
    fs.writeFileSync(path.join(deploymentDir, '.env.local'), envContent);
    
    // 7. Vytvorenie skriptu pre rýchle lokálne spustenie
    console.log('\n--- Vytváram skript pre rýchle lokálne spustenie ---');
    const startScript = `#!/bin/bash

# Skript pre rýchle lokálne spustenie aplikácie "Architekt kúziel"
echo "Spúšťam aplikáciu Architekt kúziel lokálne..."

# Spustenie backendu
cd backend
echo "Inštalujem backend závislosti..."
npm install
echo "Spúšťam backend na porte 4000..."
npm start &
BACKEND_PID=$!

# Počkať na spustenie backendu
sleep 5

# Spustenie frontendu
cd ../frontend
echo "Inštalujem frontend závislosti..."
npm install
echo "Spúšťam frontend na porte 3000..."
npm run dev &
FRONTEND_PID=$!

# Zachytenie signálu pre ukončenie
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

# Čakanie na ukončenie
wait
`;
    fs.writeFileSync(path.join(deploymentDir, 'start-local.sh'), startScript);
    fs.chmodSync(path.join(deploymentDir, 'start-local.sh'), '755');
    
    console.log('\n✅ Deployment balíček úspešne vytvorený!');
    console.log(`Balíčky sú dostupné v adresári: ${deploymentDir}`);
    console.log('- frontend-package.zip: Deployment balíček pre frontend');
    console.log('- backend-package.zip: Deployment balíček pre backend');
    console.log('- full-package.zip: Kompletný deployment balíček s inštrukciami a Docker súbormi');
    
  } catch (error) {
    console.error('\n❌ Chyba počas prípravy deployment balíčka:');
    console.error(error.message);
    process.exit(1);
  }
};

// Pomocná funkcia pre vytvorenie ZIP archívu
const createZipArchive = async (sourceDir, outputPath, label) => {
  const output = fs.createWriteStream(outputPath);
  const archive = archiver('zip', { zlib: { level: 9 } });
  
  archive.pipe(output);
  archive.directory(sourceDir, false);
  
  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`${label} archív vytvorený: ${outputPath} (${archive.pointer()} bytov)`);
      resolve();
    });
    archive.on('error', (err) => {
      reject(err);
    });
    archive.finalize();
  });
};

// Kontrola, či je nainštalovaný archiver
try {
  require.resolve('archiver');
} catch (error) {
  console.log('Inštalujem potrebný balíček archiver...');
  execSync('npm install archiver', { stdio: 'inherit' });
}

// Spustenie skriptu
prepareDeploymentPackage();
