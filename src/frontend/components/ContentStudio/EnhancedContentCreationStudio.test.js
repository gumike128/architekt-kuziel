import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EnhancedContentCreationStudio from '../components/ContentStudio/EnhancedContentCreationStudio';

// Mock content and AI contexts
jest.mock('../../contexts/AIContext', () => ({
  useAI: () => ({
    generateContentSuggestions: jest.fn().mockResolvedValue([
      { id: '1', type: 'TITLE_IMPROVEMENT', suggestion: 'Improved title suggestion' },
      { id: '2', type: 'CONTENT_ENHANCEMENT', suggestion: 'Enhanced content suggestion' },
      { id: '3', type: 'GRAMMAR_CORRECTION', suggestion: 'Grammar correction suggestion' }
    ]),
    applyContentSuggestion: jest.fn().mockResolvedValue({
      title: 'Improved Title',
      body: 'Improved content with applied suggestion'
    })
  })
}));

jest.mock('../../contexts/ContentContext', () => ({
  useContent: () => ({
    createContent: jest.fn().mockResolvedValue({ id: 'new-content-id' }),
    updateContent: jest.fn().mockResolvedValue({ success: true })
  })
}));

const mockStore = configureStore([]);

describe('EnhancedContentCreationStudio Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    // Reset mocks
    jest.clearAllMocks();
    // Mock timers for auto-save functionality
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders correctly with initial state', () => {
    render(
      <Provider store={store}>
        <EnhancedContentCreationStudio />
      </Provider>
    );

    expect(screen.getByText('Content Creation Studio')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Názov dokumentu')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Začnite písať obsah...')).toBeInTheDocument();
    expect(screen.getByText('Formát')).toBeInTheDocument();
    expect(screen.getByText('Tagy')).toBeInTheDocument();
    expect(screen.getByText('AI Asistent')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByText('Vyčistiť')).toBeInTheDocument();
    expect(screen.getByText('Uložiť koncept')).toBeInTheDocument();
    expect(screen.getByText('Publikovať')).toBeInTheDocument();
    expect(screen.getByText('Generovať návrhy')).toBeInTheDocument();
  });

  test('handles title and content input', () => {
    render(
      <Provider store={store}>
        <EnhancedContentCreationStudio />
      </Provider>
    );
    
    // Type in title field
    const titleInput = screen.getByPlaceholderText('Názov dokumentu');
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    expect(titleInput.value).toBe('Test Title');
    
    // Type in content field
    const contentInput = screen.getByPlaceholderText('Začnite písať obsah...');
    fireEvent.change(contentInput, { target: { value: 'Test content text' } });
    expect(contentInput.value).toBe('Test content text');
    
    // Check if word and character count updates
    expect(screen.getByText('3 slov | 16 znakov')).toBeInTheDocument();
  });

  test('handles tag addition and removal', () => {
    render(
      <Provider store={store}>
        <EnhancedContentCreationStudio />
      </Provider>
    );
    
    // Add a tag
    const tagInput = screen.getByPlaceholderText('Pridať tag');
    fireEvent.change(tagInput, { target: { value: 'TestTag' } });
    fireEvent.click(screen.getByText('Pridať'));
    
    // Check if tag was added
    expect(screen.getByText('TestTag')).toBeInTheDocument();
    
    // Add another tag
    fireEvent.change(tagInput, { target: { value: 'AnotherTag' } });
    // Use Enter key to add tag
    fireEvent.keyDown(tagInput, { key: 'Enter', code: 'Enter' });
    
    // Check if second tag was added
    expect(screen.getByText('AnotherTag')).toBeInTheDocument();
    
    // Remove a tag
    const removeButtons = screen.getAllByRole('button');
    const removeTagButton = removeButtons.find(button => 
      button.parentElement && button.parentElement.textContent.includes('TestTag')
    );
    fireEvent.click(removeTagButton);
    
    // Check if tag was removed
    expect(screen.queryByText('TestTag')).not.toBeInTheDocument();
    expect(screen.getByText('AnotherTag')).toBeInTheDocument();
  });

  test('handles format selection', () => {
    render(
      <Provider store={store}>
        <EnhancedContentCreationStudio />
      </Provider>
    );
    
    // Select a different format
    const formatSelect = screen.getByRole('combobox');
    fireEvent.change(formatSelect, { target: { value: 'ARTICLE' } });
    
    // Check if format was changed
    expect(formatSelect.value).toBe('ARTICLE');
  });

  test('saves content as draft', async () => {
    const { useContent } = require('../../contexts/ContentContext');
    const createContentMock = useContent().createContent;
    
    render(
      <Provider store={store}>
        <EnhancedContentCreationStudio />
      </Provider>
    );
    
    // Fill in required fields
    fireEvent.change(screen.getByPlaceholderText('Názov dokumentu'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Začnite písať obsah...'), { target: { value: 'Test content' } });
    
    // Click save draft button
    fireEvent.click(screen.getByText('Uložiť koncept'));
    
    // Check if createContent was called with correct data
    await waitFor(() => {
      expect(createContentMock).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Test Title',
        body: 'Test content',
        status: 'DRAFT'
      }));
    });
    
    // Check if success message is shown
    await waitFor(() => {
      expect(screen.getByText('Dokument uložený')).toBeInTheDocument();
    });
  });

  test('publishes content', async () => {
    const { useContent } = require('../../contexts/ContentContext');
    const createContentMock = useContent().createContent;
    
    render(
      <Provider store={store}>
        <EnhancedContentCreationStudio />
      </Provider>
    );
    
    // Fill in required fields
    fireEvent.change(screen.getByPlaceholderText('Názov dokumentu'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Začnite písať obsah...'), { target: { value: 'Test content' } });
    
    // Click publish button
    fireEvent.click(screen.getByText('Publikovať'));
    
    // Check if createContent was called with correct data
    await waitFor(() => {
      expect(createContentMock).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Test Title',
        body: 'Test content',
        status: 'PUBLISHED'
      }));
    });
    
    // Check if success message is shown
    await waitFor(() => {
      expect(screen.getByText('Dokument publikovaný')).toBeInTheDocument();
    });
  });

  test('auto-saves content after delay', async () => {
    const { useContent } = require('../../contexts/ContentContext');
    const createContentMock = useContent().createContent;
    
    render(
      <Provider store={store}>
        <EnhancedContentCreationStudio />
      </Provider>
    );
    
    // Fill in required fields
    fireEvent.change(screen.getByPlaceholderText('Názov dokumentu'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Začnite písať obsah...'), { target: { value: 'Test content' } });
    
    // Advance timers to trigger auto-save
    jest.advanceTimersByTime(30000);
    
    // Check if createContent was called with correct data
    await waitFor(() => {
      expect(createContentMock).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Test Title',
        body: 'Test content',
        status: 'DRAFT'
      }));
    });
    
    // Check if auto-save message is shown
    await waitFor(() => {
      expect(screen.getByText('Automaticky uložené')).toBeInTheDocument();
    });
  });

  test('generates and applies AI suggestions', async () => {
    const { useAI } = require('../../contexts/AIContext');
    const generateSuggestionsMock = useAI().generateContentSuggestions;
    const applySuggestionMock = useAI().applyContentSuggestion;
    
    render(
      <Provider store={store}>
        <EnhancedContentCreationStudio />
      </Provider>
    );
    
    // Fill in required fields and save to get content ID
    fireEvent.change(screen.getByPlaceholderText('Názov dokumentu'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Začnite písať obsah...'), { target: { value: 'Test content' } });
    fireEvent.click(screen.getByText('Uložiť koncept'));
    
    // Wait for save to complete
    await waitFor(() => {
      expect(screen.getByText('Dokument uložený')).toBeInTheDocument();
    });
    
    // Click generate suggestions button
    fireEvent.click(screen.getByText('Generovať návrhy'));
    
    // Check if generateContentSuggestions was called
    await waitFor(() => {
      expect(generateSuggestionsMock).toHaveBeenCalled();
    });
    
    // Check if suggestions are displayed
    await waitFor(() => {
      expect(screen.getByText('Improved title suggestion')).toBeInTheDocument();
      expect(screen.getByText('Enhanced content suggestion')).toBeInTheDocument();
      expect(screen.getByText('Grammar correction suggestion')).toBeInTheDocument();
    });
    
    // Apply a suggestion
    const applyButtons = screen.getAllByText('Aplikovať');
    fireEvent.click(applyButtons[0]);
    
    // Check if applyContentSuggestion was called
    await waitFor(() => {
      expect(applySuggestionMock).toHaveBeenCalledWith('1');
    });
    
    // Check if content was updated with suggestion
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Názov dokumentu').value).toBe('Improved Title');
      expect(screen.getByPlaceholderText('Začnite písať obsah...').value).toBe('Improved content with applied suggestion');
    });
  });

  test('toggles AI panel visibility', () => {
    render(
      <Provider store={store}>
        <EnhancedContentCreationStudio />
      </Provider>
    );
    
    // AI panel should be visible by default
    expect(screen.getByText('AI Asistent')).toBeInTheDocument();
    
    // Find and click the toggle button (it's an SVG icon)
    const toggleButtons = screen.getAllByRole('button');
    const toggleButton = toggleButtons.find(button => 
      button.innerHTML.includes('path') && 
      button.innerHTML.includes('M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z')
    );
    fireEvent.click(toggleButton);
    
    // AI panel should be hidden
    expect(screen.queryByText('AI Asistent')).not.toBeInTheDocument();
    
    // Click toggle button again to show AI panel
    const newToggleButtons = screen.getAllByRole('button');
    const newToggleButton = newToggleButtons.find(button => 
      button.innerHTML.includes('path') && 
      button.innerHTML.includes('M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z')
    );
    fireEvent.click(newToggleButton);
    
    // AI panel should be visible again
    expect(screen.getByText('AI Asistent')).toBeInTheDocument();
  });

  test('clears form with confirmation', () => {
    // Mock window.confirm
    const confirmMock = jest.spyOn(window, 'confirm').mockImplementation(() => true);
    
    render(
      <Provider store={store}>
        <EnhancedContentCreationStudio />
      </Provider>
    );
    
    // Fill in form fields
    fireEvent.change(screen.getByPlaceholderText('Názov dokumentu'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Začnite písať obsah...'), { target: { value: 'Test content' } });
    
    // Add a tag
    const tagInput = screen.getByPlaceholderText('Pridať tag');
    fireEvent.change(tagInput, { target: { value: 'TestTag' } });
    fireEvent.click(screen.getByText('Pridať'));
    
    // Click clear button
    fireEvent.click(screen.getByText('Vyčistiť'));
    
    // Check if confirmation was requested
    expect(confirmMock).toHaveBeenCalled();
    
    // Check if form was cleared
    expect(screen.getByPlaceholderText('Názov dokumentu').value).toBe('');
    expect(screen.getByPlaceholderText('Začnite písať obsah...').value).toBe('');
    expect(screen.queryByText('TestTag')).not.toBeInTheDocument();
    
    confirmMock.mockRestore();
  });

  test('prevents clearing form when user cancels confirmation', () => {
    // Mock window.confirm
    const confirmMock = jest.spyOn(window, 'confirm').mockImplementation(() => false);
    
    render(
      <Provider store={store}>
        <EnhancedContentCreationStudio />
      </Provider>
    );
    
    // Fill in form fields
    fireEvent.change(screen.getByPlaceholderText('Názov dokumentu'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Začnite písať obsah...'), { target: { value: 'Test content' } });
    
    // Click clear button
    fireEvent.click(screen.getByText('Vyčistiť'));
    
    // Check if confirmation was requested
    expect(confirmMock).toHaveBeenCalled();
    
    // Check if form was NOT cleared
    expect(screen.getByPlaceholderText('Názov dokumentu').value).toBe('Test Title');
    expect(screen.getByPlaceholderText('Začnite písať obsah...').value).toBe('Test content');
    
    confirmMock.mockRestore();
  });
});
