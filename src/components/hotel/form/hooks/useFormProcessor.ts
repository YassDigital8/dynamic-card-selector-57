
import { FormProcessorProps } from './types';
import { useFormValidation } from './useFormValidation';
import { useFormNotification } from './useFormNotification';

export const useFormProcessor = ({ 
  form, 
  onSubmit,
  stepsValidity,
  goToStep
}: FormProcessorProps) => {
  const { validateFormSteps } = useFormValidation();
  const { showIncompleteFormError, showSuccessNotification } = useFormNotification();
  
  const handleSubmit = (data: any) => {
    console.log("Handling form submission. Steps validity:", stepsValidity);
    
    // Validate steps if we have validation info
    const validationResult = validateFormSteps(stepsValidity);
    
    if (!validationResult.isValid && goToStep && validationResult.invalidStepIndex !== undefined) {
      // Show error toast about incomplete steps
      showIncompleteFormError();
      
      // Navigate to the first invalid step
      goToStep(validationResult.invalidStepIndex);
      return;
    }
    
    // If all steps are valid, or if we don't have validation info, proceed with submission
    console.log('Form data before submission:', data);
    
    // Show success notification
    showSuccessNotification("Form Ready for Submission", "Your hotel information is complete and ready to be submitted.");
    
    onSubmit(data);
  };

  return { handleSubmit };
};
