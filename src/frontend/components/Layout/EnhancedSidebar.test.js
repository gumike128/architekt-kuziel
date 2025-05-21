import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EnhancedSidebar from '../components/Layout/EnhancedSidebar';

const mockStore = configureStore([]);

describe('EnhancedSidebar Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('renders correctly with all sections', () => {
    render(
      <Provider store={store}>
        <EnhancedSidebar />
      </Provider>
    );

    // Check if logo and app name are rendered
    expect(screen.getByText('Architekt kúziel')).toBeInTheDocument();
    
    // Check if main navigation items are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Obsah')).toBeInTheDocument();
    expect(screen.getByText('Vytvoriť')).toBeInTheDocument();
    expect(screen.getByText('Preskúmať')).toBeInTheDocument();
    
    // Check if workspaces section is rendered
    expect(screen.getByText('Pracovné priestory')).toBeInTheDocument();
    expect(screen.getByText('Marketingové materiály')).toBeInTheDocument();
    expect(screen.getByText('Finančné analýzy')).toBeInTheDocument();
    expect(screen.getByText('Produktový vývoj')).toBeInTheDocument();
    
    // Check if recent items section is rendered
    expect(screen.getByText('Nedávne')).toBeInTheDocument();
    expect(screen.getByText('Marketingová stratégia 2025')).toBeInTheDocument();
    expect(screen.getByText('Finančná analýza Q1')).toBeInTheDocument();
    expect(screen.getByText('Produktový plán')).toBeInTheDocument();
    
    // Check if user section is rendered
    expect(screen.getByText('Ján Novák')).toBeInTheDocument();
    expect(screen.getByText('Zobraziť profil')).toBeInTheDocument();
  });

  test('navigation links have correct hrefs', () => {
    render(
      <Provider store={store}>
        <EnhancedSidebar />
      </Provider>
    );
    
    // Check main navigation links
    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/dashboard');
    expect(screen.getByText('Obsah').closest('a')).toHaveAttribute('href', '/content');
    expect(screen.getByText('Vytvoriť').closest('a')).toHaveAttribute('href', '/create');
    expect(screen.getByText('Preskúmať').closest('a')).toHaveAttribute('href', '/explore');
    
    // Check workspace links
    expect(screen.getByText('Marketingové materiály').closest('a')).toHaveAttribute('href', '/workspace/marketing');
    expect(screen.getByText('Finančné analýzy').closest('a')).toHaveAttribute('href', '/workspace/finance');
    expect(screen.getByText('Produktový vývoj').closest('a')).toHaveAttribute('href', '/workspace/product');
    
    // Check recent items links
    expect(screen.getByText('Marketingová stratégia 2025').closest('a')).toHaveAttribute('href', '/content/1');
    expect(screen.getByText('Finančná analýza Q1').closest('a')).toHaveAttribute('href', '/content/2');
    expect(screen.getByText('Produktový plán').closest('a')).toHaveAttribute('href', '/content/3');
  });

  test('add workspace button is clickable', () => {
    render(
      <Provider store={store}>
        <EnhancedSidebar />
      </Provider>
    );
    
    // Find add workspace button (it's an SVG icon)
    const addButton = screen.getAllByRole('button').find(button => 
      button.innerHTML.includes('path') && 
      button.innerHTML.includes('M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z')
    );
    
    // Check if button is in the document
    expect(addButton).toBeInTheDocument();
    
    // Click the button (no actual functionality to test, just ensure it's clickable)
    fireEvent.click(addButton);
  });

  test('navigation items have hover animations', () => {
    render(
      <Provider store={store}>
        <EnhancedSidebar />
      </Provider>
    );
    
    // Get a navigation item
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    
    // Check if it has the motion component props for animations
    expect(dashboardLink).toHaveAttribute('data-motion-initial-animation');
    
    // Simulate hover
    fireEvent.mouseOver(dashboardLink);
    fireEvent.mouseLeave(dashboardLink);
  });
});
