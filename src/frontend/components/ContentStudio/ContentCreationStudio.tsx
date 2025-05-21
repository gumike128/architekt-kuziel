import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContentEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
  onCancel?: () => void;
  className?: string;
}

const ContentCreationStudio: React.FC<ContentEditorProps> = ({
  initialContent = '',
  onSave,
  onCancel,
  className = '',
}) => {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Simulate AI suggestions based on content
  const generateSuggestions = () => {
    // In a real implementation, this would call an AI service
    const dummySuggestions = [
      'Pridajte sekciu o výhodách tohto prístupu',
      'Rozšírte úvod o konkrétne príklady',
      'Zvážte pridanie vizuálnych prvkov pre lepšie pochopenie',
    ];
    setSuggestions(dummySuggestions);
    setShowSuggestions(true);
  };

  // Apply a suggestion to the content
  const applySuggestion = (suggestion: string) => {
    // In a real implementation, this would intelligently apply the suggestion
    setContent(content + '\n\n' + suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className={`bg-white rounded-lg shadow-soft overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Zadajte názov..."
            className="input flex-grow"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => onSave && onSave(content)}
              className="btn-primary"
            >
              Uložiť
            </button>
            <button
              onClick={onCancel}
              className="btn-outline"
            >
              Zrušiť
            </button>
          </div>
        </div>
      </div>

      {/* Editor area */}
      <div className="flex flex-col md:flex-row h-[600px]">
        {/* Main editor */}
        <div className="flex-grow p-4 h-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Začnite písať obsah..."
            className="w-full h-full p-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 resize-none"
          />
        </div>

        {/* Suggestions panel */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-medium text-gray-800">Inteligentný asistent</h3>
          </div>
          
          <div className="p-4 flex-grow overflow-y-auto">
            {!showSuggestions ? (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Inteligentné návrhy
                </h3>
                <p className="text-gray-500 mb-6 max-w-xs mx-auto">
                  Získajte návrhy na vylepšenie vášho obsahu od nášho inteligentného asistenta.
                </p>
                <button
                  onClick={generateSuggestions}
                  className="btn-primary"
                  disabled={content.length < 10}
                >
                  Generovať návrhy
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Na základe vášho obsahu odporúčame nasledujúce vylepšenia:
                </p>
                
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-primary-50 border border-primary-100 rounded-lg"
                  >
                    <p className="text-sm text-gray-800 mb-2">{suggestion}</p>
                    <button
                      onClick={() => applySuggestion(suggestion)}
                      className="text-xs text-primary-700 font-medium hover:text-primary-800"
                    >
                      Aplikovať návrh
                    </button>
                  </motion.div>
                ))}
                
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Skryť návrhy
                </button>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={generateSuggestions}
              className="w-full btn-outline text-sm"
              disabled={content.length < 10}
            >
              Obnoviť návrhy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCreationStudio;
