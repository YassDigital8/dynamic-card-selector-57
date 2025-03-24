
import React, { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './formSchema';
import { StepTabs, StepContent, StepNavigation, useSteps } from './steps';

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
    if (onStepsValidityChange) {
      onStepsValidityChange(stepsValidity);
    }
  }, [stepsValidity, onStepsValidityChange]);

  // Pass goToStep function to parent
  useEffect(() => {
    if (onGoToStepChange) {
      onGoToStepChange(goToStep);
    }
  }, [goToStep, onGoToStepChange]);

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
        stepLabel={steps[currentStepIndex].label}
        showStepLabel={false} // Set to false to hide the repeated step label
      >
        {steps[currentStepIndex].component}
      </StepContent>

      <StepNavigation
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default StepBasedForm;
