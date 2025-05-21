import React, { useState, useEffect } from 'react';
import { ContentGenerator } from '../utils/aiUtils';

// Custom hook for using the Content Generator
export const useContentGenerator = () => {
  const [contentGenerator] = useState(() => new ContentGenerator());
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the generator
  useEffect(() => {
    if (!contentGenerator.initialized) {
      try {
        contentGenerator.initialize();
      } catch (err) {
        console.error('Failed to initialize Content Generator:', err);
        setError('Failed to initialize Content Generator');
      }
    }
  }, [contentGenerator]);

  // Function to generate content
  const generateContent = async (prompt, options = {}) => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = contentGenerator.generateContent(prompt, options);
      setGeneratedContent(result);
      return result;
    } catch (err) {
      console.error('Error generating content:', err);
      setError('Failed to generate content');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to improve content
  const improveContent = async (content, suggestions) => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = contentGenerator.improveContent(content, suggestions);
      setGeneratedContent({ content: result });
      return result;
    } catch (err) {
      console.error('Error improving content:', err);
      setError('Failed to improve content');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatedContent,
    isGenerating,
    error,
    generateContent,
    improveContent
  };
};

// Content Generator Component
const ContentGeneratorComponent = ({ 
  prompt = '', 
  contentType = 'document',
  initialContent = '',
  suggestions = [],
  onContentGenerated,
  onContentImproved
}) => {
  const { 
    generatedContent, 
    isGenerating, 
    error, 
    generateContent, 
    improveContent 
  } = useContentGenerator();
  
  const [mode, setMode] = useState('generate'); // 'generate' or 'improve'
  const [localPrompt, setLocalPrompt] = useState(prompt);
  const [localContent, setLocalContent] = useState(initialContent);
  const [selectedType, setSelectedType] = useState(contentType);

  // Update local state when props change
  useEffect(() => {
    setLocalPrompt(prompt);
  }, [prompt]);

  useEffect(() => {
    setLocalContent(initialContent);
  }, [initialContent]);

  useEffect(() => {
    setSelectedType(contentType);
  }, [contentType]);

  // Handle content generation
  const handleGenerate = async () => {
    if (!localPrompt) {
      return;
    }

    const options = {
      type: selectedType
    };

    const result = await generateContent(localPrompt, options);
    
    if (result && onContentGenerated) {
      onContentGenerated(result);
    }
  };

  // Handle content improvement
  const handleImprove = async () => {
    if (!localContent) {
      return;
    }

    const result = await improveContent(localContent, suggestions);
    
    if (result && onContentImproved) {
      onContentImproved(result);
    }
  };

  return (
    <div className="content-generator">
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      
      <div className="mb-4">
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${mode === 'generate' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setMode('generate')}
          >
            Generovať obsah
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${mode === 'improve' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setMode('improve')}
          >
            Vylepšiť obsah
          </button>
        </div>
        
        {mode === 'generate' ? (
          <>
            <div className="mb-4">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                Prompt pre generovanie obsahu
              </label>
              <input
                type="text"
                id="prompt"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={localPrompt}
                onChange={(e) => setLocalPrompt(e.target.value)}
                placeholder="Zadajte prompt pre generovanie obsahu..."
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 mb-1">
                Typ obsahu
              </label>
              <select
                id="contentType"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="document">Dokument</option>
                <option value="email">Email</option>
                <option value="summary">Zhrnutie</option>
              </select>
            </div>
            
            <button
              type="button"
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              onClick={handleGenerate}
              disabled={isGenerating || !localPrompt}
            >
              {isGenerating ? 'Generujem...' : 'Generovať obsah'}
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Obsah na vylepšenie
              </label>
              <textarea
                id="content"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
                placeholder="Zadajte obsah na vylepšenie..."
                rows={5}
              />
            </div>
            
            {suggestions.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Dostupné návrhy na vylepšenie:</h3>
                <ul className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <li key={`suggestion-${index}`} className="text-sm text-gray-600">
                      {suggestion.type}: {suggestion.suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <button
              type="button"
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              onClick={handleImprove}
              disabled={isGenerating || !localContent || suggestions.length === 0}
            >
              {isGenerating ? 'Vylepšujem...' : 'Vylepšiť obsah'}
            </button>
          </>
        )}
      </div>
      
      {generatedContent && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {mode === 'generate' ? 'Vygenerovaný obsah' : 'Vylepšený obsah'}
          </h3>
          
          {mode === 'generate' && generatedContent.title && (
            <h4 className="text-md font-medium text-gray-800 mb-2">{generatedContent.title}</h4>
          )}
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <pre className="whitespace-pre-wrap text-sm text-gray-700">
              {mode === 'generate' ? generatedContent.content : generatedContent.content || generatedContent}
            </pre>
          </div>
          
          {mode === 'generate' && generatedContent.metadata && (
            <div className="mt-2 text-xs text-gray-500">
              {generatedContent.metadata.wordCount && (
                <span className="mr-3">Počet slov: {generatedContent.metadata.wordCount}</span>
              )}
              {generatedContent.metadata.readingTime && (
                <span className="mr-3">Čas čítania: {generatedContent.metadata.readingTime} min</span>
              )}
              {generatedContent.metadata.generatedAt && (
                <span>Vygenerované: {new Date(generatedContent.metadata.generatedAt).toLocaleString()}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentGeneratorComponent;
