const express = require('express');
const enhancedAiService = require('../services/enhancedAiService');

module.exports = (app) => {
  const router = express.Router();

  // Endpoint pre rozšírenú analýzu obsahu
  router.post('/api/ai/enhanced/analyze', async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: 'Text je povinný parameter' });
      }
      
      const analysis = await enhancedAiService.analyzeContent(text);
      res.json(analysis);
    } catch (error) {
      console.error('Chyba pri rozšírenej analýze obsahu:', error);
      res.status(500).json({ error: 'Interná chyba servera' });
    }
  });

  // Endpoint pre pokročilé generovanie obsahu
  router.post('/api/ai/enhanced/generate', async (req, res) => {
    try {
      const { prompt, type, tone, language } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt je povinný parameter' });
      }
      
      const options = {
        prompt,
        type: type || 'article',
        tone: tone || 'formal',
        language: language || 'sk'
      };
      
      const content = await enhancedAiService.generateContent(options);
      res.json({ content });
    } catch (error) {
      console.error('Chyba pri generovaní obsahu:', error);
      res.status(500).json({ error: 'Interná chyba servera' });
    }
  });

  // Endpoint pre pokročilú predikciu akcií používateľa
  router.post('/api/ai/enhanced/predict', async (req, res) => {
    try {
      const { userContext } = req.body;
      
      if (!userContext) {
        return res.status(400).json({ error: 'Kontext používateľa je povinný parameter' });
      }
      
      const predictions = await enhancedAiService.predictUserActions(userContext);
      res.json({ predictions });
    } catch (error) {
      console.error('Chyba pri predikcii akcií:', error);
      res.status(500).json({ error: 'Interná chyba servera' });
    }
  });

  // Endpoint pre sumarizáciu obsahu
  router.post('/api/ai/enhanced/summarize', async (req, res) => {
    try {
      const { text, maxLength, extractKeyPoints, extractActionItems } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: 'Text je povinný parameter' });
      }
      
      const options = {
        maxLength: maxLength || 200,
        extractKeyPoints: extractKeyPoints !== undefined ? extractKeyPoints : true,
        extractActionItems: extractActionItems !== undefined ? extractActionItems : false
      };
      
      const summary = await enhancedAiService.summarizeContent(text, options);
      res.json(summary);
    } catch (error) {
      console.error('Chyba pri sumarizácii obsahu:', error);
      res.status(500).json({ error: 'Interná chyba servera' });
    }
  });

  // Registrácia routera
  app.use(router);
};
