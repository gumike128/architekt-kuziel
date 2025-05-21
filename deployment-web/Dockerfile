FROM node:16-alpine AS builder

WORKDIR /app

# Kopírovanie package.json a package-lock.json
COPY package.json package-lock.json ./

# Inštalácia závislostí
RUN npm ci

# Kopírovanie zdrojových súborov
COPY . .

# Build aplikácie
RUN npm run build

# Produkčný image
FROM node:16-alpine

WORKDIR /app

# Kopírovanie package.json a package-lock.json
COPY package.json package-lock.json ./

# Inštalácia len produkčných závislostí
RUN npm ci --production

# Kopírovanie buildu z builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env.example ./

# Nastavenie premenných prostredia
ENV NODE_ENV=production
ENV PORT=4000

# Expozícia portu
EXPOSE 4000

# Spustenie aplikácie
CMD ["npm", "start"]
