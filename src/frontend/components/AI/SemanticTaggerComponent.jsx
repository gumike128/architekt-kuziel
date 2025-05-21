import React, { useState, useEffect } from 'react';
import { SemanticTagger } from '../utils/aiUtils';

// Custom hook for using the Semantic Tagger
export const useSemanticTagger = (content = '') => {
  const [semanticTagger] = useState(() => new SemanticTagger());
  const [tagData, setTagData] = useState(null);
  const [isTagging, setIsTagging] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the tagger
  useEffect(() => {
    if (!semanticTagger.initialized) {
      try {
        semanticTagger.initialize();
      } catch (err) {
        console.error('Failed to initialize Semantic Tagger:', err);
        setError('Failed to initialize Semantic Tagger');
      }
    }
  }, [semanticTagger]);

  // Generate tags when content changes
  useEffect(() => {
    if (content && content.length > 10 && semanticTagger.initialized) {
      generateTags();
    }
  }, [content, semanticTagger.initialized]);

  // Function to generate tags
  const generateTags = async () => {
    setIsTagging(true);
    setError(null);

    try {
      const result = semanticTagger.generateTags(content);
      setTagData(result);
    } catch (err) {
      console.error('Error generating tags:', err);
      setError('Failed to generate tags');
    } finally {
      setIsTagging(false);
    }
  };

  return {
    tagData,
    isTagging,
    error,
    generateTags
  };
};

// Semantic Tagger Component
const SemanticTaggerComponent = ({ content, onTagsGenerated }) => {
  const { tagData, isTagging, error, generateTags } = useSemanticTagger(content);

  // Call the callback when tagging is complete
  useEffect(() => {
    if (tagData && !isTagging) {
      onTagsGenerated(tagData);
    }
  }, [tagData, isTagging, onTagsGenerated]);

  // Trigger tagging when component mounts or when content changes significantly
  useEffect(() => {
    if (content && content.length > 10) {
      generateTags();
    }
  }, [content]);

  // Visual representation of generated tags
  return (
    <div className="semantic-tagger">
      {error && (
        <div className="text-red-500 mb-2">{error}</div>
      )}
      
      {isTagging ? (
        <div className="text-gray-500">Generujem tagy...</div>
      ) : tagData && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Navrhované tagy:</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tagData.keywords.map((keyword, index) => (
              <span 
                key={`keyword-${index}`}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {keyword.word}
              </span>
            ))}
          </div>
          
          {tagData.categories.length > 0 && (
            <>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Navrhované kategórie:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {tagData.categories.map((category, index) => (
                  <span 
                    key={`category-${index}`}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </>
          )}
          
          {tagData.entities.length > 0 && (
            <>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Rozpoznané entity:</h3>
              <div className="flex flex-wrap gap-2">
                {tagData.entities.map((entity, index) => (
                  <span 
                    key={`entity-${index}`}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {entity.type}: {entity.value}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SemanticTaggerComponent;
