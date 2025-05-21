import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import MindFinderNavigator from '../components/MindFinder/MindFinderNavigator';

// Sample data for demonstration
const sampleTags = [
  { id: '1', name: 'Dokumenty', type: 'CATEGORY' },
  { id: '2', name: 'Projekty', type: 'CATEGORY' },
  { id: '3', name: 'Výskum', type: 'CATEGORY' },
  { id: '4', name: 'Marketing', type: 'TAG' },
  { id: '5', name: 'Financie', type: 'TAG' },
  { id: '6', name: 'Produkty', type: 'TAG' },
  { id: '7', name: 'Dôležité', type: 'SYSTEM' },
  { id: '8', name: 'Nedávne', type: 'SYSTEM' },
];

const sampleContents = [
  {
    id: '1',
    title: 'Marketingová stratégia 2025',
    excerpt: 'Komplexná marketingová stratégia pre rok 2025 vrátane digitálnych kanálov a sociálnych médií.',
    tags: [{ id: '1', name: 'Dokumenty', type: 'CATEGORY' }, { id: '4', name: 'Marketing', type: 'TAG' }],
    lastModified: '15. apríl 2025',
  },
  {
    id: '2',
    title: 'Finančná analýza Q1',
    excerpt: 'Analýza finančných výsledkov za prvý kvartál roku 2025 s prognózou na ďalšie obdobie.',
    tags: [{ id: '1', name: 'Dokumenty', type: 'CATEGORY' }, { id: '5', name: 'Financie', type: 'TAG' }, { id: '7', name: 'Dôležité', type: 'SYSTEM' }],
    lastModified: '10. apríl 2025',
  },
  {
    id: '3',
    title: 'Produktový plán - nová aplikácia',
    excerpt: 'Detailný plán vývoja novej mobilnej aplikácie vrátane časového harmonogramu a rozpočtu.',
    tags: [{ id: '2', name: 'Projekty', type: 'CATEGORY' }, { id: '6', name: 'Produkty', type: 'TAG' }],
    lastModified: '5. apríl 2025',
  },
  {
    id: '4',
    title: 'Výskum používateľského správania',
    excerpt: 'Výsledky výskumu používateľského správania na webovej stránke a v mobilnej aplikácii.',
    tags: [{ id: '3', name: 'Výskum', type: 'CATEGORY' }, { id: '8', name: 'Nedávne', type: 'SYSTEM' }],
    lastModified: '17. apríl 2025',
  },
  {
    id: '5',
    title: 'Konkurenčná analýza trhu',
    excerpt: 'Detailná analýza konkurencie na trhu vrátane SWOT analýzy a odporúčaní.',
    tags: [{ id: '3', name: 'Výskum', type: 'CATEGORY' }, { id: '4', name: 'Marketing', type: 'TAG' }],
    lastModified: '12. apríl 2025',
  },
];

const ContentPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleContentSelect = (contentId: string) => {
    console.log('Content selected:', contentId);
    // In a real implementation, this would navigate to the content detail page
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Obsah</h1>
        
        <MindFinderNavigator
          initialContents={sampleContents}
          initialTags={sampleTags}
          onContentSelect={handleContentSelect}
        />
      </div>
    </MainLayout>
  );
};

export default ContentPage;
