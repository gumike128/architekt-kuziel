import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EnhancedMainLayout from '../components/Layout/EnhancedMainLayout';

// Mock auth context
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { name: 'Test User', email: 'test@example.com' },
    isAuthenticated: true,
    logout: jest.fn()
  })
}));

const mockStore = configureStore([]);

// Mock components
const MockHeader = () => <div data-testid="mock-header">Header Component</div>;
const MockSidebar = () => <div data-testid="mock-sidebar">Sidebar Component</div>;
const MockChildren = () => <div data-testid="mock-children">Main Content</div>;
const MockFooter = () => <div data-testid="mock-footer">Footer Component</div>;

describe('EnhancedMainLayout Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    // Reset mocks
    jest.clearAllMocks();
  });

  test('renders correctly with all components', () => {
    render(
      <Provider store={store}>
        <EnhancedMainLayout
          header={<MockHeader />}
          sidebar={<MockSidebar />}
          footer={<MockFooter />}
        >
          <MockChildren />
        </EnhancedMainLayout>
      </Provider>
    );

    expect(screen.getByText('Architekt kúziel')).toBeInTheDocument();
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('toggles desktop sidebar', () => {
    render(
      <Provider store={store}>
        <EnhancedMainLayout
          header={<MockHeader />}
          sidebar={<MockSidebar />}
          footer={<MockFooter />}
        >
          <MockChildren />
        </EnhancedMainLayout>
      </Provider>
    );

    // Find and click the desktop sidebar toggle button
    const toggleButtons = screen.getAllByRole('button');
    const desktopToggleButton = toggleButtons.find(button => 
      button.innerHTML.includes('path') && 
      button.innerHTML.includes('M11 19l-7-7 7-7m8 14l-7-7 7-7')
    );
    
    // Sidebar should be visible initially
    expect(screen.getByTestId('mock-sidebar')).toBeVisible();
    
    // Click to hide sidebar
    fireEvent.click(desktopToggleButton);
    
    // Sidebar should still be in the DOM but with width 0
    const sidebarContainer = screen.getByTestId('mock-sidebar').parentElement;
    expect(sidebarContainer).toHaveStyle('width: 0');
  });

  test('toggles mobile sidebar', () => {
    render(
      <Provider store={store}>
        <EnhancedMainLayout
          header={<MockHeader />}
          sidebar={<MockSidebar />}
          footer={<MockFooter />}
        >
          <MockChildren />
        </EnhancedMainLayout>
      </Provider>
    );

    // Find and click the mobile sidebar toggle button
    const toggleButtons = screen.getAllByRole('button');
    const mobileToggleButton = toggleButtons.find(button => 
      button.innerHTML.includes('path') && 
      button.innerHTML.includes('M4 6h16M4 12h16M4 18h16')
    );
    
    // Mobile sidebar should not be visible initially
    expect(screen.queryByText('Zavrieť menu')).not.toBeInTheDocument();
    
    // Click to show mobile sidebar
    fireEvent.click(mobileToggleButton);
    
    // Mobile sidebar should now be visible
    expect(screen.getByText('Zavrieť menu')).toBeInTheDocument();
    
    // Click close button to hide mobile sidebar
    const closeButton = screen.getByText('Zavrieť menu');
    fireEvent.click(closeButton);
    
    // Mobile sidebar should be hidden again
    expect(screen.queryByText('Zavrieť menu')).not.toBeInTheDocument();
  });

  test('toggles user menu', async () => {
    render(
      <Provider store={store}>
        <EnhancedMainLayout
          header={<MockHeader />}
          sidebar={<MockSidebar />}
          footer={<MockFooter />}
        >
          <MockChildren />
        </EnhancedMainLayout>
      </Provider>
    );

    // Find and click the user menu button (it has the first letter of the user's name)
    const userMenuButton = screen.getByText('T');
    fireEvent.click(userMenuButton);
    
    // User menu should be visible
    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Profil')).toBeInTheDocument();
      expect(screen.getByText('Nastavenia')).toBeInTheDocument();
      expect(screen.getByText('Odhlásiť sa')).toBeInTheDocument();
    });
    
    // Click outside to close user menu
    fireEvent.click(document.body);
    
    // User menu should be hidden
    await waitFor(() => {
      expect(screen.queryByText('Profil')).not.toBeInTheDocument();
    });
  });

  test('toggles notifications panel', async () => {
    render(
      <Provider store={store}>
        <EnhancedMainLayout
          header={<MockHeader />}
          sidebar={<MockSidebar />}
          footer={<MockFooter />}
        >
          <MockChildren />
        </EnhancedMainLayout>
      </Provider>
    );

    // Find and click the notifications button
    const notificationsButton = screen.getByRole('button', { name: /Zobraziť notifikácie/i });
    fireEvent.click(notificationsButton);
    
    // Notifications panel should be visible
    await waitFor(() => {
      expect(screen.getByText('Notifikácie')).toBeInTheDocument();
      expect(screen.getByText('Nový komentár k vášmu dokumentu')).toBeInTheDocument();
      expect(screen.getByText('Dokument bol zdieľaný')).toBeInTheDocument();
      expect(screen.getByText('Pripomienka: Dokončiť projekt')).toBeInTheDocument();
    });
    
    // Click "Mark all as read" button
    fireEvent.click(screen.getByText('Označiť všetky ako prečítané'));
    
    // Click outside to close notifications panel
    fireEvent.click(document.body);
    
    // Notifications panel should be hidden
    await waitFor(() => {
      expect(screen.queryByText('Nový komentár k vášmu dokumentu')).not.toBeInTheDocument();
    });
  });

  test('handles logout', async () => {
    const { useAuth } = require('../../contexts/AuthContext');
    const logoutMock = useAuth().logout;
    
    // Mock window.location.href
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };
    
    render(
      <Provider store={store}>
        <EnhancedMainLayout
          header={<MockHeader />}
          sidebar={<MockSidebar />}
          footer={<MockFooter />}
        >
          <MockChildren />
        </EnhancedMainLayout>
      </Provider>
    );

    // Open user menu
    const userMenuButton = screen.getByText('T');
    fireEvent.click(userMenuButton);
    
    // Click logout button
    await waitFor(() => {
      expect(screen.getByText('Odhlásiť sa')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Odhlásiť sa'));
    
    // Check if logout was called
    expect(logoutMock).toHaveBeenCalled();
    
    // Check if redirect to login page was attempted
    expect(window.location.href).toBe('/login');
    
    // Restore original location
    window.location = originalLocation;
  });

  test('renders login/register buttons when not authenticated', () => {
    // Override mock to return not authenticated
    jest.mock('../../contexts/AuthContext', () => ({
      useAuth: () => ({
        user: null,
        isAuthenticated: false,
        logout: jest.fn()
      })
    }));
    
    render(
      <Provider store={store}>
        <EnhancedMainLayout
          header={<MockHeader />}
          sidebar={<MockSidebar />}
          footer={<MockFooter />}
        >
          <MockChildren />
        </EnhancedMainLayout>
      </Provider>
    );

    // Check if login/register buttons are rendered
    expect(screen.getByText('Prihlásiť sa')).toBeInTheDocument();
    expect(screen.getByText('Registrovať sa')).toBeInTheDocument();
    
    // User menu and notifications should not be rendered
    expect(screen.queryByRole('button', { name: /Zobraziť notifikácie/i })).not.toBeInTheDocument();
    expect(screen.queryByText('T')).not.toBeInTheDocument();
  });
});
