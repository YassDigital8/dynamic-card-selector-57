
import React, { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './formSchema';
import { StepTabs, StepContent, StepNavigation, useSteps } from './steps';
import { Toaster } from '@/components/ui/toaster';

interface StepBasedFormProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
  onSubmit: () => void;
  isLoading: boolean;
  onStepsValidityChange?: (validity: boolean[]) => void;
  onGoToStepChange?: (goToStep: (index: number) => void) => void;
}

const StepBasedForm: React.FC<StepBasedFormProps> = ({ 
  form, 
  hotelId, 
  onSubmit,
  isLoading,
  onStepsValidityChange,
  onGoToStepChange
}) => {
  const { 
    steps, 
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    stepsValidity,
    visitedSteps
  } = useSteps({ form, hotelId });

  // Pass step validation status to parent component when it changes
  useEffect(() => {
    if (onStepsValidityChange && stepsValidity) {
      console.log("Passing steps validity to parent:", stepsValidity);
      onStepsValidityChange(stepsValidity);
    }
  }, [stepsValidity, onStepsValidityChange]);

  // Pass goToStep function to parent
  useEffect(() => {
    if (onGoToStepChange && goToStep) {
      console.log("Passing goToStep function to parent");
      onGoToStepChange(goToStep);
    }
  }, [goToStep, onGoToStepChange]);

  // Safety check: If steps are not yet loaded, render a loading state
  if (!steps || steps.length === 0 || currentStepIndex === undefined || currentStepIndex < 0) {
    return <div className="p-4 text-center">Loading form steps...</div>;
  }

  // Additional safety check for the current step
  const currentStep = steps[currentStepIndex];
  if (!currentStep) {
    console.error(`Invalid step index: ${currentStepIndex}, total steps: ${steps.length}`);
    return <div className="p-4 text-center text-red-500">Error loading form. Please try again.</div>;
  }

  return (
    <div className="space-y-8">
      <StepTabs
        steps={steps}
        currentStepIndex={currentStepIndex}
        onStepChange={goToStep}
        stepsValidity={stepsValidity}
        visitedSteps={visitedSteps}
      />

      <StepContent
        currentStepIndex={currentStepIndex}
        stepLabel={currentStep.label}
        showStepLabel={false}
      >
        {currentStep.component}
      </StepContent>

      <StepNavigation
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      
      {/* Add Toaster to ensure notifications are displayed */}
      <Toaster />
    </div>
  );
};

export default StepBasedForm;
