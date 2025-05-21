import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardWidget from './DashboardWidget';

interface WidgetConfig {
  id: string;
  title: string;
  type: string;
  size: 'small' | 'medium' | 'large';
  position: number;
}

interface AdaptiveDashboardProps {
  initialWidgets?: WidgetConfig[];
  onAddWidget?: () => void;
  className?: string;
}

const AdaptiveDashboard: React.FC<AdaptiveDashboardProps> = ({
  initialWidgets = [],
  onAddWidget,
  className = '',
}) => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(initialWidgets);

  const handleRemoveWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  const handleEditWidget = (id: string) => {
    // Placeholder for edit functionality
    console.log(`Edit widget ${id}`);
  };

  // Function to render widget content based on type
  const renderWidgetContent = (type: string) => {
    switch (type) {
      case 'recentActivity':
        return (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Dokument upravený</p>
                <p className="text-xs text-gray-500">Pred 5 minútami</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Nový komentár</p>
                <p className="text-xs text-gray-500">Pred 20 minútami</p>
              </div>
            </div>
          </div>
        );
      case 'quickAccess':
        return (
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
              <p className="text-sm font-medium">Nový dokument</p>
              <p className="text-xs text-gray-500">Vytvoriť prázdny dokument</p>
            </button>
            <button className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
              <p className="text-sm font-medium">Importovať</p>
              <p className="text-xs text-gray-500">Nahrať existujúci súbor</p>
            </button>
            <button className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
              <p className="text-sm font-medium">Šablóny</p>
              <p className="text-xs text-gray-500">Použiť predpripravenú šablónu</p>
            </button>
            <button className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
              <p className="text-sm font-medium">Nedávne</p>
              <p className="text-xs text-gray-500">Zobraziť nedávne dokumenty</p>
            </button>
          </div>
        );
      case 'recommendations':
        return (
          <div className="space-y-2">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Analýza dát z prieskumu</p>
              <p className="text-xs text-gray-500">Odporúčané na základe vašich záujmov</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Marketingová stratégia 2025</p>
              <p className="text-xs text-gray-500">Populárne vo vašej organizácii</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Projektový plán - nový web</p>
              <p className="text-xs text-gray-500">Nedávno upravené kolegami</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-2">
            <div className="p-2 border-l-4 border-primary-500 bg-primary-50 rounded-r-lg">
              <p className="text-sm">Pripomienka: Dokončiť návrh do zajtra</p>
              <p className="text-xs text-gray-500">Termín: 18. apríl 2025</p>
            </div>
            <div className="p-2 border-l-4 border-secondary-500 bg-secondary-50 rounded-r-lg">
              <p className="text-sm">Komentár k vášmu dokumentu</p>
              <p className="text-xs text-gray-500">Od: Ján Novák</p>
            </div>
            <div className="p-2 border-l-4 border-accent-500 bg-accent-50 rounded-r-lg">
              <p className="text-sm">Nová verzia aplikácie je dostupná</p>
              <p className="text-xs text-gray-500">Kliknite pre aktualizáciu</p>
            </div>
          </div>
        );
      default:
        return <p className="text-gray-500">Obsah widgetu nie je dostupný</p>;
    }
  };

  // Get widget size class
  const getWidgetSizeClass = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1';
      case 'medium':
        return 'col-span-2';
      case 'large':
        return 'col-span-3';
      default:
        return 'col-span-1';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Váš Dashboard</h2>
        {onAddWidget && (
          <button
            onClick={onAddWidget}
            className="btn-primary flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Pridať widget</span>
          </button>
        )}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className={getWidgetSizeClass(widget.size)}
          >
            <DashboardWidget
              title={widget.title}
              onEdit={() => handleEditWidget(widget.id)}
              onRemove={() => handleRemoveWidget(widget.id)}
            >
              {renderWidgetContent(widget.type)}
            </DashboardWidget>
          </div>
        ))}

        {widgets.length === 0 && (
          <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Váš dashboard je prázdny
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Pridajte widgety pre prispôsobenie vášho dashboardu a získajte rýchly prístup k dôležitým informáciám.
            </p>
            {onAddWidget && (
              <button onClick={onAddWidget} className="btn-primary">
                Pridať prvý widget
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdaptiveDashboard;
