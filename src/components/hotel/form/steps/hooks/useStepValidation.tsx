
import { useState, useEffect, useCallback } from 'react';
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
    if (steps.length > 0) {
      setStepsValidity(Array(steps.length).fill(false));
    }
  }, [steps.length]);

  // Function to validate a specific step
  const validateStep = useCallback((step: Step, formValues: FormValues, index: number): boolean => {
    if (!step) return false;
    
    // If using custom validation
    if (step.customValidation) {
      const isValid = step.customValidation(formValues);
      console.log(`Custom validation for step ${index} (${step.label}):`, isValid);
      return isValid;
    }
    
    // If no validation fields specified and no custom validation, step is always valid
    if (!step.validationFields || step.validationFields.length === 0) {
      return true;
    }
    
    // Check if all required fields for this step have values
    const isValid = step.validationFields.every(field => {
      const fieldValue = field.includes('.') 
        ? form.getValues(field as any) 
        : form.getValues()[field as keyof FormValues];
        
      if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
        return false;
      }
      
      return true;
    });

    console.log(`Standard validation for step ${index} (${step.label}):`, isValid);
    return isValid;
  }, [form]);

  // Update step validity whenever form values change
  const updateStepsValidity = useCallback(() => {
    if (!steps || steps.length === 0) {
      console.log("No steps to validate");
      return [];
    }
    
    const formData = form.getValues();
    console.log("Form values changed, revalidating steps");
    
    // Validate all visited steps
    const newStepsValidity = steps.map((step, index) => {
      // If the step hasn't been visited yet, don't validate it
      if (!visitedSteps[index]) {
        return false;
      }
      
      return validateStep(step, formData, index);
    });
    
    console.log("Updated steps validity:", newStepsValidity);
    setStepsValidity(newStepsValidity);
    return newStepsValidity;
  }, [form, steps, visitedSteps, validateStep]);

  // Immediately validate steps when they're marked as visited
  useEffect(() => {
    if (visitedSteps && visitedSteps.some(visited => visited) && steps && steps.length > 0) {
      updateStepsValidity();
    }
  }, [visitedSteps, updateStepsValidity, steps]);

  // Update step validity whenever form values change
  useEffect(() => {
    const subscription = form.watch(() => {
      updateStepsValidity();
    });
    
    return () => subscription.unsubscribe();
  }, [form, updateStepsValidity]);

  // Function to validate multiple steps at once (used when jumping to a step)
  const validateSteps = useCallback((upToIndex: number) => {
    if (!steps || steps.length === 0) {
      console.log("No steps to validate");
      return [];
    }
    
    const formData = form.getValues();
    console.log(`Validating steps up to index ${upToIndex}`);
    
    const newStepsValidity = steps.map((step, stepIndex) => {
      if (stepIndex <= upToIndex && visitedSteps[stepIndex]) {
        return validateStep(step, formData, stepIndex);
      }
      return stepsValidity[stepIndex] || false;
    });
    
    console.log("Validation result:", newStepsValidity);
    setStepsValidity(newStepsValidity);
    return newStepsValidity;
  }, [form, steps, stepsValidity, visitedSteps, validateStep]);

  return {
    stepsValidity,
    setStepsValidity,
    validateStep,
    validateSteps
  };
};
