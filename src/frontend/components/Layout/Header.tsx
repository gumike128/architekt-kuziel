import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '../../hooks/reduxHooks';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user, isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <div className="px-4 py-3 flex justify-between items-center">
      {/* Left side - Logo and menu toggle */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-display font-bold text-primary-600">Architekt kúziel</span>
        </Link>
      </div>
      
      {/* Right side - Navigation and user menu */}
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
            Dashboard
          </Link>
          <Link href="/content" className="text-gray-600 hover:text-gray-900 transition-colors">
            Obsah
          </Link>
          <Link href="/create" className="text-gray-600 hover:text-gray-900 transition-colors">
            Vytvoriť
          </Link>
        </nav>
        
        {isAuthenticated && user ? (
          <div className="relative group">
            <button className="flex items-center space-x-2 focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                {user.name.charAt(0)}
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700">{user.name}</span>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profil
              </Link>
              <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Nastavenia
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Odhlásiť sa
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Prihlásiť sa
            </Link>
            <Link href="/register" className="btn-primary text-sm">
              Registrovať
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
