
import { useState, useCallback, useEffect } from 'react';
import { SelectionStep } from '../models/PageModel';

interface POSOption {
  id: number;
  key: string;
  arabicName: string;
  englishName: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string | null;
  modifiedBy: string | null;
}

export function usePageSelectionViewModel() {
  // Base state selections
  const [selectedPOS, setSelectedPOS] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  
  // Flow control state
  const [currentStep, setCurrentStep] = useState<SelectionStep>('pos');
  const [showingOptions, setShowingOptions] = useState(false);
  
  // Data state
  const [posOptions, setPosOptions] = useState<POSOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const languageOptions = ['English', 'Arabic'];

  // Fetch POS options from API
  useEffect(() => {
    const fetchPOSOptions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://your-api-endpoint.com/api/pos');
        
        if (!response.ok) {
          throw new Error(`Error fetching POS options: ${response.status}`);
        }
        
        const data: POSOption[] = await response.json();
        setPosOptions(data);
      } catch (err) {
        console.error('Failed to fetch POS options:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        // Fallback to default values in case of API failure
        setPosOptions([
          { id: 1, key: 'SY', englishName: 'Syria', arabicName: 'سوريا', createdDate: '', createdBy: '', modifiedDate: null, modifiedBy: null },
          { id: 2, key: 'UAE', englishName: 'UAE', arabicName: 'الإمارات', createdDate: '', createdBy: '', modifiedDate: null, modifiedBy: null },
          { id: 3, key: 'KWI', englishName: 'Kuwait', arabicName: 'الكويت', createdDate: '', createdBy: '', modifiedDate: null, modifiedBy: null }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPOSOptions();
  }, []);

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
    loading,
    error,
    
    // Selection setters
    setSelectedPOS: handlePOSSelection,
    setSelectedLanguage: handleLanguageSelection,
    setCurrentStep,
    setShowingOptions,
    
    // Flow control
    resetSelections
  };
}
