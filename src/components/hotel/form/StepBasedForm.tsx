
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './formSchema';
import { StepTabs, StepContent, StepNavigation, useSteps } from './steps';

interface StepBasedFormProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
  onSubmit: () => void;
  isLoading: boolean;
}

const StepBasedForm: React.FC<StepBasedFormProps> = ({ 
  form, 
  hotelId, 
  onSubmit,
  isLoading
}) => {
  const { 
    steps, 
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    goToStep
  } = useSteps({ form, hotelId });

  return (
    <div className="space-y-8">
      <StepTabs
        steps={steps}
        currentStepIndex={currentStepIndex}
        onStepChange={goToStep}
      />

      <StepContent
        currentStepIndex={currentStepIndex}
        stepLabel={steps[currentStepIndex].label}
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
