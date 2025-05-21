import React, { useState, useEffect } from 'react';
import { ContextAnalyzer } from '../utils/aiUtils';

// Custom hook for using the Context Analyzer
export const useContextAnalyzer = (userData = null, interactions = []) => {
  const [contextAnalyzer] = useState(() => new ContextAnalyzer());
  const [contextData, setContextData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the analyzer
  useEffect(() => {
    if (!contextAnalyzer.initialized) {
      try {
        contextAnalyzer.initialize();
      } catch (err) {
        console.error('Failed to initialize Context Analyzer:', err);
        setError('Failed to initialize Context Analyzer');
      }
    }
  }, [contextAnalyzer]);

  // Analyze user context when userData or interactions change
  useEffect(() => {
    if (userData && interactions.length > 0 && contextAnalyzer.initialized) {
      analyzeContext();
    }
  }, [userData, interactions, contextAnalyzer.initialized]);

  // Function to analyze context
  const analyzeContext = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = contextAnalyzer.analyzeUserContext(userData, interactions);
      setContextData(result);
    } catch (err) {
      console.error('Error analyzing user context:', err);
      setError('Failed to analyze user context');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    contextData,
    isAnalyzing,
    error,
    analyzeContext
  };
};

// Context Analyzer Component
const ContextAnalyzerComponent = ({ userData, interactions, onAnalysisComplete }) => {
  const { contextData, isAnalyzing, error, analyzeContext } = useContextAnalyzer(userData, interactions);

  // Call the callback when analysis is complete
  useEffect(() => {
    if (contextData && !isAnalyzing) {
      onAnalysisComplete(contextData);
    }
  }, [contextData, isAnalyzing, onAnalysisComplete]);

  // Trigger analysis when component mounts or when inputs change significantly
  useEffect(() => {
    analyzeContext();
  }, [userData?.id, interactions.length]);

  return (
    <div className="hidden">
      {/* This is a non-visual component that performs analysis in the background */}
      {error && <div className="text-red-500">{error}</div>}
      {isAnalyzing && <div>Analyzing user context...</div>}
    </div>
  );
};

export default ContextAnalyzerComponent;
