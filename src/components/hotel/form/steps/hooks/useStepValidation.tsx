
import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../formSchema';
import { Step } from '../types';

interface UseStepValidationProps {
  form: UseFormReturn<FormValues>;
  steps: Step[];
  visitedSteps: boolean[];
}

export const useStepValidation = ({ form, steps, visitedSteps }: UseStepValidationProps) => {
  const [stepsValidity, setStepsValidity] = useState<boolean[]>([]);

  // Initialize steps validity array
  useEffect(() => {
    setStepsValidity(Array(steps.length).fill(false));
  }, [steps.length]);

  // Function to validate a specific step
  const validateStep = (step: Step, formValues: FormValues, index: number): boolean => {
    // If using custom validation
    if (step.customValidation) {
      return step.customValidation(formValues);
    }
    
    // If no validation fields specified and no custom validation, step is always valid
    if (!step.validationFields || step.validationFields.length === 0) {
      return true;
    }
    
    // Check if all required fields for this step have values
    return step.validationFields.every(field => {
      const fieldValue = field.includes('.') 
        ? form.getValues(field as any) 
        : form.getValues()[field as keyof FormValues];
        
      if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
        return false;
      }
      
      return true;
    });
  };

  // Update step validity whenever form values change
  useEffect(() => {
    const subscription = form.watch((formValues) => {
      const formData = form.getValues();
      
      // Validate all visited steps
      const newStepsValidity = steps.map((step, index) => {
        // Always validate the first few steps regardless of visit status
        // This ensures proper display in the UI
        if (index <= 1 || visitedSteps[index]) {
          return validateStep(step, formData, index);
        }
        
        return stepsValidity[index];
      });
      
      setStepsValidity(newStepsValidity);
    });
    
    return () => subscription.unsubscribe();
  }, [form, steps, visitedSteps, stepsValidity]);

  // Function to validate multiple steps at once (used when jumping to a step)
  const validateSteps = (upToIndex: number) => {
    const formData = form.getValues();
    const newStepsValidity = steps.map((step, stepIndex) => {
      if (stepIndex <= upToIndex) {
        return validateStep(step, formData, stepIndex);
      }
      return stepsValidity[stepIndex];
    });
    
    setStepsValidity(newStepsValidity);
    return newStepsValidity;
  };

  return {
    stepsValidity,
    setStepsValidity,
    validateStep,
    validateSteps
  };
};
