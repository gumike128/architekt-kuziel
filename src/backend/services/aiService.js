const axios = require('axios');

// AI/ML service for content analysis and suggestions
class AIService {
  constructor() {
    // In a real implementation, this would be configured with API keys and endpoints
    this.apiEndpoint = process.env.AI_API_ENDPOINT || 'https://api.example.com/ai';
    this.apiKey = process.env.AI_API_KEY || 'dummy_api_key';
  }

  // Analyze content and generate improvement suggestions
  async analyzeContent(content) {
    try {
      // In a real implementation, this would call an external AI service
      // For now, we'll simulate the response
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate mock suggestions based on content length
      const suggestions = [];
      
      if (content.length < 100) {
        suggestions.push({
          type: 'IMPROVEMENT',
          suggestion: 'Rozšírte obsah o viac detailov a príkladov pre lepšie pochopenie.',
          confidence: 0.85
        });
      }
      
      if (!content.includes('záver')) {
        suggestions.push({
          type: 'STRUCTURE',
          suggestion: 'Pridajte záverečnú sekciu, ktorá zhrnie hlavné body.',
          confidence: 0.78
        });
      }
      
      if (content.split('.').length < 5) {
        suggestions.push({
          type: 'CLARITY',
          suggestion: 'Rozdeľte dlhé vety na kratšie pre lepšiu čitateľnosť.',
          confidence: 0.92
        });
      }
      
      return {
        suggestions,
        sentiment: this._analyzeSentiment(content),
        keywords: this._extractKeywords(content),
        readabilityScore: this._calculateReadability(content)
      };
    } catch (error) {
      console.error('Error analyzing content:', error);
      throw new Error('Failed to analyze content');
    }
  }

  // Generate prompt suggestions based on user input
  async generatePromptSuggestions(input, userContext = {}) {
    try {
      // In a real implementation, this would call an external AI service
      // For now, we'll simulate the response
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate mock suggestions based on input
      const suggestions = [];
      
      if (input.toLowerCase().includes('dokument')) {
        suggestions.push({
          text: 'Vytvoriť nový dokument',
          type: 'COMMAND',
          score: 0.95
        });
        suggestions.push({
          text: 'Zobraziť nedávne dokumenty',
          type: 'COMMAND',
          score: 0.85
        });
      }
      
      if (input.toLowerCase().includes('analýz')) {
        suggestions.push({
          text: 'Analyzovať dáta z prieskumu',
          type: 'COMMAND',
          score: 0.92
        });
        suggestions.push({
          text: 'Vytvoriť analytický report',
          type: 'COMMAND',
          score: 0.78
        });
      }
      
      if (input.toLowerCase().includes('projekt')) {
        suggestions.push({
          text: 'Zobraziť stav projektu',
          type: 'COMMAND',
          score: 0.88
        });
        suggestions.push({
          text: 'Aktualizovať projektový plán',
          type: 'COMMAND',
          score: 0.75
        });
      }
      
      // If no specific suggestions, provide general ones
      if (suggestions.length === 0) {
        suggestions.push({
          text: 'Vytvoriť nový obsah',
          type: 'COMMAND',
          score: 0.7
        });
        suggestions.push({
          text: 'Vyhľadať v dokumentoch',
          type: 'COMMAND',
          score: 0.65
        });
        suggestions.push({
          text: 'Zobraziť nedávnu aktivitu',
          type: 'COMMAND',
          score: 0.6
        });
      }
      
      return suggestions;
    } catch (error) {
      console.error('Error generating prompt suggestions:', error);
      throw new Error('Failed to generate prompt suggestions');
    }
  }

  // Recommend content based on user preferences and behavior
  async recommendContent(userId, userInteractions = []) {
    try {
      // In a real implementation, this would call an external AI service
      // For now, we'll simulate the response
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Generate mock recommendations
      return [
        {
          id: '1',
          title: 'Analýza dát z prieskumu',
          relevanceScore: 0.92,
          reason: 'Podobné dokumenty, ktoré ste nedávno prezerali'
        },
        {
          id: '2',
          title: 'Marketingová stratégia 2025',
          relevanceScore: 0.85,
          reason: 'Populárne vo vašej organizácii'
        },
        {
          id: '3',
          title: 'Projektový plán - nový web',
          relevanceScore: 0.78,
          reason: 'Nedávno upravené kolegami'
        }
      ];
    } catch (error) {
      console.error('Error generating content recommendations:', error);
      throw new Error('Failed to generate content recommendations');
    }
  }

  // Analyze user behavior and predict needs
  async predictUserNeeds(userId, userInteractions = []) {
    try {
      // In a real implementation, this would call an external AI service
      // For now, we'll simulate the response
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Generate mock predictions
      return {
        predictedTasks: [
          {
            task: 'Aktualizovať projektový plán',
            confidence: 0.88,
            reason: 'Blížiaci sa termín'
          },
          {
            task: 'Prehliadnuť analytické dáta',
            confidence: 0.75,
            reason: 'Pravidelná aktivita'
          }
        ],
        suggestedWidgets: [
          {
            type: 'RECENT_ACTIVITY',
            confidence: 0.92
          },
          {
            type: 'ANALYTICS',
            confidence: 0.85
          }
        ],
        optimalWorkflowSuggestions: [
          {
            suggestion: 'Zoskupenie súvisiacich dokumentov do kolekcie',
            confidence: 0.82
          }
        ]
      };
    } catch (error) {
      console.error('Error predicting user needs:', error);
      throw new Error('Failed to predict user needs');
    }
  }

  // Private helper methods
  _analyzeSentiment(text) {
    // Simple sentiment analysis simulation
    const positiveWords = ['dobrý', 'skvelý', 'výborný', 'pozitívny', 'úspešný'];
    const negativeWords = ['zlý', 'problém', 'negatívny', 'chyba', 'zlyhanie'];
    
    let score = 0.5; // Neutral starting point
    
    const words = text.toLowerCase().split(/\s+/);
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) {
        score += 0.1;
      }
      if (negativeWords.some(nw => word.includes(nw))) {
        score -= 0.1;
      }
    });
    
    // Clamp between 0 and 1
    score = Math.max(0, Math.min(1, score));
    
    return {
      score,
      label: score > 0.6 ? 'POSITIVE' : score < 0.4 ? 'NEGATIVE' : 'NEUTRAL'
    };
  }

  _extractKeywords(text) {
    // Simple keyword extraction simulation
    const commonWords = ['a', 'the', 'je', 'sú', 'v', 'na', 'to', 'sa', 'si'];
    const words = text.toLowerCase().split(/\s+/);
    
    // Count word frequency
    const wordCount = {};
    words.forEach(word => {
      if (word.length > 3 && !commonWords.includes(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    
    // Convert to array and sort by frequency
    const sortedWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        relevance: count / words.length
      }));
    
    return sortedWords;
  }

  _calculateReadability(text) {
    // Simple readability score simulation
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    
    if (sentences.length === 0 || words.length === 0) {
      return {
        score: 0.5,
        level: 'MEDIUM'
      };
    }
    
    const avgWordsPerSentence = words.length / sentences.length;
    const avgWordLength = words.join('').length / words.length;
    
    // Calculate score based on sentence and word length
    // Lower values indicate easier readability
    let score = (avgWordsPerSentence * 0.1) + (avgWordLength * 0.3);
    
    // Convert to 0-1 scale
    score = 1 - Math.min(1, Math.max(0, score / 10));
    
    return {
      score,
      level: score > 0.7 ? 'EASY' : score > 0.4 ? 'MEDIUM' : 'DIFFICULT'
    };
  }
}

module.exports = new AIService();
