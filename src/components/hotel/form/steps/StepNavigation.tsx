
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save, Loader2 } from 'lucide-react';

interface StepNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
  onSubmit,
  isLoading
}) => {
  return (
    <motion.div 
      className="flex justify-between mt-8 pt-4 border-t border-gray-100 dark:border-gray-800"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep || isLoading}
        className="flex items-center gap-1 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <ArrowLeft className="w-4 h-4" />
        Previous
      </Button>
      
      <div className="flex items-center gap-2">
        {isLastStep ? (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200 dark:from-blue-600 dark:to-indigo-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1" />
                Save Hotel
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next Step
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default StepNavigation;
