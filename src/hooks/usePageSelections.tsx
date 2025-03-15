
import { useState, useCallback } from 'react';

// Define the flow steps
export type SelectionStep = 'pos' | 'language' | 'options';

export function usePageSelections() {
  // Base state selections
  const [selectedPOS, setSelectedPOS] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  
  // Flow control state
  const [currentStep, setCurrentStep] = useState<SelectionStep>('pos');
  const [showingOptions, setShowingOptions] = useState(false);
  
  const posOptions = ['SY', 'UAE', 'KWI'];
  const languageOptions = ['English', 'Arabic'];

  // Flow control methods
  const handlePOSSelection = useCallback((pos: string) => {
    setSelectedPOS(pos);
    setCurrentStep('language');
  }, []);

  const handleLanguageSelection = useCallback((language: string) => {
    setSelectedLanguage(language);
    setCurrentStep('options');
    setShowingOptions(true);
  }, []);

  // Reset flow
  const resetSelections = useCallback(() => {
    setSelectedPOS('');
    setSelectedLanguage('');
    setCurrentStep('pos');
    setShowingOptions(false);
  }, []);

  return {
    // State
    selectedPOS,
    selectedLanguage,
    currentStep,
    showingOptions,
    posOptions,
    languageOptions,
    
    // Selection setters
    setSelectedPOS: handlePOSSelection,
    setSelectedLanguage: handleLanguageSelection,
    setCurrentStep,
    setShowingOptions,
    
    // Flow control
    resetSelections
  };
}
