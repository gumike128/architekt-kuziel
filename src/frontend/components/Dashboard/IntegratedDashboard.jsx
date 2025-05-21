import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAI } from '../contexts/AIContext';
import { useContent } from '../contexts/ContentContext';
import { useDashboard } from '../contexts/DashboardContext';
import UniversalPrompt from '../components/UniversalPrompt/UniversalPrompt';
import AdaptiveDashboard from '../components/Dashboard/AdaptiveDashboard';
import MainLayout from '../components/Layout/MainLayout';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import PredictiveEngineComponent from '../components/AI/PredictiveEngineComponent';

// Integration component that connects all parts of the application
const IntegratedDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { promptSuggestions, getPromptSuggestions, recommendations } = useAI();
  const { contents, refreshContentData } = useContent();
  const { widgets, createWidget, updateWidget, deleteWidget, updateWidgetPositions } = useDashboard();
  
  // Sample interactions for demonstration
  const sampleInteractions = [
    { type: 'VIEW', contentId: '1', contentTitle: 'Marketingová stratégia 2025', timestamp: new Date().toISOString() },
    { type: 'EDIT', contentId: '2', contentTitle: 'Finančná analýza Q1', timestamp: new Date().toISOString() },
    { type: 'SHARE', contentId: '1', contentTitle: 'Marketingová stratégia 2025', timestamp: new Date().toISOString() }
  ];

  // Handle prompt submission
  const handlePromptSubmit = async (input) => {
    console.log('Prompt submitted:', input);
    
    // In a real implementation, this would process the input and perform actions
    // For now, just refresh the prompt suggestions
    await getPromptSuggestions(input);
  };

  // Handle widget operations
  const handleAddWidget = async () => {
    const newWidget = {
      title: 'Nový widget',
      type: 'RECENT_ACTIVITY',
      size: 'MEDIUM',
      position: widgets.length,
      config: JSON.stringify({ autoRefresh: true })
    };
    
    await createWidget(newWidget);
  };

  // Handle predictions from the predictive engine
  const handlePredictions = (predictions) => {
    console.log('Received predictions:', predictions);
    // In a real implementation, this would use the predictions to update the UI
  };

  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar />}
      footer={
        <div className="p-4 text-center text-sm text-gray-500">
          © 2025 Architekt kúziel. Všetky práva vyhradené.
        </div>
      }
    >
      <div className="max-w-7xl mx-auto space-y-8 p-4">
        {/* Universal Prompt with AI suggestions */}
        <div className="mb-8">
          <UniversalPrompt
            onSubmit={handlePromptSubmit}
            suggestions={promptSuggestions}
            placeholder="Čo by ste chceli dnes urobiť?"
          />
        </div>

        {/* Predictive Engine (hidden, but providing data) */}
        <PredictiveEngineComponent
          user={user}
          recentInteractions={sampleInteractions}
          onPredictionsGenerated={handlePredictions}
          showVisualOutput={false}
        />

        {/* Adaptive Dashboard with widgets */}
        <AdaptiveDashboard
          initialWidgets={widgets}
          onAddWidget={handleAddWidget}
          onUpdateWidget={updateWidget}
          onDeleteWidget={deleteWidget}
          onUpdatePositions={updateWidgetPositions}
        />

        {/* Content Recommendations from AI */}
        {recommendations && recommendations.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Odporúčaný obsah</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((recommendation, index) => (
                <div 
                  key={`recommendation-${index}`}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-gray-800">{recommendation.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{recommendation.reason}</p>
                  <div className="mt-2 text-right">
                    <span className="text-xs text-gray-400">{Math.round(recommendation.relevanceScore * 100)}% relevantné</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default IntegratedDashboard;
