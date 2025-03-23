
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStepIndex}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={contentVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="rounded-lg border p-6 bg-card">
          <h2 className="text-xl font-semibold mb-6 text-blue-600 dark:text-blue-400 flex items-center">
            <span className="bg-blue-600 dark:bg-blue-500 text-white w-7 h-7 rounded-full inline-flex items-center justify-center mr-2 text-sm">
              {currentStepIndex + 1}
            </span>
            {stepLabel}
          </h2>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StepContent;
