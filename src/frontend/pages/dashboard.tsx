import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import UniversalPrompt from '../components/UniversalPrompt/UniversalPrompt';
import AdaptiveDashboard from '../components/Dashboard/AdaptiveDashboard';

// Sample dashboard widgets for demonstration
const sampleWidgets = [
  {
    id: '1',
    title: 'Nedávna aktivita',
    type: 'recentActivity',
    size: 'medium',
    position: 0,
  },
  {
    id: '2',
    title: 'Rýchly prístup',
    type: 'quickAccess',
    size: 'medium',
    position: 1,
  },
  {
    id: '3',
    title: 'Odporúčania',
    type: 'recommendations',
    size: 'medium',
    position: 2,
  },
  {
    id: '4',
    title: 'Notifikácie',
    type: 'notifications',
    size: 'medium',
    position: 3,
  },
];

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [promptSuggestions, setPromptSuggestions] = useState([
    'Vytvoriť nový dokument',
    'Nájsť nedávne súbory',
    'Analyzovať dáta z prieskumu',
    'Zobraziť štatistiky projektu',
  ]);

  const handlePromptSubmit = (input: string) => {
    console.log('Prompt submitted:', input);
    // In a real implementation, this would process the input and perform actions
  };

  const handleAddWidget = () => {
    console.log('Add widget clicked');
    // In a real implementation, this would open a widget selection modal
  };

  return (
    <MainLayout
      header={<Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />}
      sidebar={<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
      footer={
        <div className="p-4 text-center text-sm text-gray-500">
          © 2025 Architekt kúziel. Všetky práva vyhradené.
        </div>
      }
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Universal Prompt */}
        <div className="mb-8">
          <UniversalPrompt
            onSubmit={handlePromptSubmit}
            suggestions={promptSuggestions}
            placeholder="Čo by ste chceli dnes urobiť?"
          />
        </div>

        {/* Adaptive Dashboard */}
        <AdaptiveDashboard
          initialWidgets={sampleWidgets}
          onAddWidget={handleAddWidget}
        />
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
