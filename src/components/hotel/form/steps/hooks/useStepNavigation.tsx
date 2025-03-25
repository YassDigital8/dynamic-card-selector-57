
import { useState, useEffect, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../formSchema';
import { Step } from '../types';
import { useStepValidation } from './useStepValidation';

interface UseStepNavigationProps {
  form: UseFormReturn<FormValues>;
  steps: Step[];
}

export const useStepNavigation = ({ form, steps }: UseStepNavigationProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [visitedSteps, setVisitedSteps] = useState<boolean[]>([]);
  
  // Initialize visited steps array
  useEffect(() => {
    if (steps && steps.length > 0) {
      const initialVisitedSteps = Array(steps.length).fill(false);
      initialVisitedSteps[0] = true;
      setVisitedSteps(initialVisitedSteps);
      
      console.log("Initialized visited steps:", initialVisitedSteps);
    }
  }, [steps]);

  const { stepsValidity, validateSteps } = useStepValidation({
    form,
    steps,
    visitedSteps,
  });

  // Validate initially visited steps
  useEffect(() => {
    if (visitedSteps && visitedSteps.some(visited => visited) && steps && steps.length > 0) {
      validateSteps(0);
    }
  }, [visitedSteps, validateSteps, steps]);

  // Force revalidation of steps when form values change
  useEffect(() => {
    const subscription = form.watch(() => {
      if (visitedSteps && steps && steps.length > 0) {
        const visitedIndices = visitedSteps
          .map((visited, index) => visited ? index : -1)
          .filter(index => index !== -1);
        
        if (visitedIndices.length > 0) {
          const maxVisitedIndex = Math.max(...visitedIndices);
          validateSteps(maxVisitedIndex);
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, visitedSteps, validateSteps, steps]);

  // Navigation functions
  const goToNextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      // Check if current step is valid before proceeding
      const isCurrentStepValid = stepsValidity[currentStepIndex];
      
      if (!isCurrentStepValid) {
        console.log(`Cannot proceed: Step ${currentStepIndex} (${steps[currentStepIndex]?.label}) is not valid`);
        return;
      }
      
      // Mark the next step as visited
      setVisitedSteps(prev => {
        const newVisited = [...prev];
        newVisited[currentStepIndex + 1] = true;
        return newVisited;
      });
      
      console.log(`Moving to next step: ${currentStepIndex + 1}`);
      
      setCurrentStepIndex(currentStepIndex + 1);
      
      // Validate the new step after moving
      setTimeout(() => {
        validateSteps(currentStepIndex + 1);
      }, 10);
    }
  }, [currentStepIndex, steps, stepsValidity, validateSteps]);

  const goToPreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      console.log(`Moving to previous step: ${currentStepIndex - 1}`);
      setCurrentStepIndex(currentStepIndex - 1);
    }
  }, [currentStepIndex]);

  const goToStep = useCallback((index: number) => {
    if (steps && steps.length > 0 && index >= 0 && index < steps.length) {
      // Check if any steps between current and target are invalid
      if (index > currentStepIndex) {
        for (let i = 0; i <= currentStepIndex; i++) {
          if (!stepsValidity[i]) {
            console.log(`Cannot jump to step ${index}: Step ${i} (${steps[i]?.label}) is not valid`);
            return;
          }
        }
      }
      
      // Mark this step and all steps before it as visited
      setVisitedSteps(prev => {
        const newVisited = [...prev];
        for (let i = 0; i <= index; i++) {
          newVisited[i] = true;
        }
        return newVisited;
      });
      
      console.log(`Jumping to step: ${index}`);
      
      validateSteps(index);
      setCurrentStepIndex(index);
    } else {
      console.error(`Invalid step index: ${index}. Valid range is 0-${(steps && steps.length > 0) ? steps.length - 1 : 'undefined'}`);
    }
  }, [validateSteps, steps, currentStepIndex, stepsValidity]);

  const isLastStep = currentStepIndex === (steps ? steps.length - 1 : 0);
  const isFirstStep = currentStepIndex === 0;

  return {
    currentStepIndex,
    visitedSteps,
    stepsValidity,
    isLastStep,
    isFirstStep,
    goToNextStep,
    goToPreviousStep,
    goToStep
  };
};
