import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EnhancedWelcomePage from '../pages/welcome';

const mockStore = configureStore([]);

// Mock router navigation
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('EnhancedWelcomePage Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    // Mock window.location.href
    delete window.location;
    window.location = { href: '' };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders hero section correctly', () => {
    render(
      <Provider store={store}>
        <EnhancedWelcomePage />
      </Provider>
    );

    // Check if main headings are rendered
    expect(screen.getByText('Inteligentný ekosystém')).toBeInTheDocument();
    expect(screen.getByText('pre prácu s informáciami')).toBeInTheDocument();
    
    // Check if description is rendered
    expect(screen.getByText(/Architekt kúziel je revolučná aplikácia/i)).toBeInTheDocument();
    
    // Check if CTA buttons are rendered
    expect(screen.getByText('Začať zadarmo')).toBeInTheDocument();
    expect(screen.getByText('Prihlásiť sa')).toBeInTheDocument();
  });

  test('renders features section correctly', () => {
    render(
      <Provider store={store}>
        <EnhancedWelcomePage />
      </Provider>
    );

    // Check if features section is rendered
    expect(screen.getByText('Funkcie')).toBeInTheDocument();
    expect(screen.getByText('Všetko, čo potrebujete pre efektívnu prácu')).toBeInTheDocument();
    
    // Check if feature carousel navigation dots are rendered
    const carouselDots = screen.getAllByRole('button').filter(button => 
      button.className.includes('rounded-full') && 
      (button.className.includes('bg-primary-600') || button.className.includes('bg-gray-300'))
    );
    expect(carouselDots.length).toBe(4); // 4 features
  });

  test('renders testimonials section correctly', () => {
    render(
      <Provider store={store}>
        <EnhancedWelcomePage />
      </Provider>
    );

    // Check if testimonials section is rendered
    expect(screen.getByText('Čo hovoria naši používatelia')).toBeInTheDocument();
    
    // Check if testimonials are rendered
    expect(screen.getByText(/Architekt kúziel zmenil spôsob, akým pracujem s informáciami/i)).toBeInTheDocument();
    expect(screen.getByText(/Táto aplikácia mi ušetrí hodiny času každý týždeň/i)).toBeInTheDocument();
    expect(screen.getByText(/Konečne aplikácia, ktorá skutočne rozumie kontextu mojej práce/i)).toBeInTheDocument();
    
    // Check if testimonial authors are rendered
    expect(screen.getByText('Jana Kováčová')).toBeInTheDocument();
    expect(screen.getByText('Peter Novák')).toBeInTheDocument();
    expect(screen.getByText('Martina Horváthová')).toBeInTheDocument();
  });

  test('renders CTA section correctly', () => {
    render(
      <Provider store={store}>
        <EnhancedWelcomePage />
      </Provider>
    );

    // Check if CTA section is rendered
    expect(screen.getByText('Pripravený začať?')).toBeInTheDocument();
    expect(screen.getByText('Zaregistrujte sa ešte dnes.')).toBeInTheDocument();
    
    // Check if CTA buttons are rendered
    const ctaButtons = screen.getAllByText('Začať zadarmo');
    expect(ctaButtons.length).toBe(2); // One in hero section, one in CTA section
    expect(screen.getByText('Zistiť viac')).toBeInTheDocument();
  });

  test('feature carousel changes automatically', async () => {
    jest.useFakeTimers();
    
    render(
      <Provider store={store}>
        <EnhancedWelcomePage />
      </Provider>
    );

    // Initially, first feature should be active
    const carouselDots = screen.getAllByRole('button').filter(button => 
      button.className.includes('rounded-full')
    );
    expect(carouselDots[0].className).toContain('bg-primary-600');
    
    // Advance timer to trigger auto-advance
    jest.advanceTimersByTime(5000);
    
    // Now second feature should be active
    await waitFor(() => {
      const updatedDots = screen.getAllByRole('button').filter(button => 
        button.className.includes('rounded-full')
      );
      expect(updatedDots[1].className).toContain('bg-primary-600');
    });
    
    jest.useRealTimers();
  });

  test('feature carousel can be manually controlled', () => {
    render(
      <Provider store={store}>
        <EnhancedWelcomePage />
      </Provider>
    );

    // Get carousel dots
    const carouselDots = screen.getAllByRole('button').filter(button => 
      button.className.includes('rounded-full') && 
      (button.className.includes('bg-primary-600') || button.className.includes('bg-gray-300'))
    );
    
    // Click on third dot
    fireEvent.click(carouselDots[2]);
    
    // Now third feature should be active
    expect(carouselDots[2].className).toContain('bg-primary-600');
  });

  test('get started button redirects to register page', async () => {
    render(
      <Provider store={store}>
        <EnhancedWelcomePage />
      </Provider>
    );

    // Click on "Začať zadarmo" button
    const getStartedButton = screen.getAllByText('Začať zadarmo')[0];
    fireEvent.click(getStartedButton);
    
    // Wait for loading state
    expect(getStartedButton.textContent).toContain('Pripravujeme');
    
    // Wait for redirect
    await waitFor(() => {
      expect(window.location.href).toBe('/register');
    });
  });

  test('login button redirects to login page', () => {
    render(
      <Provider store={store}>
        <EnhancedWelcomePage />
      </Provider>
    );

    // Click on "Prihlásiť sa" button
    const loginButton = screen.getByText('Prihlásiť sa');
    fireEvent.click(loginButton);
    
    // Check if redirect happened
    expect(window.location.href).toBe('/login');
  });

  test('learn more button redirects to about page', () => {
    render(
      <Provider store={store}>
        <EnhancedWelcomePage />
      </Provider>
    );

    // Click on "Zistiť viac" button
    const learnMoreButton = screen.getByText('Zistiť viac');
    fireEvent.click(learnMoreButton);
    
    // Check if redirect happened
    expect(window.location.href).toBe('/about');
  });
});
