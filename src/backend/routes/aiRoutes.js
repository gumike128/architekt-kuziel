const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const { Content } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

// Middleware to check authentication
const checkAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};

// Analyze content and generate suggestions
router.post('/analyze-content', checkAuth, async (req, res) => {
  try {
    const { contentId, text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Content text is required' });
    }
    
    const analysis = await aiService.analyzeContent(text);
    
    res.json(analysis);
  } catch (error) {
    console.error('Error in content analysis:', error);
    res.status(500).json({ error: 'Failed to analyze content' });
  }
});

// Generate prompt suggestions
router.post('/prompt-suggestions', checkAuth, async (req, res) => {
  try {
    const { input } = req.body;
    
    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }
    
    // Get user context from database (in a real implementation)
    const userContext = {
      userId: req.user.id,
      // Additional context would be fetched from database
    };
    
    const suggestions = await aiService.generatePromptSuggestions(input, userContext);
    
    res.json(suggestions);
  } catch (error) {
    console.error('Error generating prompt suggestions:', error);
    res.status(500).json({ error: 'Failed to generate prompt suggestions' });
  }
});

// Get content recommendations
router.get('/recommendations', checkAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // In a real implementation, we would fetch user interactions from database
    const userInteractions = [];
    
    const recommendations = await aiService.recommendContent(userId, userInteractions);
    
    res.json(recommendations);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

// Predict user needs
router.get('/predict-needs', checkAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // In a real implementation, we would fetch user interactions from database
    const userInteractions = [];
    
    const predictions = await aiService.predictUserNeeds(userId, userInteractions);
    
    res.json(predictions);
  } catch (error) {
    console.error('Error predicting user needs:', error);
    res.status(500).json({ error: 'Failed to predict user needs' });
  }
});

module.exports = router;
