import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EnhancedMindFinderNavigator from '../components/MindFinder/EnhancedMindFinderNavigator';

// Mock content and AI contexts
jest.mock('../../contexts/ContentContext', () => ({
  useContent: () => ({
    contents: [],
    tags: [
      { id: '1', name: 'Marketing', type: 'CATEGORY' },
      { id: '2', name: 'Finance', type: 'CATEGORY' },
      { id: '3', name: 'Strategy', type: 'TOPIC' },
      { id: '4', name: 'Analysis', type: 'KEYWORD' },
    ],
    filterContents: jest.fn().mockResolvedValue([
      {
        id: '1',
        title: 'Marketing Strategy 2025',
        body: 'This is a sample marketing strategy document.',
        author: { name: 'John Doe' },
        updatedAt: '2025-04-01T10:00:00Z',
        tags: [{ id: '1', name: 'Marketing', type: 'CATEGORY' }, { id: '3', name: 'Strategy', type: 'TOPIC' }]
      },
      {
        id: '2',
        title: 'Financial Analysis Q1',
        body: 'This is a sample financial analysis document.',
        author: { name: 'Jane Smith' },
        updatedAt: '2025-03-15T14:30:00Z',
        tags: [{ id: '2', name: 'Finance', type: 'CATEGORY' }, { id: '4', name: 'Analysis', type: 'KEYWORD' }]
      }
    ])
  }),
  useAI: () => ({
    analyzeContent: jest.fn().mockResolvedValue({
      sentiment: 0.75,
      keyPhrases: ['marketing', 'strategy', '2025'],
      relatedDocuments: [{ title: 'Marketing Plan 2024' }]
    })
  })
}));

const mockStore = configureStore([]);

describe('EnhancedMindFinderNavigator Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    // Reset mocks
    jest.clearAllMocks();
  });

  test('renders correctly with initial state', async () => {
    render(
      <Provider store={store}>
        <EnhancedMindFinderNavigator />
      </Provider>
    );

    expect(screen.getByText('MindFinder Navigator')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Hľadať obsah...')).toBeInTheDocument();
    
    // Check if view mode buttons are rendered
    expect(screen.getByRole('button', { name: /list/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /grid/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /map/i })).toBeInTheDocument();
    
    // Check if tags are rendered
    expect(screen.getByText('Marketing')).toBeInTheDocument();
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('Strategy')).toBeInTheDocument();
    expect(screen.getByText('Analysis')).toBeInTheDocument();
    
    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByText('Marketing Strategy 2025')).toBeInTheDocument();
      expect(screen.getByText('Financial Analysis Q1')).toBeInTheDocument();
    });
  });

  test('filters content when searching', async () => {
    const { useContent } = require('../../contexts/ContentContext');
    const filterContentsMock = useContent().filterContents;
    
    render(
      <Provider store={store}>
        <EnhancedMindFinderNavigator />
      </Provider>
    );
    
    // Type in search box
    const searchInput = screen.getByPlaceholderText('Hľadať obsah...');
    fireEvent.change(searchInput, { target: { value: 'marketing' } });
    
    // Check if filterContents was called with search term
    await waitFor(() => {
      expect(filterContentsMock).toHaveBeenCalledWith(expect.objectContaining({
        search: 'marketing'
      }));
    });
  });

  test('filters content when selecting tags', async () => {
    const { useContent } = require('../../contexts/ContentContext');
    const filterContentsMock = useContent().filterContents;
    
    render(
      <Provider store={store}>
        <EnhancedMindFinderNavigator />
      </Provider>
    );
    
    // Click on a tag
    fireEvent.click(screen.getByText('Marketing'));
    
    // Check if filterContents was called with tag ID
    await waitFor(() => {
      expect(filterContentsMock).toHaveBeenCalledWith(expect.objectContaining({
        tagIds: ['1']
      }));
    });
    
    // Click on another tag
    fireEvent.click(screen.getByText('Finance'));
    
    // Check if filterContents was called with both tag IDs
    await waitFor(() => {
      expect(filterContentsMock).toHaveBeenCalledWith(expect.objectContaining({
        tagIds: ['1', '2']
      }));
    });
    
    // Click on first tag again to deselect
    fireEvent.click(screen.getByText('Marketing'));
    
    // Check if filterContents was called with only second tag ID
    await waitFor(() => {
      expect(filterContentsMock).toHaveBeenCalledWith(expect.objectContaining({
        tagIds: ['2']
      }));
    });
  });

  test('changes view mode', async () => {
    render(
      <Provider store={store}>
        <EnhancedMindFinderNavigator />
      </Provider>
    );
    
    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByText('Marketing Strategy 2025')).toBeInTheDocument();
    });
    
    // Default view is list, switch to grid
    fireEvent.click(screen.getByRole('button', { name: /grid/i }));
    
    // Check if grid view is active
    const gridButton = screen.getByRole('button', { name: /grid/i });
    expect(gridButton.className).toContain('bg-white');
    
    // Switch to map view
    fireEvent.click(screen.getByRole('button', { name: /map/i }));
    
    // Check if map view is active
    const mapButton = screen.getByRole('button', { name: /map/i });
    expect(mapButton.className).toContain('bg-white');
    
    // Check if map view content is shown
    expect(screen.getByText('Mapové zobrazenie')).toBeInTheDocument();
    expect(screen.getByText('Vizualizácia vzťahov medzi obsahom')).toBeInTheDocument();
  });

  test('shows content detail when clicking on content item', async () => {
    const { useAI } = require('../../contexts/ContentContext');
    const analyzeContentMock = useAI().analyzeContent;
    
    render(
      <Provider store={store}>
        <EnhancedMindFinderNavigator />
      </Provider>
    );
    
    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByText('Marketing Strategy 2025')).toBeInTheDocument();
    });
    
    // Click on content item
    fireEvent.click(screen.getByText('Marketing Strategy 2025'));
    
    // Check if content detail is shown
    await waitFor(() => {
      expect(screen.getByText('This is a sample marketing strategy document.')).toBeInTheDocument();
      expect(analyzeContentMock).toHaveBeenCalled();
    });
    
    // Check if AI analysis is shown
    await waitFor(() => {
      expect(screen.getByText('AI Analýza')).toBeInTheDocument();
      expect(screen.getByText('Sentiment')).toBeInTheDocument();
      expect(screen.getByText('Kľúčové frázy')).toBeInTheDocument();
      expect(screen.getByText('marketing')).toBeInTheDocument();
      expect(screen.getByText('strategy')).toBeInTheDocument();
      expect(screen.getByText('2025')).toBeInTheDocument();
      expect(screen.getByText('Súvisiace dokumenty')).toBeInTheDocument();
      expect(screen.getByText('Marketing Plan 2024')).toBeInTheDocument();
    });
    
    // Close content detail
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    
    // Check if content detail is closed
    await waitFor(() => {
      expect(screen.queryByText('This is a sample marketing strategy document.')).not.toBeInTheDocument();
    });
  });
});
