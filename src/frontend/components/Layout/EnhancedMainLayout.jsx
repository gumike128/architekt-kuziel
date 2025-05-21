import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

// Enhanced main layout component with animations and improved UI
const EnhancedMainLayout = ({ header, sidebar, children, footer }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Nový komentár k vášmu dokumentu', time: '5 min', read: false },
    { id: 2, text: 'Dokument bol zdieľaný', time: '1 hod', read: false },
    { id: 3, text: 'Pripomienka: Dokončiť projekt', time: '2 hod', read: true }
  ]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  // Toggle notifications
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Handle logout
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={toggleMobileSidebar}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                >
                  <span className="sr-only">Otvoriť menu</span>
                  {isMobileSidebarOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Desktop sidebar toggle */}
              <div className="hidden md:flex md:items-center">
                <button
                  onClick={toggleSidebar}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                >
                  <span className="sr-only">Prepnúť bočný panel</span>
                  {isSidebarOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <a href="/" className="flex items-center">
                  <span className="text-xl font-bold text-primary-600">Architekt kúziel</span>
                </a>
              </div>
            </div>
            
            {/* User menu and notifications */}
            <div className="flex items-center">
              {isAuthenticated && (
                <>
                  {/* Notifications */}
                  <div className="ml-4 relative">
                    <button
                      onClick={toggleNotifications}
                      className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <span className="sr-only">Zobraziť notifikácie</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                      )}
                    </button>
                    
                    {/* Notifications dropdown */}
                    {isNotificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
                      >
                        <div className="py-1">
                          <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-sm font-medium text-gray-700">Notifikácie</h3>
                            {unreadCount > 0 && (
                              <button
                                onClick={markAllAsRead}
                                className="text-xs text-primary-600 hover:text-primary-800"
                              >
                                Označiť všetky ako prečítané
                              </button>
                            )}
                          </div>
                          
                          {notifications.length === 0 ? (
                            <div className="px-4 py-6 text-center">
                              <p className="text-sm text-gray-500">Žiadne notifikácie</p>
                            </div>
                          ) : (
                            <div className="max-h-60 overflow-y-auto">
                              {notifications.map(notification => (
                                <div
                                  key={notification.id}
                                  className={`px-4 py-3 hover:bg-gray-50 ${notification.read ? '' : 'bg-blue-50'}`}
                                >
                                  <div className="flex justify-between">
                                    <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                                      {notification.text}
                                    </p>
                                    {!notification.read && (
                                      <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="ml-2 text-primary-600 hover:text-primary-800"
                                      >
                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      </button>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="border-t border-gray-100 px-4 py-2">
                            <a href="/notifications" className="text-xs text-primary-600 hover:text-primary-800">
                              Zobraziť všetky notifikácie
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* User menu */}
                  <div className="ml-4 relative">
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center max-w-xs rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <span className="sr-only">Otvoriť používateľské menu</span>
                      <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                    </button>
                    
                    {/* User dropdown */}
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
                      >
                        <div className="py-1">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">{user?.name || 'Používateľ'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email || 'email@example.com'}</p>
                          </div>
                          
                          <a
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Profil
                          </a>
                          <a
                            href="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Nastavenia
                          </a>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Odhlásiť sa
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </>
              )}
              
              {!isAuthenticated && (
                <div className="flex items-center space-x-2">
                  <a
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-800"
                  >
                    Prihlásiť sa
                  </a>
                  <a
                    href="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                  >
                    Registrovať sa
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <motion.div
          initial={false}
          animate={{ width: isSidebarOpen ? 'auto' : '0', opacity: isSidebarOpen ? 1 : 0 }}
          className={`bg-white shadow-md z-10 hidden md:block overflow-hidden ${isSidebarOpen ? 'w-64' : 'w-0'}`}
        >
          {sidebar}
        </motion.div>
        
        {/* Sidebar for mobile */}
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileSidebar}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={toggleMobileSidebar}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Zavrieť menu</span>
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                {sidebar}
              </div>
            </div>
            <div className="flex-shrink-0 w-14"></div>
          </motion.div>
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        {footer}
      </footer>
    </div>
  );
};

export default EnhancedMainLayout;
