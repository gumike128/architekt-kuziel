import React from 'react';
import { AuthProvider } from './AuthContext';
import { AIProvider } from './AIContext';
import { ContentProvider } from './ContentContext';
import { DashboardProvider } from './DashboardContext';

// App provider component that combines all context providers
const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <AIProvider>
        <ContentProvider>
          <DashboardProvider>
            {children}
          </DashboardProvider>
        </ContentProvider>
      </AIProvider>
    </AuthProvider>
  );
};

export default AppProvider;
