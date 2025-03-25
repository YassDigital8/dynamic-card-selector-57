
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, XCircle, AlertCircle } from 'lucide-react';
import { Step } from './types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StepTabsProps {
  steps: Step[];
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  stepsValidity: boolean[];
  visitedSteps: boolean[];
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
          const isVisited = visitedSteps[index];
          const isCompleted = isVisited && stepsValidity[index];
          // Only show error state if the step has been visited (but not active)
          // and doesn't pass validation
          const hasError = isVisited && !isActive && !stepsValidity[index];
          
          return (
            <TooltipProvider key={step.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
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
                          ? "bg-red-500 text-white ring-2 ring-red-300 ring-opacity-50"
                          : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" />
                      ) : hasError ? (
                        <XCircle className="w-4 h-4" />
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
                          ? "text-red-500 font-medium dark:text-red-400"
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
                    {hasError && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {hasError ? (
                    <div className="flex items-center gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                      <span>Missing required information</span>
                    </div>
                  ) : isCompleted ? (
                    <span>Completed</span>
                  ) : isActive ? (
                    <span>Current step</span>
                  ) : (
                    <span>Click to navigate</span>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};

export default StepTabs;
