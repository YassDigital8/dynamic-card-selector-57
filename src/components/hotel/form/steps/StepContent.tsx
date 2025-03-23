
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useContentAnimations from '@/components/hotel/layout/content/useContentAnimations';

interface StepContentProps {
  currentStepIndex: number;
  stepLabel: string;
  children: React.ReactNode;
}

const StepContent: React.FC<StepContentProps> = ({ 
  currentStepIndex, 
  stepLabel, 
  children 
}) => {
  const { contentVariants } = useContentAnimations();

  // Determine if this step is in the hotel details section (second half of steps)
  const isHotelDetailsSection = currentStepIndex >= 3; // Typically steps 4+ are hotel details

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStepIndex}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={contentVariants}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        <div className={`rounded-lg border p-6 bg-card shadow-sm ${isHotelDetailsSection ? 'border-blue-100 dark:border-blue-900' : ''}`}>
          <h2 className={`text-xl font-semibold mb-6 flex items-center ${isHotelDetailsSection ? 'text-indigo-600 dark:text-indigo-400' : 'text-blue-600 dark:text-blue-400'}`}>
            <span className={`w-8 h-8 rounded-full inline-flex items-center justify-center mr-4 text-sm shadow-sm text-white ${isHotelDetailsSection ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-blue-600 dark:bg-blue-500'}`}>
              {currentStepIndex + 1}
            </span>
            {stepLabel}
          </h2>
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StepContent;
