import React, { useState, useEffect } from 'react';
import { PatternRecognizer } from '../utils/aiUtils';

// Custom hook for using the Pattern Recognizer
export const usePatternRecognizer = (interactions = []) => {
  const [patternRecognizer] = useState(() => new PatternRecognizer());
  const [patternData, setPatternData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the recognizer
  useEffect(() => {
    if (!patternRecognizer.initialized) {
      try {
        patternRecognizer.initialize();
      } catch (err) {
        console.error('Failed to initialize Pattern Recognizer:', err);
        setError('Failed to initialize Pattern Recognizer');
      }
    }
  }, [patternRecognizer]);

  // Analyze interactions when they change
  useEffect(() => {
    if (interactions.length > 0 && patternRecognizer.initialized) {
      analyzePatterns();
    }
  }, [interactions, patternRecognizer.initialized]);

  // Function to analyze patterns
  const analyzePatterns = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = patternRecognizer.analyzeInteractions(interactions);
      setPatternData(result);
    } catch (err) {
      console.error('Error analyzing patterns:', err);
      setError('Failed to analyze patterns');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    patternData,
    isAnalyzing,
    error,
    analyzePatterns
  };
};

// Pattern Recognizer Component
const PatternRecognizerComponent = ({ interactions, onPatternsDetected }) => {
  const { patternData, isAnalyzing, error, analyzePatterns } = usePatternRecognizer(interactions);

  // Call the callback when analysis is complete
  useEffect(() => {
    if (patternData && !isAnalyzing) {
      onPatternsDetected(patternData);
    }
  }, [patternData, isAnalyzing, onPatternsDetected]);

  // Trigger analysis when component mounts or when interactions change significantly
  useEffect(() => {
    if (interactions.length > 0) {
      analyzePatterns();
    }
  }, [interactions.length]);

  // Visual representation of detected patterns
  return (
    <div className="pattern-recognizer">
      {error && (
        <div className="text-red-500 mb-2">{error}</div>
      )}
      
      {isAnalyzing ? (
        <div className="text-gray-500">Analyzujem vzory...</div>
      ) : patternData && (
        <div>
          {patternData.sequences.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Rozpoznané sekvencie:</h3>
              <ul className="space-y-1">
                {patternData.sequences.map((sequence, index) => (
                  <li key={`sequence-${index}`} className="text-sm text-gray-600">
                    <span className="font-medium">{sequence.name}</span>: {sequence.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {patternData.routines.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Rozpoznané rutiny:</h3>
              <ul className="space-y-1">
                {patternData.routines.map((routine, index) => (
                  <li key={`routine-${index}`} className="text-sm text-gray-600">
                    <span className="font-medium">{routine.name}</span>: {routine.description} ({routine.timeFrame})
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {patternData.anomalies.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Detekované anomálie:</h3>
              <ul className="space-y-1">
                {patternData.anomalies.map((anomaly, index) => (
                  <li key={`anomaly-${index}`} className="text-sm text-gray-600">
                    <span className="font-medium">{anomaly.type}</span>: {anomaly.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {patternData.sequences.length === 0 && patternData.routines.length === 0 && patternData.anomalies.length === 0 && (
            <div className="text-sm text-gray-500">Žiadne vzory neboli rozpoznané.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatternRecognizerComponent;
