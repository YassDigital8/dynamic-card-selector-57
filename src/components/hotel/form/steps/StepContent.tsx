
import React from 'react';
import { motion } from 'framer-motion';

interface StepContentProps {
  children: React.ReactNode;
  currentStepIndex: number;
  stepLabel: string;
  showStepLabel?: boolean;
}

const StepContent: React.FC<StepContentProps> = ({
  children,
  currentStepIndex,
  stepLabel,
  showStepLabel = false // Default to not showing the step label
}) => {
  return (
    <div className="mt-8">
      {showStepLabel && (
        <motion.div
          key={`step-title-${currentStepIndex}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            {stepLabel}
          </h2>
          <div className="h-1 w-20 mt-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full dark:from-blue-500 dark:to-indigo-600"></div>
        </motion.div>
      )}
      
      <motion.div
        key={`step-content-${currentStepIndex}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-800"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default StepContent;
