import React from 'react';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  sidebar,
  header,
  footer,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      {header && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          {header}
        </header>
      )}

      {/* Main content with optional sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebar && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-white border-r border-gray-200 overflow-y-auto hidden md:block"
          >
            {sidebar}
          </motion.aside>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <footer className="bg-white border-t border-gray-200">
          {footer}
        </footer>
      )}
    </div>
  );
};

export default MainLayout;
