import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../contexts/ContentContext';
import { useAI } from '../../contexts/AIContext';

// Enhanced MindFinder Navigator component with animations and improved UI
const EnhancedMindFinderNavigator = () => {
  const { contents, tags, filterContents } = useContent();
  const { analyzeContent } = useAI();
  
  const [filteredContents, setFilteredContents] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list', 'grid', or 'map'
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [contentAnalysis, setContentAnalysis] = useState(null);

  // Filter contents when dependencies change
  useEffect(() => {
    const fetchFilteredContents = async () => {
      setIsLoading(true);
      
      try {
        const filters = {
          tagIds: selectedTags.length > 0 ? selectedTags : undefined,
          search: searchQuery || undefined
        };
        
        const filtered = await filterContents(filters);
        setFilteredContents(filtered);
      } catch (error) {
        console.error('Error filtering contents:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFilteredContents();
  }, [filterContents, selectedTags, searchQuery]);

  // Handle tag selection
  const handleTagSelect = (tagId) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle content selection
  const handleContentSelect = async (content) => {
    setSelectedContent(content);
    
    // Analyze content
    try {
      const analysis = await analyzeContent(content.id, content.body);
      setContentAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing content:', error);
      setContentAnalysis(null);
    }
  };

  // Get tag color based on type
  const getTagColor = (type) => {
    switch (type) {
      case 'CATEGORY':
        return 'bg-blue-100 text-blue-800';
      case 'TOPIC':
        return 'bg-green-100 text-green-800';
      case 'KEYWORD':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">MindFinder Navigator</h2>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Hľadať obsah..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full"
            />
          </div>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-md ${viewMode === 'map' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Tags filter */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filtrovať podľa tagov</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <motion.button
              key={tag.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTagSelect(tag.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedTags.includes(tag.id)
                  ? 'bg-primary-100 text-primary-800 border border-primary-300'
                  : `${getTagColor(tag.type)} border border-transparent`
              }`}
            >
              {tag.name}
            </motion.button>
          ))}
          
          {tags.length === 0 && (
            <p className="text-sm text-gray-500">Žiadne tagy nie sú k dispozícii</p>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Content list */}
        <div className={`${selectedContent ? 'md:w-1/2' : 'w-full'}`}>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <svg className="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <>
              {filteredContents.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Žiadny obsah nenájdený</h3>
                  <p className="text-gray-500">Skúste zmeniť filtre alebo vyhľadávací dopyt</p>
                </div>
              ) : (
                <AnimatePresence>
                  {viewMode === 'list' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      {filteredContents.map(content => (
                        <motion.div
                          key={content.id}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => handleContentSelect(content)}
                          className={`bg-white rounded-lg border ${
                            selectedContent?.id === content.id
                              ? 'border-primary-500 ring-2 ring-primary-200'
                              : 'border-gray-200 hover:border-gray-300'
                          } p-4 cursor-pointer transition-all`}
                        >
                          <h3 className="text-lg font-medium text-gray-800 mb-1">{content.title}</h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {new Date(content.updatedAt).toLocaleDateString()} • {content.author.name}
                          </p>
                          <p className="text-gray-600 line-clamp-2 mb-3">
                            {content.body.substring(0, 150)}...
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {content.tags.map(tag => (
                              <span
                                key={tag.id}
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag.type)}`}
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  
                  {viewMode === 'grid' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {filteredContents.map(content => (
                        <motion.div
                          key={content.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => handleContentSelect(content)}
                          className={`bg-white rounded-lg border ${
                            selectedContent?.id === content.id
                              ? 'border-primary-500 ring-2 ring-primary-200'
                              : 'border-gray-200 hover:border-gray-300'
                          } p-4 cursor-pointer transition-all h-48 flex flex-col`}
                        >
                          <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-1">{content.title}</h3>
                          <p className="text-xs text-gray-500 mb-2">
                            {new Date(content.updatedAt).toLocaleDateString()} • {content.author.name}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-3 mb-2 flex-grow">
                            {content.body.substring(0, 100)}...
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {content.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag.id}
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag.type)}`}
                              >
                                {tag.name}
                              </span>
                            ))}
                            {content.tags.length > 3 && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                +{content.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  
                  {viewMode === 'map' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white rounded-lg border border-gray-200 p-4 h-96"
                    >
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          <h3 className="text-lg font-medium text-gray-700 mb-2">Mapové zobrazenie</h3>
                          <p className="text-gray-500">Vizualizácia vzťahov medzi obsahom</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </>
          )}
        </div>
        
        {/* Content detail */}
        <AnimatePresence>
          {selectedContent && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="md:w-1/2 bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedContent.title}</h3>
                <button
                  onClick={() => setSelectedContent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {selectedContent.author.name}
                </span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
(Content truncated due to size limit. Use line ranges to read in chunks)