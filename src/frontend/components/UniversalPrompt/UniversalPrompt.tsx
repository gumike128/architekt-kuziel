import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UniversalPromptProps {
  onSubmit: (input: string) => void;
  suggestions?: string[];
  placeholder?: string;
  className?: string;
}

const UniversalPrompt: React.FC<UniversalPromptProps> = ({
  onSubmit,
  suggestions = [],
  placeholder = 'Čo by ste chceli dnes urobiť?',
  className = '',
}) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+Space shortcut to focus the prompt
      if (e.altKey && e.code === 'Space') {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="relative">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isFocused ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg shadow-soft overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="w-full px-6 py-4 text-lg focus:outline-none"
              aria-label="Univerzálny prompt"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
              aria-label="Odoslať"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </motion.div>

        <AnimatePresence>
          {isFocused && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-soft z-10"
            >
              <ul className="py-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-6 py-2 hover:bg-gray-50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="text-xs text-gray-500 mt-2 text-center">
        Stlačte <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded">Alt</kbd> + <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded">Space</kbd> pre rýchly prístup
      </div>
    </div>
  );
};

export default UniversalPrompt;
