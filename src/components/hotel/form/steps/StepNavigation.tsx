
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface StepNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  isCurrentStepValid?: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ 
  isFirstStep, 
  isLastStep, 
  onPrevious, 
  onNext, 
  onSubmit,
  isLoading,
  isCurrentStepValid = false
}) => {
  const form = useFormContext();
  
  // Modified to check form validity before proceeding
  const handleNext = async () => {
    // Only proceed if the current step is valid
    if (isCurrentStepValid) {
      console.log("Current step is valid, proceeding to next step");
      onNext();
    } else {
      console.log("Cannot proceed: current step is invalid");
    }
  };
  
  return (
    <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep || isLoading}
        className="border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      
      <div className="flex gap-2">
        {isLastStep ? (
          <Button 
            type="button" 
            onClick={onSubmit}
            disabled={isLoading || !isCurrentStepValid}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Check className="mr-2 h-4 w-4" />
            {isLoading ? 'Saving...' : 'Save Hotel'}
          </Button>
        ) : (
          <Button 
            type="button" 
            onClick={handleNext}
            disabled={isLoading || !isCurrentStepValid}
            className={`bg-gradient-to-r ${isCurrentStepValid 
              ? 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
              : 'from-gray-400 to-gray-500 cursor-not-allowed'}`}
          >
            Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepNavigation;
