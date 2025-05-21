import React from 'react';
import { motion } from 'framer-motion';

interface DashboardWidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onEdit?: () => void;
  onRemove?: () => void;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  children,
  className = '',
  onEdit,
  onRemove,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg shadow-soft overflow-hidden ${className}`}
      layout
    >
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Upraviť widget"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Odstrániť widget"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  );
};

export default DashboardWidget;
