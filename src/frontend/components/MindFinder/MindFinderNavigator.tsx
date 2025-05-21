import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Tag {
  id: string;
  name: string;
  type: string;
}

interface Content {
  id: string;
  title: string;
  excerpt: string;
  tags: Tag[];
  lastModified: string;
}

interface MindFinderNavigatorProps {
  initialContents?: Content[];
  initialTags?: Tag[];
  onContentSelect?: (contentId: string) => void;
  className?: string;
}

const MindFinderNavigator: React.FC<MindFinderNavigatorProps> = ({
  initialContents = [],
  initialTags = [],
  onContentSelect,
  className = '',
}) => {
  const [contents, setContents] = useState<Content[]>(initialContents);
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Filter contents based on selected tags and search query
  const filteredContents = contents.filter(content => {
    // Filter by tags
    const tagMatch = selectedTags.length === 0 || 
      content.tags.some(tag => selectedTags.includes(tag.id));
    
    // Filter by search query
    const searchMatch = searchQuery === '' || 
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return tagMatch && searchMatch;
  });

  // Toggle tag selection
  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-soft p-4 sticky top-4">
            <h3 className="font-medium text-gray-800 mb-4">Filtre</h3>
            
            {/* Search input */}
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Vyhľadávanie
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hľadať..."
                className="input"
              />
            </div>
            
            {/* Tags filter */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Kategórie a tagy</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {tags.map(tag => (
                  <div key={tag.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`tag-${tag.id}`}
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => toggleTag(tag.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`tag-${tag.id}`} className="ml-2 text-sm text-gray-700">
                      {tag.name}
                    </label>
                  </div>
                ))}
                
                {tags.length === 0 && (
                  <p className="text-sm text-gray-500">Žiadne tagy nie sú dostupné</p>
                )}
              </div>
            </div>
            
            {/* Clear filters button */}
            <button
              onClick={clearFilters}
              className="w-full btn-outline text-sm"
              disabled={selectedTags.length === 0 && searchQuery === ''}
            >
              Vyčistiť filtre
            </button>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-grow">
          {/* Header with view controls */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {searchQuery || selectedTags.length > 0 
                ? `Výsledky (${filteredContents.length})` 
                : 'Všetok obsah'}
            </h2>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
                aria-label="Zobraziť ako zoznam"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
                aria-label="Zobraziť ako mriežku"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Content list */}
          {filteredContents.length > 0 ? (
            <motion.div layout className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
              {filteredContents.map(content => (
                <motion.div
                  key={content.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-lg shadow-soft overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onContentSelect && onContentSelect(content.id)}
                >
                  <div className="p-4">
                    <h3 className="font-medium text-lg text-gray-800 mb-2">{content.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{content.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {content.tags.map(tag => (
                        <span
                          key={tag.id}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Upravené: {content.lastModified}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-white rounded-lg shadow-soft p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Žiadny obsah nebol nájdený
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchQuery || selectedTags.length > 0 
                  ? 'Skúste upraviť filtre alebo vyhľadávací dopyt pre zobrazenie výsledkov.'
                  : 'Začnite vytvorením nového obsahu alebo importovaním existujúcich súborov.'}
              </p>
              <button className="btn-primary">
                {searchQuery || selectedTags.length > 0 
                  ? 'Vyčistiť filtre'
                  : 'Vytvoriť nový obsah'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MindFinderNavigator;
