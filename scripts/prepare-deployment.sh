#!/bin/bash

# Skript pre spustenie prípravy deployment balíčka
echo "Spúšťam prípravu deployment balíčka pre aplikáciu Architekt kúziel..."

# Kontrola, či je nainštalovaný Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js nie je nainštalovaný. Prosím, nainštalujte Node.js a skúste znova."
    exit 1
fi

# Kontrola, či je nainštalovaný npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm nie je nainštalovaný. Prosím, nainštalujte npm a skúste znova."
    exit 1
fi

# Inštalácia potrebných závislostí
echo "Inštalujem potrebné závislosti..."
npm install --no-save archiver

# Spustenie skriptu pre prípravu deployment balíčka
node scripts/prepare-deployment.js

# Kontrola, či sa skript úspešne dokončil
if [ $? -eq 0 ]; then
    echo "✅ Príprava deployment balíčka úspešne dokončená!"
    echo "Deployment balíčky sú dostupné v adresári: $(pwd)/deployment"
else
    echo "❌ Príprava deployment balíčka zlyhala. Skontrolujte chybové hlásenia vyššie."
    exit 1
fi
