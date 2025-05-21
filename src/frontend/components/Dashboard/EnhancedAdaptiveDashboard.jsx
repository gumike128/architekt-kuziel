import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '../../contexts/DashboardContext';

// Enhanced Adaptive Dashboard component with animations and improved UI
const EnhancedAdaptiveDashboard = ({ initialWidgets = [], onAddWidget, onUpdateWidget, onDeleteWidget, onUpdatePositions }) => {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update widgets when initialWidgets changes
  useEffect(() => {
    setWidgets(initialWidgets);
  }, [initialWidgets]);

  // Handle widget drag start
  const handleDragStart = (widget) => {
    if (!isCustomizing) return;
    setIsDragging(true);
    setDraggedWidget(widget);
  };

  // Handle widget drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedWidget(null);
    
    // Update positions in backend
    if (isCustomizing && onUpdatePositions) {
      onUpdatePositions(widgets);
    }
  };

  // Handle widget drag over
  const handleDragOver = (e, targetWidget) => {
    e.preventDefault();
    
    if (!isDragging || !isCustomizing || draggedWidget.id === targetWidget.id) return;
    
    // Reorder widgets
    const updatedWidgets = [...widgets];
    const draggedIndex = updatedWidgets.findIndex(w => w.id === draggedWidget.id);
    const targetIndex = updatedWidgets.findIndex(w => w.id === targetWidget.id);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      updatedWidgets.splice(draggedIndex, 1);
      updatedWidgets.splice(targetIndex, 0, draggedWidget);
      
      // Update positions
      updatedWidgets.forEach((widget, index) => {
        widget.position = index;
      });
      
      setWidgets(updatedWidgets);
    }
  };

  // Handle add widget
  const handleAddWidget = async () => {
    if (!onAddWidget) return;
    
    setIsLoading(true);
    
    try {
      await onAddWidget();
    } catch (error) {
      console.error('Error adding widget:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete widget
  const handleDeleteWidget = async (id) => {
    if (!onDeleteWidget) return;
    
    setIsLoading(true);
    
    try {
      await onDeleteWidget(id);
    } catch (error) {
      console.error('Error deleting widget:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get widget size class
  const getWidgetSizeClass = (size) => {
    switch (size) {
      case 'SMALL':
        return 'col-span-1';
      case 'MEDIUM':
        return 'col-span-1 md:col-span-2';
      case 'LARGE':
        return 'col-span-1 md:col-span-3';
      default:
        return 'col-span-1';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Váš Dashboard</h2>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCustomizing(!isCustomizing)}
            className={`px-4 py-2 rounded-lg ${
              isCustomizing 
                ? 'bg-primary-100 text-primary-700 border border-primary-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            {isCustomizing ? 'Hotovo' : 'Prispôsobiť'}
          </motion.button>
          
          {isCustomizing && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddWidget}
              disabled={isLoading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg disabled:opacity-50"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span>Pridať widget</span>
              )}
            </motion.button>
          )}
        </div>
      </div>
      
      {isCustomizing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-blue-50 p-4 rounded-lg border border-blue-200"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Režim prispôsobenia</h3>
              <div className="mt-1 text-sm text-blue-700">
                <p>V tomto režime môžete:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Presúvať widgety ťahaním</li>
                  <li>Pridávať nové widgety</li>
                  <li>Odstraňovať existujúce widgety</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {widgets.map((widget) => (
            <motion.div
              key={widget.id}
              layoutId={`widget-${widget.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`${getWidgetSizeClass(widget.size)} ${
                isDragging && draggedWidget?.id === widget.id ? 'opacity-50' : ''
              }`}
              draggable={isCustomizing}
              onDragStart={() => handleDragStart(widget)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, widget)}
            >
              <div className={`bg-white rounded-xl shadow-md overflow-hidden h-full ${
                isCustomizing ? 'border-2 border-dashed border-gray-300' : ''
              }`}>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{widget.title}</h3>
                    
                    {isCustomizing && (
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteWidget(widget.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </motion.button>
                    )}
                  </div>
                  
                  {/* Widget content based on type */}
                  {widget.type === 'RECENT_ACTIVITY' && (
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <p className="text-sm text-gray-600">Dokument upravený pred 5 minútami</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <p className="text-sm text-gray-600">Nový obsah vytvorený pred 2 hodinami</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        <p className="text-sm text-gray-600">Komentár pridaný pred 1 dňom</p>
                      </div>
                    </div>
                  )}
                  
                  {widget.type === 'STATS' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Dokumenty</p>
                        <p className="text-xl font-bold text-gray-800">24</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Tagy</p>
                        <p className="text-xl font-bold text-gray-800">48</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Komentáre</p>
                        <p className="text-xl font-bold text-gray-800">128</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Zdieľania</p>
                        <p className="text-xl font-bold text-gray-800">16</p>
                      </div>
                    </div>
                  )}
                  
                  {widget.type === 'RECOMMENDATIONS' && (
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-800">Marketingová stratégia 2025</p>
                        <p className="text-xs text-gray-500 mt-1">Relevantné k vašej nedávnej aktivite</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-800">Finančná analýza Q1</p>
                        <p className="text-xs text-gray-500 mt-1">Často prezeraný dokument</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Default content for other widget types */}
                  {!['RECENT_ACTIVITY', 'STATS', 'RECOMMENDATIONS'].includes(widget.type) && (
                    <div className="h-32 flex items-center justify-center">
                      <p className="text-gray-500">Obsah widgetu {widget.type}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Empty state */}
        {widgets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-1 md:col-span-3 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Žiadne widgety</h3>
            <p className="text-gray-500 text-center mb-4">Váš dashboard je prázdny. Pridajte widgety pre zobrazenie relevantných informácií.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddWidget}
              disabled={isLoading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg disabled:opacity-50"
            >
              {isLoading ? 'Pridávam...' : 'Pridať prvý widget'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EnhancedAdaptiveDashboard;
