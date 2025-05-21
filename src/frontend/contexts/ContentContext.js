import { createContext, useContext, useState, useEffect } from 'react';
import { contentService, tagService } from '../services/api';
import { useAuth } from './AuthContext';

// Create content context
const ContentContext = createContext();

// Content provider component
export const ContentProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [contents, setContents] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial content data when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadInitialContentData();
    }
  }, [isAuthenticated]);

  // Load initial content data
  const loadInitialContentData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get contents
      const contentsData = await contentService.getContents();
      setContents(contentsData);
      
      // Get tags
      const tagsData = await tagService.getTags();
      setTags(tagsData);
    } catch (err) {
      console.error('Load content data error:', err);
      setError('Failed to load content data');
    } finally {
      setLoading(false);
    }
  };

  // Get content by ID
  const getContent = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const content = await contentService.getContent(id);
      return content;
    } catch (err) {
      console.error('Get content error:', err);
      setError('Failed to get content');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create content
  const createContent = async (contentData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newContent = await contentService.createContent(contentData);
      setContents([...contents, newContent]);
      return newContent;
    } catch (err) {
      console.error('Create content error:', err);
      setError('Failed to create content');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update content
  const updateContent = async (id, contentData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedContent = await contentService.updateContent(id, contentData);
      setContents(contents.map(content => content.id === id ? updatedContent : content));
      return updatedContent;
    } catch (err) {
      console.error('Update content error:', err);
      setError('Failed to update content');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete content
  const deleteContent = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await contentService.deleteContent(id);
      if (result) {
        setContents(contents.filter(content => content.id !== id));
      }
      return result;
    } catch (err) {
      console.error('Delete content error:', err);
      setError('Failed to delete content');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create tag
  const createTag = async (tagData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newTag = await tagService.createTag(tagData);
      setTags([...tags, newTag]);
      return newTag;
    } catch (err) {
      console.error('Create tag error:', err);
      setError('Failed to create tag');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete tag
  const deleteTag = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await tagService.deleteTag(id);
      if (result) {
        setTags(tags.filter(tag => tag.id !== id));
      }
      return result;
    } catch (err) {
      console.error('Delete tag error:', err);
      setError('Failed to delete tag');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Filter contents
  const filterContents = async (filters) => {
    setLoading(true);
    setError(null);
    
    try {
      const filteredContents = await contentService.getContents(filters);
      return filteredContents;
    } catch (err) {
      console.error('Filter contents error:', err);
      setError('Failed to filter contents');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh content data
  const refreshContentData = async () => {
    await loadInitialContentData();
  };

  // Context value
  const value = {
    contents,
    tags,
    loading,
    error,
    getContent,
    createContent,
    updateContent,
    deleteContent,
    createTag,
    deleteTag,
    filterContents,
    refreshContentData
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

// Custom hook to use content context
export const useContent = () => {
  const context = useContext(ContentContext);
  
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  
  return context;
};
