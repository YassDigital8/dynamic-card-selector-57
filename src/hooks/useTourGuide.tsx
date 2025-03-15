
import { useState, useEffect } from 'react';

interface TourState {
  showTour: boolean;
  currentStep: number;
  completedTours: string[];
}

export const useTourGuide = (tourId: string) => {
  const [tourState, setTourState] = useState<TourState>(() => {
    // Initialize from localStorage if available
    const savedState = localStorage.getItem('tour-guide-state');
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {
      showTour: true,
      currentStep: 0,
      completedTours: []
    };
  });

  // Check if this specific tour has been completed
  const isTourCompleted = tourState.completedTours.includes(tourId);
  
  // Set showTour based on whether this tour has been completed
  useEffect(() => {
    if (!isTourCompleted) {
      setTourState(prev => ({ ...prev, showTour: true }));
    }
  }, [isTourCompleted]);

  // Save tour state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tour-guide-state', JSON.stringify(tourState));
  }, [tourState]);

  const nextStep = () => {
    setTourState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }));
  };

  const prevStep = () => {
    setTourState(prev => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1)
    }));
  };

  const closeTour = () => {
    setTourState(prev => ({
      ...prev,
      showTour: false,
      currentStep: 0,
      completedTours: [...prev.completedTours, tourId]
    }));
  };

  const resetTour = () => {
    setTourState(prev => ({
      ...prev,
      showTour: true,
      currentStep: 0,
      completedTours: prev.completedTours.filter(id => id !== tourId)
    }));
  };

  return {
    showTour: tourState.showTour && !isTourCompleted,
    currentStep: tourState.currentStep,
    nextStep,
    prevStep,
    closeTour,
    resetTour
  };
};
