import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EnhancedFooter from '../components/Layout/EnhancedFooter';

const mockStore = configureStore([]);

describe('EnhancedFooter Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('renders correctly with all sections', () => {
    render(
      <Provider store={store}>
        <EnhancedFooter />
      </Provider>
    );

    // Check if copyright text is rendered with current year
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Architekt kúziel. Všetky práva vyhradené.`)).toBeInTheDocument();
    
    // Check if footer links are rendered
    expect(screen.getByText('O aplikácii')).toBeInTheDocument();
    expect(screen.getByText('Kontakt')).toBeInTheDocument();
    expect(screen.getByText('Podmienky používania')).toBeInTheDocument();
    expect(screen.getByText('Ochrana súkromia')).toBeInTheDocument();
    
    // Check if social media links are rendered (they're SVG icons with sr-only text)
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    
    // Check if description text is rendered
    expect(screen.getByText('Architekt kúziel je inteligentný, automatizovaný ekosystém pre prácu s informáciami a obsahom.')).toBeInTheDocument();
  });

  test('footer links have correct hrefs', () => {
    render(
      <Provider store={store}>
        <EnhancedFooter />
      </Provider>
    );
    
    // Check footer links
    expect(screen.getByText('O aplikácii').closest('a')).toHaveAttribute('href', '/about');
    expect(screen.getByText('Kontakt').closest('a')).toHaveAttribute('href', '/contact');
    expect(screen.getByText('Podmienky používania').closest('a')).toHaveAttribute('href', '/terms');
    expect(screen.getByText('Ochrana súkromia').closest('a')).toHaveAttribute('href', '/privacy');
    
    // Check social media links
    expect(screen.getByText('Twitter').closest('a')).toHaveAttribute('href', '#');
    expect(screen.getByText('GitHub').closest('a')).toHaveAttribute('href', '#');
    expect(screen.getByText('LinkedIn').closest('a')).toHaveAttribute('href', '#');
  });

  test('social media links have hover animations', () => {
    render(
      <Provider store={store}>
        <EnhancedFooter />
      </Provider>
    );
    
    // Get social media links
    const socialLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href') === '#'
    );
    
    // Check if they have the motion component props for animations
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('data-motion-initial-animation');
      
      // Simulate hover
      fireEvent.mouseOver(link);
      fireEvent.mouseLeave(link);
    });
  });

  test('footer links have hover color change', () => {
    render(
      <Provider store={store}>
        <EnhancedFooter />
      </Provider>
    );
    
    // Get footer links
    const footerLinks = [
      screen.getByText('O aplikácii').closest('a'),
      screen.getByText('Kontakt').closest('a'),
      screen.getByText('Podmienky používania').closest('a'),
      screen.getByText('Ochrana súkromia').closest('a')
    ];
    
    // Check if they have the motion component props for animations
    footerLinks.forEach(link => {
      expect(link).toHaveAttribute('data-motion-initial-animation');
      
      // Simulate hover
      fireEvent.mouseOver(link);
      fireEvent.mouseLeave(link);
    });
  });
});
