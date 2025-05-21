import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EnhancedUniversalPrompt from '../components/UniversalPrompt/EnhancedUniversalPrompt';

// Mock AI context
jest.mock('../../contexts/AIContext', () => ({
  useAI: () => ({
    promptSuggestions: ['Vytvor nový dokument', 'Vyhľadaj v obsahu', 'Analyzuj text'],
    getPromptSuggestions: jest.fn(),
  }),
}));

const mockStore = configureStore([]);
const mockOnSubmit = jest.fn();

describe('EnhancedUniversalPrompt Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    mockOnSubmit.mockClear();
  });

  test('renders correctly with default props', () => {
    render(
      <Provider store={store}>
        <EnhancedUniversalPrompt onSubmit={mockOnSubmit} />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Čo by ste chceli urobiť?')).toBeInTheDocument();
    expect(screen.getByText('Spustiť')).toBeInTheDocument();
    expect(screen.getByText('Klávesové skratky')).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    render(
      <Provider store={store}>
        <EnhancedUniversalPrompt onSubmit={mockOnSubmit} />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Čo by ste chceli urobiť?');
    fireEvent.change(input, { target: { value: 'Test input' } });
    
    expect(input.value).toBe('Test input');
  });

  test('submits form with input value', async () => {
    render(
      <Provider store={store}>
        <EnhancedUniversalPrompt onSubmit={mockOnSubmit} />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Čo by ste chceli urobiť?');
    fireEvent.change(input, { target: { value: 'Test command' } });
    
    const submitButton = screen.getByText('Spustiť');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('Test command');
    });
  });

  test('does not submit empty form', () => {
    render(
      <Provider store={store}>
        <EnhancedUniversalPrompt onSubmit={mockOnSubmit} />
      </Provider>
    );
    
    const submitButton = screen.getByText('Spustiť');
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('shows suggestions when typing', async () => {
    render(
      <Provider store={store}>
        <EnhancedUniversalPrompt onSubmit={mockOnSubmit} />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Čo by ste chceli urobiť?');
    fireEvent.change(input, { target: { value: 'Vyt' } });
    
    // Wait for suggestions to appear (after debounce)
    await waitFor(() => {
      expect(screen.getByText('Vytvor nový dokument')).toBeInTheDocument();
    });
  });

  test('applies suggestion when clicked', async () => {
    render(
      <Provider store={store}>
        <EnhancedUniversalPrompt onSubmit={mockOnSubmit} />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Čo by ste chceli urobiť?');
    fireEvent.change(input, { target: { value: 'Vyt' } });
    
    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('Vytvor nový dokument')).toBeInTheDocument();
    });
    
    // Click on a suggestion
    fireEvent.click(screen.getByText('Vytvor nový dokument'));
    
    expect(input.value).toBe('Vytvor nový dokument');
  });

  test('shows keyboard shortcuts info when clicked', () => {
    render(
      <Provider store={store}>
        <EnhancedUniversalPrompt onSubmit={mockOnSubmit} />
      </Provider>
    );

    // Mock window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    
    // Click on keyboard shortcuts button
    fireEvent.click(screen.getByText('Klávesové skratky'));
    
    expect(alertMock).toHaveBeenCalled();
    expect(alertMock.mock.calls[0][0]).toContain('Klávesové skratky');
    
    alertMock.mockRestore();
  });
});
