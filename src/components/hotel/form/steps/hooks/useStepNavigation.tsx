
import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../formSchema';
import { Step } from '../types';
import { useStepValidation } from './useStepValidation';

interface UseStepNavigationProps {
  form: UseFormReturn<FormValues>;
  steps: Step[];
}

export const useStepNavigation = ({ form, steps }: UseStepNavigationProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState<boolean[]>([]);
  
  // Initialize visited steps array
  useEffect(() => {
    const initialVisitedSteps = Array(steps.length).fill(false);
    // Mark the first two steps as visited for validation purposes
    initialVisitedSteps[0] = true;
    initialVisitedSteps[1] = true;
    setVisitedSteps(initialVisitedSteps);
  }, [steps.length]);

  const { stepsValidity, validateSteps } = useStepValidation({
    form,
    steps,
    visitedSteps,
  });

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      // Mark the next step as visited
      setVisitedSteps(prev => {
        const newVisited = [...prev];
        newVisited[currentStepIndex + 1] = true;
        return newVisited;
      });
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (index: number) => {
    // Mark this step and all steps before it as visited
    setVisitedSteps(prev => {
      const newVisited = [...prev];
      // Mark all steps up to and including the target step as visited
      for (let i = 0; i <= index; i++) {
        newVisited[i] = true;
      }
      return newVisited;
    });
    
    // Immediately validate all visited steps to update status indicators
    validateSteps(index);
    setCurrentStepIndex(index);
  };

  const isLastStep = currentStepIndex === steps.length - 1;
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
