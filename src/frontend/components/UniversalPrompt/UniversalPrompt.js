import React from 'react';
import { motion } from 'framer-motion';

const UniversalPrompt = () => {
  const [prompt, setPrompt] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // Simulácia AI návrhov
  const handlePromptChange = (e) => {
    const value = e.target.value;
    setPrompt(value);
    
    if (value.length > 2) {
      setIsLoading(true);
      // Simulácia oneskorenia API volania
      setTimeout(() => {
        const demoSuggestions = [
          'Vytvoriť nový dokument',
          'Vyhľadať v mojich súboroch',
          'Analyzovať dáta z posledného reportu',
          'Naplánovať stretnutie s tímom'
        ];
        setSuggestions(demoSuggestions.filter(s => 
          s.toLowerCase().includes(value.toLowerCase())
        ));
        setIsLoading(false);
      }, 500);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && prompt.trim()) {
      // Simulácia spracovania promptu
      console.log('Spracovanie promptu:', prompt);
      setPrompt('');
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative rounded-lg shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-12 py-3 sm:text-sm border-gray-300 rounded-lg"
          placeholder="Čo by ste chceli urobiť? Skúste 'Vytvoriť nový dokument' alebo 'Vyhľadať...'"
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <span className="text-gray-400 text-xs">⌘K</span>
          )}
        </div>
      </div>
      
      {suggestions.length > 0 && (
        <motion.div 
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60 focus:outline-none sm:text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-primary-50 transition-colors duration-150"
              onClick={() => {
                setPrompt(suggestion);
                setSuggestions([]);
              }}
            >
              <span className="block truncate">{suggestion}</span>
            </div>
          ))}
        </motion.div>
      )}
      
      <div className="mt-2 flex items-center text-xs text-gray-500">
        <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span>Použite prirodzený jazyk pre zadanie úlohy alebo otázky</span>
      </div>
    </div>
  );
};

export default UniversalPrompt;
