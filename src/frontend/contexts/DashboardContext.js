import { createContext, useContext, useState, useEffect } from 'react';
import { widgetService } from '../services/api';
import { useAuth } from './AuthContext';

// Create dashboard context
const DashboardContext = createContext();

// Dashboard provider component
export const DashboardProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load widgets when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadWidgets();
    }
  }, [isAuthenticated]);

  // Load widgets
  const loadWidgets = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const widgetsData = await widgetService.getWidgets();
      setWidgets(widgetsData);
    } catch (err) {
      console.error('Load widgets error:', err);
      setError('Failed to load widgets');
    } finally {
      setLoading(false);
    }
  };

  // Create widget
  const createWidget = async (widgetData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newWidget = await widgetService.createWidget(widgetData);
      setWidgets([...widgets, newWidget]);
      return newWidget;
    } catch (err) {
      console.error('Create widget error:', err);
      setError('Failed to create widget');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update widget
  const updateWidget = async (id, widgetData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedWidget = await widgetService.updateWidget(id, widgetData);
      setWidgets(widgets.map(widget => widget.id === id ? updatedWidget : widget));
      return updatedWidget;
    } catch (err) {
      console.error('Update widget error:', err);
      setError('Failed to update widget');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete widget
  const deleteWidget = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await widgetService.deleteWidget(id);
      if (result) {
        setWidgets(widgets.filter(widget => widget.id !== id));
      }
      return result;
    } catch (err) {
      console.error('Delete widget error:', err);
      setError('Failed to delete widget');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update widget positions
  const updateWidgetPositions = async (updatedWidgets) => {
    setLoading(true);
    setError(null);
    
    try {
      // Update widgets in state immediately for better UX
      setWidgets(updatedWidgets);
      
      // Update each widget position in the backend
      const updatePromises = updatedWidgets.map(widget => 
        widgetService.updateWidget(widget.id, { position: widget.position })
      );
      
      await Promise.all(updatePromises);
      return true;
    } catch (err) {
      console.error('Update widget positions error:', err);
      setError('Failed to update widget positions');
      
      // Reload widgets to restore correct state
      await loadWidgets();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh dashboard data
  const refreshDashboard = async () => {
    await loadWidgets();
  };

  // Context value
  const value = {
    widgets,
    loading,
    error,
    createWidget,
    updateWidget,
    deleteWidget,
    updateWidgetPositions,
    refreshDashboard
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

// Custom hook to use dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  
  return context;
};
