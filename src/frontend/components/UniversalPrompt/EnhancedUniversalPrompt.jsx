import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '../../contexts/AIContext';

// Enhanced Universal Prompt component with animations and improved UI
const EnhancedUniversalPrompt = ({ onSubmit, placeholder = "Čo by ste chceli urobiť?", className = "" }) => {
  const { promptSuggestions, getPromptSuggestions } = useAI();
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Get suggestions when input changes
  useEffect(() => {
    if (input.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        getPromptSuggestions(input);
        setShowSuggestions(true);
      }, 300);
      
      return () => clearTimeout(delayDebounceFn);
    } else {
      setShowSuggestions(false);
    }
  }, [input, getPromptSuggestions]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(input);
      
      // Add to history
      setHistory(prev => [input, ...prev.slice(0, 9)]);
      setHistoryIndex(-1);
      
      // Clear input
      setInput('');
      setShowSuggestions(false);
    } catch (error) {
      console.error('Error submitting prompt:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    // Handle history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
    
    // Handle suggestion navigation
    if (e.key === 'Tab' && showSuggestions && promptSuggestions.length > 0) {
      e.preventDefault();
      setInput(promptSuggestions[0]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ 
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused 
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center">
            <div className="pl-4 pr-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-primary-500" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                // Delay hiding suggestions to allow for clicks
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 py-4 px-2 text-gray-700 focus:outline-none"
              autoComplete="off"
            />
            
            <motion.button
              type="submit"
              disabled={!input.trim() || isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="m-2 px-4 py-2 bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span>Spustiť</span>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
      
      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && promptSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <ul className="py-1">
              {promptSuggestions.map((suggestion, index) => (
                <motion.li
                  key={`suggestion-${index}`}
                  whileHover={{ backgroundColor: '#F3F4F6' }}
                >
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {suggestion}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-100">
              <span>Stlačte Tab pre výber prvého návrhu</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Keyboard shortcuts help */}
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={() => alert('Klávesové skratky:\n\n↑ - Predchádzajúci príkaz\n↓ - Nasledujúci príkaz\nTab - Vybrať prvý návrh')}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Klávesové skratky
        </button>
      </div>
    </div>
  );
};

export default EnhancedUniversalPrompt;
