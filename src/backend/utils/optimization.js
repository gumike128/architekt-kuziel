const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');

// Optimalizácia výkonu servera
module.exports = {
  // Middleware pre optimalizáciu Express servera
  applyOptimizations: (app) => {
    // Kompresia odpovedí
    app.use(compression({
      level: 6, // Optimálny pomer medzi rýchlosťou a kompresiou
      threshold: 1024, // Minimálna veľkosť pre kompresiu (1KB)
    }));
    
    // Bezpečnostné hlavičky
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "blob:"],
          connectSrc: ["'self'", "https://api.architekt-kuziel.sk"],
        },
      },
    }));
    
    // CORS nastavenia
    app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }));
    
    // Rate limiting pre ochranu pred DoS útokmi
    const apiLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minút
      max: 100, // limit 100 požiadaviek na IP
      standardHeaders: true,
      legacyHeaders: false,
      message: 'Príliš veľa požiadaviek z tejto IP adresy, skúste to znova neskôr',
    });
    app.use('/api/', apiLimiter);
    
    // Logovanie požiadaviek
    if (process.env.NODE_ENV === 'production') {
      app.use(morgan('combined'));
    } else {
      app.use(morgan('dev'));
    }
    
    // Statické súbory s cache kontrolou
    app.use(express.static(path.join(__dirname, 'public'), {
      maxAge: '1d', // Cache na 1 deň
      etag: true,
      lastModified: true,
    }));
    
    // Optimalizácia JSON parsera
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    
    return app;
  },
  
  // Optimalizácia databázových operácií
  optimizeDatabaseQueries: (sequelize) => {
    // Nastavenie connection poolu
    sequelize.options.pool = {
      max: 10, // Maximálny počet pripojení
      min: 0, // Minimálny počet pripojení
      acquire: 30000, // Maximálny čas na získanie pripojenia (ms)
      idle: 10000, // Maximálny čas nečinnosti pripojenia (ms)
    };
    
    return sequelize;
  },
  
  // Optimalizácia GraphQL
  optimizeGraphQL: (apolloServer) => {
    // Nastavenie cache
    apolloServer.cache('bounded');
    
    // Nastavenie introspekcie (vypnuté v produkcii)
    apolloServer.introspection = process.env.NODE_ENV !== 'production';
    
    // Nastavenie persistentných operácií
    apolloServer.persistedQueries = {
      ttl: 900, // 15 minút
    };
    
    return apolloServer;
  },
  
  // Optimalizácia AI/ML operácií
  optimizeAIOperations: () => {
    return {
      // Nastavenie cache pre AI odpovede
      cacheConfig: {
        ttl: 3600, // 1 hodina
        maxSize: 100, // Maximálny počet položiek v cache
      },
      
      // Nastavenie batch spracovania
      batchProcessing: {
        maxBatchSize: 10, // Maximálny počet požiadaviek v jednej dávke
        batchInterval: 100, // Interval pre spracovanie dávky (ms)
      },
      
      // Nastavenie throttlingu pre AI požiadavky
      throttling: {
        maxRequestsPerMinute: 60, // Maximálny počet požiadaviek za minútu
        maxConcurrentRequests: 5, // Maximálny počet súbežných požiadaviek
      },
    };
  },
};
