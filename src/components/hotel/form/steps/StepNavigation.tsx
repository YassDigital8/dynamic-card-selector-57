
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

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
    <div className="flex justify-between pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep}
        className="border-blue-200 dark:border-blue-800"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      
      <div className="flex gap-2">
        {isLastStep ? (
          <Button 
            type="button" 
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Hotel"}
          </Button>
        ) : (
          <Button 
            type="button" 
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepNavigation;
