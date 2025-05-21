import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EnhancedAdaptiveDashboard from '../components/Dashboard/EnhancedAdaptiveDashboard';

// Mock dashboard context
jest.mock('../../contexts/DashboardContext', () => ({
  useDashboard: () => ({
    widgets: [],
    addWidget: jest.fn(),
    updateWidget: jest.fn(),
    deleteWidget: jest.fn(),
    updatePositions: jest.fn(),
  }),
}));

const mockStore = configureStore([]);
const mockOnAddWidget = jest.fn();
const mockOnDeleteWidget = jest.fn();
const mockOnUpdatePositions = jest.fn();

const mockWidgets = [
  { id: '1', title: 'Recent Activity', type: 'RECENT_ACTIVITY', position: 0, size: 'MEDIUM' },
  { id: '2', title: 'Statistics', type: 'STATS', position: 1, size: 'SMALL' },
  { id: '3', title: 'Recommendations', type: 'RECOMMENDATIONS', position: 2, size: 'LARGE' },
];

describe('EnhancedAdaptiveDashboard Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    mockOnAddWidget.mockClear();
    mockOnDeleteWidget.mockClear();
    mockOnUpdatePositions.mockClear();
  });

  test('renders correctly with no widgets', () => {
    render(
      <Provider store={store}>
        <EnhancedAdaptiveDashboard 
          initialWidgets={[]} 
          onAddWidget={mockOnAddWidget}
          onDeleteWidget={mockOnDeleteWidget}
          onUpdatePositions={mockOnUpdatePositions}
        />
      </Provider>
    );

    expect(screen.getByText('Váš Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Prispôsobiť')).toBeInTheDocument();
    expect(screen.getByText('Žiadne widgety')).toBeInTheDocument();
    expect(screen.getByText('Pridať prvý widget')).toBeInTheDocument();
  });

  test('renders widgets correctly', () => {
    render(
      <Provider store={store}>
        <EnhancedAdaptiveDashboard 
          initialWidgets={mockWidgets} 
          onAddWidget={mockOnAddWidget}
          onDeleteWidget={mockOnDeleteWidget}
          onUpdatePositions={mockOnUpdatePositions}
        />
      </Provider>
    );

    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Statistics')).toBeInTheDocument();
    expect(screen.getByText('Recommendations')).toBeInTheDocument();
  });

  test('toggles customize mode', () => {
    render(
      <Provider store={store}>
        <EnhancedAdaptiveDashboard 
          initialWidgets={mockWidgets} 
          onAddWidget={mockOnAddWidget}
          onDeleteWidget={mockOnDeleteWidget}
          onUpdatePositions={mockOnUpdatePositions}
        />
      </Provider>
    );

    // Click customize button
    fireEvent.click(screen.getByText('Prispôsobiť'));
    
    // Check if customize mode is active
    expect(screen.getByText('Hotovo')).toBeInTheDocument();
    expect(screen.getByText('Režim prispôsobenia')).toBeInTheDocument();
    expect(screen.getByText('Pridať widget')).toBeInTheDocument();
    
    // Exit customize mode
    fireEvent.click(screen.getByText('Hotovo'));
    
    // Check if customize mode is inactive
    expect(screen.getByText('Prispôsobiť')).toBeInTheDocument();
    expect(screen.queryByText('Režim prispôsobenia')).not.toBeInTheDocument();
  });

  test('adds a widget', async () => {
    render(
      <Provider store={store}>
        <EnhancedAdaptiveDashboard 
          initialWidgets={mockWidgets} 
          onAddWidget={mockOnAddWidget}
          onDeleteWidget={mockOnDeleteWidget}
          onUpdatePositions={mockOnUpdatePositions}
        />
      </Provider>
    );

    // Enter customize mode
    fireEvent.click(screen.getByText('Prispôsobiť'));
    
    // Click add widget button
    fireEvent.click(screen.getByText('Pridať widget'));
    
    // Check if onAddWidget was called
    await waitFor(() => {
      expect(mockOnAddWidget).toHaveBeenCalled();
    });
  });

  test('deletes a widget', async () => {
    render(
      <Provider store={store}>
        <EnhancedAdaptiveDashboard 
          initialWidgets={mockWidgets} 
          onAddWidget={mockOnAddWidget}
          onDeleteWidget={mockOnDeleteWidget}
          onUpdatePositions={mockOnUpdatePositions}
        />
      </Provider>
    );

    // Enter customize mode
    fireEvent.click(screen.getByText('Prispôsobiť'));
    
    // Find delete buttons (they're SVG icons, so we need to find them by role)
    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find(button => 
      button.innerHTML.includes('path') && 
      button.innerHTML.includes('M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9z')
    );
    
    // Click delete button for the first widget
    fireEvent.click(deleteButton);
    
    // Check if onDeleteWidget was called with the correct ID
    await waitFor(() => {
      expect(mockOnDeleteWidget).toHaveBeenCalledWith('1');
    });
  });

  test('handles empty state correctly', () => {
    render(
      <Provider store={store}>
        <EnhancedAdaptiveDashboard 
          initialWidgets={[]} 
          onAddWidget={mockOnAddWidget}
          onDeleteWidget={mockOnDeleteWidget}
          onUpdatePositions={mockOnUpdatePositions}
        />
      </Provider>
    );

    expect(screen.getByText('Žiadne widgety')).toBeInTheDocument();
    expect(screen.getByText('Váš dashboard je prázdny. Pridajte widgety pre zobrazenie relevantných informácií.')).toBeInTheDocument();
    
    // Click add first widget button
    fireEvent.click(screen.getByText('Pridať prvý widget'));
    
    expect(mockOnAddWidget).toHaveBeenCalled();
  });
});
