
import { FormValidationResult } from './types';

export const useFormValidation = () => {
  const validateFormSteps = (stepsValidity?: boolean[]): FormValidationResult => {
    if (!stepsValidity) {
      return { isValid: true };
    }
    
    const invalidStepIndex = stepsValidity.findIndex(valid => valid === false);
    
    if (invalidStepIndex !== -1) {
      console.log("Invalid step found at index:", invalidStepIndex);
      return {
        isValid: false,
        invalidStepIndex
      };
    }
    
    return { isValid: true };
  };

  return { validateFormSteps };
};
