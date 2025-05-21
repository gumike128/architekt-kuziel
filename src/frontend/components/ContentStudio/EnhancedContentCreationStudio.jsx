import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '../../contexts/AIContext';
import { useContent } from '../../contexts/ContentContext';

// Enhanced Content Creation Studio component with animations and improved UI
const EnhancedContentCreationStudio = () => {
  const { generateContentSuggestions, applyContentSuggestion } = useAI();
  const { createContent, updateContent } = useContent();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [format, setFormat] = useState('DOCUMENT');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [mode, setMode] = useState('create'); // 'create' or 'edit'
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [saveMessage, setSaveMessage] = useState(null);

  // Calculate word and character count
  useEffect(() => {
    setCharCount(content.length);
    setWordCount(content.trim() === '' ? 0 : content.trim().split(/\s+/).length);
  }, [content]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (title.trim() === '' && content.trim() === '') return;
    
    const autoSaveInterval = setInterval(() => {
      handleAutoSave();
    }, 30000);
    
    return () => clearInterval(autoSaveInterval);
  }, [title, content, tags, format, contentId, mode]);

  // Handle auto-save
  const handleAutoSave = async () => {
    if (title.trim() === '') return;
    
    try {
      const contentData = {
        title,
        body: content,
        format,
        tagIds: tags.map(tag => tag.id),
        status: 'DRAFT'
      };
      
      if (mode === 'create') {
        const newContent = await createContent(contentData);
        setContentId(newContent.id);
        setMode('edit');
      } else if (mode === 'edit' && contentId) {
        await updateContent(contentId, contentData);
      }
      
      setSaveMessage('Automaticky uložené');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('Auto-save error:', error);
    }
  };

  // Handle manual save
  const handleSave = async (status = 'DRAFT') => {
    if (title.trim() === '') {
      alert('Prosím, zadajte názov dokumentu');
      return;
    }
    
    setIsSaving(true);
    
    try {
      const contentData = {
        title,
        body: content,
        format,
        tagIds: tags.map(tag => tag.id),
        status
      };
      
      if (mode === 'create') {
        const newContent = await createContent(contentData);
        setContentId(newContent.id);
        setMode('edit');
      } else if (mode === 'edit' && contentId) {
        await updateContent(contentId, contentData);
      }
      
      setSaveMessage(status === 'PUBLISHED' ? 'Dokument publikovaný' : 'Dokument uložený');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('Save error:', error);
      alert('Chyba pri ukladaní dokumentu');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle tag addition
  const handleAddTag = () => {
    if (newTag.trim() === '') return;
    
    // Check if tag already exists
    if (tags.some(tag => tag.name.toLowerCase() === newTag.toLowerCase())) {
      setNewTag('');
      return;
    }
    
    setTags([...tags, { id: `temp-${Date.now()}`, name: newTag, type: 'KEYWORD' }]);
    setNewTag('');
  };

  // Handle tag removal
  const handleRemoveTag = (tagId) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  // Generate content suggestions
  const handleGenerateSuggestions = async () => {
    if (!contentId) {
      // Save first to get content ID
      await handleSave();
      if (!contentId) return;
    }
    
    setIsGeneratingSuggestions(true);
    
    try {
      const generatedSuggestions = await generateContentSuggestions(contentId);
      setSuggestions(generatedSuggestions);
    } catch (error) {
      console.error('Generate suggestions error:', error);
      alert('Chyba pri generovaní návrhov');
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  // Apply content suggestion
  const handleApplySuggestion = async (suggestionId) => {
    try {
      const updatedContent = await applyContentSuggestion(suggestionId);
      
      if (updatedContent) {
        setTitle(updatedContent.title);
        setContent(updatedContent.body);
        
        // Remove applied suggestion
        setSuggestions(suggestions.filter(suggestion => suggestion.id !== suggestionId));
      }
    } catch (error) {
      console.error('Apply suggestion error:', error);
      alert('Chyba pri aplikovaní návrhu');
    }
  };

  // Clear form
  const handleClear = () => {
    if (content.trim() !== '' || title.trim() !== '') {
      if (!confirm('Naozaj chcete vymazať všetok obsah? Neuložené zmeny budú stratené.')) {
        return;
      }
    }
    
    setTitle('');
    setContent('');
    setTags([]);
    setFormat('DOCUMENT');
    setContentId(null);
    setMode('create');
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Main editor */}
      <div className={`${showAIPanel ? 'md:w-2/3' : 'w-full'}`}>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Content Creation Studio</h2>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAIPanel(!showAIPanel)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  {showAIPanel ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
            
            {/* Document title */}
            <div className="mb-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Názov dokumentu"
                className="w-full px-4 py-3 text-xl font-medium border-b border-gray-200 focus:outline-none focus:border-primary-500"
              />
            </div>
            
            {/* Format selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Formát
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="DOCUMENT">Dokument</option>
                <option value="ARTICLE">Článok</option>
                <option value="NOTE">Poznámka</option>
                <option value="EMAIL">Email</option>
                <option value="PRESENTATION">Prezentácia</option>
              </select>
            </div>
            
            {/* Tags */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tagy
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <motion.span
                    key={tag.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {tag.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag.id)}
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-400 hover:text-primary-600 focus:outline-none"
                    >
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </motion.span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Pridať tag"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Pridať
                </motion.button>
              </div>
            </div>
            
            {/* Content editor */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Obsah
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Začnite písať obsah..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                rows={15}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{wordCount} slov | {charCount} znakov</span>
                {saveMessage && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-green-600"
                  >
                    {saveMessage}
                  </motion.span>
                )}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClear}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Vyčistiť
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSave('DRAFT')}
                disabled={isSaving}
                className="px-4 py-2 border border-primary-300 rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isSaving ? 'Ukladám...' : 'Uložiť koncept'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSave('PUBLISHED')}
                disabled={isSaving}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isSaving ? 'Publikujem...' : 'Publikovať'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI panel */}
      <AnimatePresence>
        {showAIPanel && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="md:w-1/3"
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">AI Asistent</h3>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleGenerateSuggestions}
                    disabled={isGeneratingSuggestions || (!contentId && (title.trim() === '' || content.trim() === ''))}
                    className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {isGeneratingSuggestions ? 'Generujem...' : 'Generovať návrhy'}
                  </motion.button>
                </div>
                
                {isGeneratingSuggestions ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <svg className="animate-spin h-8 w-8 text-primary-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-600">Analyzujem obsah a generujem inteligentné návrhy...</p>
                  </div>
                ) : suggestions.length > 0 ? (
                  <div className="space-y-4">
                    {suggestions.map(suggestion => (
                      <motion.div
                        key={suggestion.id}
         
(Content truncated due to size limit. Use line ranges to read in chunks)