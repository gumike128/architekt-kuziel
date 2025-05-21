const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Skript pre automatizáciu optimalizácie a testovania aplikácie
const optimizationScript = async () => {
  console.log('Spúšťam optimalizáciu a testovanie aplikácie "Architekt kúziel"...');
  
  // Cesty k adresárom
  const rootDir = path.resolve(__dirname, '..');
  const frontendDir = path.join(rootDir, 'src', 'frontend');
  const backendDir = path.join(rootDir, 'src', 'backend');
  const testReportsDir = path.join(rootDir, 'test-reports');
  
  // Vytvorenie adresára pre reporty, ak neexistuje
  if (!fs.existsSync(testReportsDir)) {
    fs.mkdirSync(testReportsDir, { recursive: true });
  }
  
  try {
    // 1. Spustenie testov
    console.log('\n--- Spúšťam frontend testy ---');
    execSync('npm test -- --coverage', { 
      cwd: frontendDir,
      stdio: 'inherit'
    });
    
    console.log('\n--- Spúšťam backend testy ---');
    execSync('npm test -- --coverage', { 
      cwd: backendDir,
      stdio: 'inherit'
    });
    
    // 2. Analýza kódu a optimalizácia
    console.log('\n--- Spúšťam analýzu kódu ---');
    
    // ESLint pre frontend
    console.log('Kontrola a oprava frontend kódu pomocou ESLint...');
    execSync('npx eslint --fix .', { 
      cwd: frontendDir,
      stdio: 'inherit'
    });
    
    // ESLint pre backend
    console.log('Kontrola a oprava backend kódu pomocou ESLint...');
    execSync('npx eslint --fix .', { 
      cwd: backendDir,
      stdio: 'inherit'
    });
    
    // 3. Optimalizácia veľkosti bundlov
    console.log('\n--- Spúšťam analýzu bundlov ---');
    execSync('ANALYZE=true npm run build', { 
      cwd: frontendDir,
      stdio: 'inherit',
      env: { ...process.env, ANALYZE: 'true' }
    });
    
    // 4. Kontrola výkonu
    console.log('\n--- Spúšťam lighthouse audit ---');
    execSync('npx lighthouse http://localhost:3000 --output-path=../../../test-reports/lighthouse-report.html --view', { 
      cwd: frontendDir,
      stdio: 'inherit'
    });
    
    // 5. Kontrola prístupnosti
    console.log('\n--- Spúšťam kontrolu prístupnosti ---');
    execSync('npx pa11y http://localhost:3000 > ../../../test-reports/accessibility-report.txt', { 
      cwd: frontendDir,
      stdio: 'inherit'
    });
    
    // 6. Optimalizácia obrázkov
    console.log('\n--- Optimalizujem obrázky ---');
    execSync('npx imagemin-cli "public/images/**/*.{jpg,png,svg}" --out-dir=public/images/optimized', { 
      cwd: frontendDir,
      stdio: 'inherit'
    });
    
    // 7. Produkčný build
    console.log('\n--- Vytváram produkčný build ---');
    execSync('npm run build', { 
      cwd: frontendDir,
      stdio: 'inherit'
    });
    
    console.log('\n--- Vytváram produkčný build backendu ---');
    execSync('npm run build', { 
      cwd: backendDir,
      stdio: 'inherit'
    });
    
    console.log('\n✅ Optimalizácia a testovanie úspešne dokončené!');
    console.log(`Reporty sú dostupné v adresári: ${testReportsDir}`);
    
  } catch (error) {
    console.error('\n❌ Chyba počas optimalizácie a testovania:');
    console.error(error.message);
    process.exit(1);
  }
};

// Spustenie skriptu
optimizationScript();
