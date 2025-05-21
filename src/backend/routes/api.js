import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API client for interacting with the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to include auth token in requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API service for authentication
export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
              user {
                id
                name
                email
                role
              }
            }
          }
        `,
        variables: { email, password }
      });
      
      const { token, user } = response.data.data.login;
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation Register($input: CreateUserInput!) {
            register(input: $input) {
              token
              user {
                id
                name
                email
                role
              }
            }
          }
        `,
        variables: { input: userData }
      });
      
      const { token, user } = response.data.data.register;
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  getCurrentUser: async () => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          query Me {
            me {
              id
              name
              email
              role
            }
          }
        `
      });
      
      return response.data.data.me;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }
};

// API service for content management
export const contentService = {
  getContents: async (filters = {}) => {
    try {
      const { status, tagIds, search } = filters;
      
      const response = await apiClient.post('/graphql', {
        query: `
          query Contents($status: ContentStatus, $tagIds: [ID!], $search: String) {
            contents(status: $status, tagIds: $tagIds, search: $search) {
              id
              title
              body
              format
              status
              author {
                id
                name
              }
              tags {
                id
                name
                type
              }
              createdAt
              updatedAt
            }
          }
        `,
        variables: { status, tagIds, search }
      });
      
      return response.data.data.contents;
    } catch (error) {
      console.error('Get contents error:', error);
      throw error;
    }
  },
  
  getContent: async (id) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          query Content($id: ID!) {
            content(id: $id) {
              id
              title
              body
              format
              status
              author {
                id
                name
              }
              tags {
                id
                name
                type
              }
              createdAt
              updatedAt
            }
          }
        `,
        variables: { id }
      });
      
      return response.data.data.content;
    } catch (error) {
      console.error('Get content error:', error);
      throw error;
    }
  },
  
  createContent: async (contentData) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation CreateContent($input: CreateContentInput!) {
            createContent(input: $input) {
              id
              title
              body
              format
              status
              createdAt
              updatedAt
            }
          }
        `,
        variables: { input: contentData }
      });
      
      return response.data.data.createContent;
    } catch (error) {
      console.error('Create content error:', error);
      throw error;
    }
  },
  
  updateContent: async (id, contentData) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation UpdateContent($id: ID!, $input: UpdateContentInput!) {
            updateContent(id: $id, input: $input) {
              id
              title
              body
              format
              status
              updatedAt
            }
          }
        `,
        variables: { id, input: contentData }
      });
      
      return response.data.data.updateContent;
    } catch (error) {
      console.error('Update content error:', error);
      throw error;
    }
  },
  
  deleteContent: async (id) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation DeleteContent($id: ID!) {
            deleteContent(id: $id)
          }
        `,
        variables: { id }
      });
      
      return response.data.data.deleteContent;
    } catch (error) {
      console.error('Delete content error:', error);
      throw error;
    }
  }
};

// API service for tag management
export const tagService = {
  getTags: async (type) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          query Tags($type: TagType) {
            tags(type: $type) {
              id
              name
              type
              createdAt
            }
          }
        `,
        variables: { type }
      });
      
      return response.data.data.tags;
    } catch (error) {
      console.error('Get tags error:', error);
      throw error;
    }
  },
  
  createTag: async (tagData) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation CreateTag($input: CreateTagInput!) {
            createTag(input: $input) {
              id
              name
              type
              createdAt
            }
          }
        `,
        variables: { input: tagData }
      });
      
      return response.data.data.createTag;
    } catch (error) {
      console.error('Create tag error:', error);
      throw error;
    }
  },
  
  deleteTag: async (id) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation DeleteTag($id: ID!) {
            deleteTag(id: $id)
          }
        `,
        variables: { id }
      });
      
      return response.data.data.deleteTag;
    } catch (error) {
      console.error('Delete tag error:', error);
      throw error;
    }
  }
};

// API service for AI functionality
export const aiService = {
  analyzeContent: async (contentId, text) => {
    try {
      const response = await apiClient.post('/api/ai/analyze-content', {
        contentId,
        text
      });
      
      return response.data;
    } catch (error) {
      console.error('Analyze content error:', error);
      throw error;
    }
  },
  
  getPromptSuggestions: async (input) => {
    try {
      const response = await apiClient.post('/api/ai/prompt-suggestions', {
        input
      });
      
      return response.data;
    } catch (error) {
      console.error('Get prompt suggestions error:', error);
      throw error;
    }
  },
  
  getRecommendations: async () => {
    try {
      const response = await apiClient.get('/api/ai/recommendations');
      
      return response.data;
    } catch (error) {
      console.error('Get recommendations error:', error);
      throw error;
    }
  },
  
  predictUserNeeds: async () => {
    try {
      const response = await apiClient.get('/api/ai/predict-needs');
      
      return response.data;
    } catch (error) {
      console.error('Predict user needs error:', error);
      throw error;
    }
  },
  
  generateContentSuggestions: async (contentId) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation GenerateContentSuggestions($contentId: ID!) {
            generateContentSuggestions(contentId: $contentId) {
              id
              suggestion
              type
              applied
              createdAt
            }
          }
        `,
        variables: { contentId }
      });
      
      return response.data.data.generateContentSuggestions;
    } catch (error) {
      console.error('Generate content suggestions error:', error);
      throw error;
    }
  },
  
  applyContentSuggestion: async (id) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation ApplyContentSuggestion($id: ID!) {
            applyContentSuggestion(id: $id) {
              id
              title
              body
              updatedAt
            }
          }
        `,
        variables: { id }
      });
      
      return response.data.data.applyContentSuggestion;
    } catch (error) {
      console.error('Apply content suggestion error:', error);
      throw error;
    }
  }
};

// API service for widget management
export const widgetService = {
  getWidgets: async () => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          query Widgets {
            widgets {
              id
              title
              type
              size
              position
              config
              createdAt
              updatedAt
            }
          }
        `
      });
      
      return response.data.data.widgets;
    } catch (error) {
      console.error('Get widgets error:', error);
      throw error;
    }
  },
  
  createWidget: async (widgetData) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation CreateWidget($input: CreateWidgetInput!) {
            createWidget(input: $input) {
              id
              title
              type
              size
              position
              config
              createdAt
              updatedAt
            }
          }
        `,
        variables: { input: widgetData }
      });
      
      return response.data.data.createWidget;
    } catch (error) {
      console.error('Create widget error:', error);
      throw error;
    }
  },
  
  updateWidget: async (id, widgetData) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation UpdateWidget($id: ID!, $input: UpdateWidgetInput!) {
            updateWidget(id: $id, input: $input) {
              id
              title
              type
              size
              position
              config
              updatedAt
            }
          }
        `,
        variables: { id, input: widgetData }
      });
      
      return response.data.data.updateWidget;
    } catch (error) {
      console.error('Update widget error:', error);
      throw error;
    }
  },
  
  deleteWidget: async (id) => {
    try {
      const response = await apiClient.post('/graphql', {
        query: `
          mutation DeleteWidget($id: ID!) {
            deleteWidget(id: $id)
          }
        `,
        variables: { id }
      });
      
      return response.data.data.deleteWidget;
    } catch (error) {
      console.error('Delete widget error:', error);
      throw error;
    }
  }
};

export default {
  authService,
  contentService,
  tagService,
  aiService,
  widgetService
};
