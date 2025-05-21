import { createContext, useContext, useState, useEffect } from 'react';
import { aiService } from '../services/api';
import { useAuth } from './AuthContext';

// Create AI context
const AIContext = createContext();

// AI provider component
export const AIProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [promptSuggestions, setPromptSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial AI data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadInitialAIData();
    }
  }, [isAuthenticated, user]);

  // Load initial AI data
  const loadInitialAIData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get recommendations
      const recommendationsData = await aiService.getRecommendations();
      setRecommendations(recommendationsData);
      
      // Predict user needs
      const predictionsData = await aiService.predictUserNeeds();
      setPredictions(predictionsData);
      
      // Get initial prompt suggestions
      const suggestionsData = await aiService.getPromptSuggestions('');
      setPromptSuggestions(suggestionsData);
    } catch (err) {
      console.error('Load AI data error:', err);
      setError('Failed to load AI data');
    } finally {
      setLoading(false);
    }
  };

  // Analyze content
  const analyzeContent = async (contentId, text) => {
    setLoading(true);
    setError(null);
    
    try {
      const analysis = await aiService.analyzeContent(contentId, text);
      return analysis;
    } catch (err) {
      console.error('Analyze content error:', err);
      setError('Failed to analyze content');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get prompt suggestions
  const getPromptSuggestions = async (input) => {
    setLoading(true);
    setError(null);
    
    try {
      const suggestions = await aiService.getPromptSuggestions(input);
      setPromptSuggestions(suggestions);
      return suggestions;
    } catch (err) {
      console.error('Get prompt suggestions error:', err);
      setError('Failed to get prompt suggestions');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Generate content suggestions
  const generateContentSuggestions = async (contentId) => {
    setLoading(true);
    setError(null);
    
    try {
      const suggestions = await aiService.generateContentSuggestions(contentId);
      return suggestions;
    } catch (err) {
      console.error('Generate content suggestions error:', err);
      setError('Failed to generate content suggestions');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Apply content suggestion
  const applyContentSuggestion = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedContent = await aiService.applyContentSuggestion(id);
      return updatedContent;
    } catch (err) {
      console.error('Apply content suggestion error:', err);
      setError('Failed to apply content suggestion');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh AI data
  const refreshAIData = async () => {
    await loadInitialAIData();
  };

  // Context value
  const value = {
    recommendations,
    predictions,
    promptSuggestions,
    loading,
    error,
    analyzeContent,
    getPromptSuggestions,
    generateContentSuggestions,
    applyContentSuggestion,
    refreshAIData
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

// Custom hook to use AI context
export const useAI = () => {
  const context = useContext(AIContext);
  
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  
  return context;
};
