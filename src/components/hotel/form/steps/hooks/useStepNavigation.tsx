
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
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0); // Initialize to first step
  const [visitedSteps, setVisitedSteps] = useState<boolean[]>([]);
  
  // Initialize visited steps array when steps are available
  useEffect(() => {
    if (steps && steps.length > 0) {
      // Initialize all as false
      const initialVisitedSteps = Array(steps.length).fill(false);
      // Mark only the first step (Basic Info) as visited by default
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
      validateSteps(0); // Only validate the first step initially
    }
  }, [visitedSteps, validateSteps, steps]);

  // Force revalidation of steps when form values change
  useEffect(() => {
    const subscription = form.watch(() => {
      // Validate all visited steps
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

  const goToNextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      // Mark the next step as visited
      setVisitedSteps(prev => {
        if (!prev || prev.length === 0) {
          return Array(steps.length).fill(false).map((_, i) => i <= currentStepIndex + 1);
        }
        
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
  }, [currentStepIndex, steps.length, validateSteps]);

  const goToPreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      console.log(`Moving to previous step: ${currentStepIndex - 1}`);
      setCurrentStepIndex(currentStepIndex - 1);
    }
  }, [currentStepIndex]);

  const goToStep = useCallback((index: number) => {
    if (steps && steps.length > 0 && index >= 0 && index < steps.length) {
      // Mark this step and all steps before it as visited
      setVisitedSteps(prev => {
        if (!prev || prev.length === 0) {
          return Array(steps.length).fill(false).map((_, i) => i <= index);
        }
        
        const newVisited = [...prev];
        // Mark all steps up to and including the target step as visited
        for (let i = 0; i <= index; i++) {
          newVisited[i] = true;
        }
        return newVisited;
      });
      
      console.log(`Jumping to step: ${index}`);
      
      // Immediately validate all visited steps to update status indicators
      validateSteps(index);
      setCurrentStepIndex(index);
    } else {
      console.error(`Invalid step index: ${index}. Valid range is 0-${(steps && steps.length > 0) ? steps.length - 1 : 'undefined'}`);
    }
  }, [validateSteps, steps]);

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
