
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Step } from './useSteps';

interface StepTabsProps {
  steps: Step[];
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  stepsValidity: boolean[];
  visitedSteps: boolean[]; // Add this new prop
}

const StepTabs: React.FC<StepTabsProps> = ({
  steps,
  currentStepIndex,
  onStepChange,
  stepsValidity,
  visitedSteps
}) => {
  return (
    <div className="relative">
      <div className="absolute h-0.5 top-1/2 left-0 transform -translate-y-1/2 w-full bg-gray-200 dark:bg-gray-700 -z-10"></div>
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          // Only show completion status for steps that have been visited
          const isVisited = visitedSteps[index];
          
          // A step is completed if it's been visited and all validation criteria are met
          const isCompleted = isVisited && stepsValidity[index];
          
          // A step has an error if it's been visited but doesn't meet validation criteria
          const hasError = isVisited && !stepsValidity[index];
          
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepChange(index)}
              className={cn(
                "flex flex-col items-center space-y-1 relative"
              )}
            >
              <motion.div
                className={cn(
                  "flex items-center justify-center rounded-full w-8 h-8 text-xs font-medium transition-colors z-10",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : hasError
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : hasError ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </motion.div>
              <span
                className={cn(
                  "text-xs whitespace-nowrap",
                  isActive
                    ? "text-blue-600 font-medium dark:text-blue-400"
                    : hasError
                    ? "text-red-500 dark:text-red-400"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                {step.label}
              </span>
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  layoutId="activeStep"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepTabs;
