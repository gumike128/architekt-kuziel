import React, { useState, useEffect } from 'react';
import { PredictiveEngine } from '../utils/aiUtils';

// Custom hook for using the Predictive Engine
export const usePredictiveEngine = (user = null, recentInteractions = []) => {
  const [predictiveEngine] = useState(() => new PredictiveEngine());
  const [predictions, setPredictions] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the engine
  useEffect(() => {
    if (!predictiveEngine.initialized) {
      try {
        predictiveEngine.initialize();
      } catch (err) {
        console.error('Failed to initialize Predictive Engine:', err);
        setError('Failed to initialize Predictive Engine');
      }
    }
  }, [predictiveEngine]);

  // Predict next actions when user or interactions change
  useEffect(() => {
    if (user && recentInteractions.length > 0 && predictiveEngine.initialized) {
      predictNextActions();
    }
  }, [user, recentInteractions, predictiveEngine.initialized]);

  // Function to predict next actions
  const predictNextActions = async () => {
    setIsPredicting(true);
    setError(null);

    try {
      const result = predictiveEngine.predictNextActions(user, recentInteractions);
      setPredictions(result);
      return result;
    } catch (err) {
      console.error('Error predicting next actions:', err);
      setError('Failed to predict next actions');
      return null;
    } finally {
      setIsPredicting(false);
    }
  };

  return {
    predictions,
    isPredicting,
    error,
    predictNextActions
  };
};

// Predictive Engine Component
const PredictiveEngineComponent = ({ 
  user, 
  recentInteractions = [], 
  onPredictionsGenerated,
  showVisualOutput = true
}) => {
  const { 
    predictions, 
    isPredicting, 
    error, 
    predictNextActions 
  } = usePredictiveEngine(user, recentInteractions);

  // Call the callback when predictions are generated
  useEffect(() => {
    if (predictions && !isPredicting && onPredictionsGenerated) {
      onPredictionsGenerated(predictions);
    }
  }, [predictions, isPredicting, onPredictionsGenerated]);

  // Trigger predictions when component mounts or when inputs change significantly
  useEffect(() => {
    if (user && recentInteractions.length > 0) {
      predictNextActions();
    }
  }, [user?.id, recentInteractions.length]);

  // If visual output is not needed, return null
  if (!showVisualOutput) {
    return null;
  }

  return (
    <div className="predictive-engine">
      {error && (
        <div className="text-red-500 mb-2">{error}</div>
      )}
      
      {isPredicting ? (
        <div className="text-gray-500">Generujem predikcie...</div>
      ) : predictions && (
        <div>
          {/* Likely Tasks */}
          {predictions.likelyTasks.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Navrhované úlohy:</h3>
              <ul className="space-y-2">
                {predictions.likelyTasks.map((task, index) => (
                  <li key={`task-${index}`} className="flex items-center">
                    <button
                      className="text-left px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 w-full"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{task.description}</span>
                        <span className="text-xs text-gray-500">{Math.round(task.confidence * 100)}%</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Content Recommendations */}
          {predictions.contentRecommendations.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Odporúčaný obsah:</h3>
              <ul className="space-y-2">
                {predictions.contentRecommendations.map((content, index) => (
                  <li key={`content-${index}`} className="flex items-center">
                    <a
                      href={`/content/${content.id}`}
                      className="text-left px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 w-full"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{content.title}</span>
                        <span className="text-xs text-gray-500">{Math.round(content.relevance * 100)}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{content.reason}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Interface Suggestions */}
          {predictions.interfaceSuggestions.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Návrhy rozhrania:</h3>
              <ul className="space-y-2">
                {predictions.interfaceSuggestions.map((suggestion, index) => (
                  <li key={`suggestion-${index}`} className="flex items-center">
                    <button
                      className="text-left px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 w-full"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{suggestion.description}</span>
                        <span className="text-xs text-gray-500">{Math.round(suggestion.confidence * 100)}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{suggestion.type}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {predictions.likelyTasks.length === 0 && 
           predictions.contentRecommendations.length === 0 && 
           predictions.interfaceSuggestions.length === 0 && (
            <div className="text-sm text-gray-500">Žiadne predikcie nie sú dostupné.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictiveEngineComponent;
