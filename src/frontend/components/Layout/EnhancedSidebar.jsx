import React from 'react';
import { motion } from 'framer-motion';

// Enhanced sidebar component with animations and improved UI
const EnhancedSidebar = () => {
  // Navigation items
  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Obsah', href: '/content', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Vytvoriť', href: '/create', icon: 'M12 4v16m8-8H4' },
    { name: 'Preskúmať', href: '/explore', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  ];

  // Workspace items
  const workspaceItems = [
    { name: 'Marketingové materiály', href: '/workspace/marketing', color: 'bg-pink-100 text-pink-800' },
    { name: 'Finančné analýzy', href: '/workspace/finance', color: 'bg-blue-100 text-blue-800' },
    { name: 'Produktový vývoj', href: '/workspace/product', color: 'bg-green-100 text-green-800' },
  ];

  // Recent items
  const recentItems = [
    { name: 'Marketingová stratégia 2025', href: '/content/1', time: 'Upravené pred 5 min' },
    { name: 'Finančná analýza Q1', href: '/content/2', time: 'Upravené pred 2 hod' },
    { name: 'Produktový plán', href: '/content/3', time: 'Upravené včera' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Logo and app name */}
      <div className="flex items-center px-4 py-5 border-b border-gray-200">
        <div className="flex-shrink-0 flex items-center">
          <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </div>
          <span className="ml-2 text-lg font-semibold text-gray-900">Architekt kúziel</span>
        </div>
      </div>
      
      {/* Main navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ scale: 1.02, backgroundColor: '#F3F4F6' }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-6 w-6 text-gray-500 group-hover:text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.name}
            </motion.a>
          ))}
        </div>
        
        {/* Workspaces section */}
        <div className="pt-6">
          <div className="px-2 flex justify-between items-center">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Pracovné priestory
            </h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
          <div className="mt-2 space-y-1">
            {workspaceItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.02, backgroundColor: '#F3F4F6' }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              >
                <span className={`mr-3 h-2 w-2 rounded-full ${item.color}`}></span>
                {item.name}
              </motion.a>
            ))}
          </div>
        </div>
        
        {/* Recent items section */}
        <div className="pt-6">
          <div className="px-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Nedávne
            </h3>
          </div>
          <div className="mt-2 space-y-1">
            {recentItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.02, backgroundColor: '#F3F4F6' }}
                whileTap={{ scale: 0.98 }}
                className="group flex flex-col px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              >
                <span className="truncate">{item.name}</span>
                <span className="text-xs text-gray-500">{item.time}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </nav>
      
      {/* User section */}
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Ján Novák
            </p>
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              Zobraziť profil
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSidebar;
