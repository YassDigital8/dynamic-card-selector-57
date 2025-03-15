
import { useState, useEffect, useCallback } from 'react';

interface TourState {
  showTour: boolean;
  currentStep: number;
  completedTours: string[];
  isActive: boolean;
}

// Helper function to get initial tour state from localStorage
const getInitialTourState = (): TourState => {
  const savedState = localStorage.getItem('tour-guide-state');
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    showTour: true,
    currentStep: 0,
    completedTours: [],
    isActive: true
  };
};

// Helper function to save tour state to localStorage
const saveTourState = (state: TourState): void => {
  localStorage.setItem('tour-guide-state', JSON.stringify(state));
};

export const useTourGuide = (tourId: string) => {
  const [tourState, setTourState] = useState<TourState>(getInitialTourState);

  // Check if this specific tour has been completed
  const isTourCompleted = tourState.completedTours.includes(tourId);
  
  // Effect to initialize tour if not completed
  useEffect(() => {
    if (!isTourCompleted) {
      setTourState(prev => ({ ...prev, showTour: true, isActive: true }));
    }
  }, [isTourCompleted]);

  // Effect to save state changes to localStorage
  useEffect(() => {
    saveTourState(tourState);
  }, [tourState]);

  // Tour navigation actions
  const nextStep = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }));
  }, []);

  const prevStep = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1)
    }));
  }, []);

  // Tour control actions
  const closeTour = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      showTour: false,
      currentStep: 0,
      isActive: false,
      completedTours: [...prev.completedTours, tourId]
    }));
  }, [tourId]);

  const resetTour = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      showTour: true,
      currentStep: 0,
      isActive: true,
      completedTours: prev.completedTours.filter(id => id !== tourId)
    }));
  }, [tourId]);

  // Tour activity state control
  const pauseTour = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      isActive: false
    }));
  }, []);

  const resumeTour = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      isActive: true
    }));
  }, []);

  return {
    showTour: tourState.showTour && !isTourCompleted,
    currentStep: tourState.currentStep,
    isActive: tourState.isActive,
    nextStep,
    prevStep,
    closeTour,
    resetTour,
    pauseTour,
    resumeTour
  };
};
