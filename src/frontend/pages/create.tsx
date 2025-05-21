import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import ContentCreationStudio from '../components/ContentStudio/ContentCreationStudio';

const CreatePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSave = (content: string) => {
    console.log('Content saved:', content);
    // In a real implementation, this would save the content to the backend
  };

  const handleCancel = () => {
    console.log('Content creation cancelled');
    // In a real implementation, this would navigate back or clear the form
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
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Vytvoriť nový obsah</h1>
        
        <ContentCreationStudio
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </MainLayout>
  );
};

export default CreatePage;
