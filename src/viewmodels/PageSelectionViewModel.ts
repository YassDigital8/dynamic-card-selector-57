
import { useState, useCallback, useEffect } from 'react';
import { SelectionStep } from '../models/PageModel';
import useAuthentication from '../hooks/useAuthentication';

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
  // Get authentication token
  const { authToken } = useAuthentication();
  
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
  const fetchPOSOptions = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // API call with timeout to prevent long waits
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch('https://staging.sa3d.online:7036/POS', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Error fetching POS options: ${response.status}`);
      }
      
      const data: POSOption[] = await response.json();
      
      if (data.length === 0) {
        throw new Error('API returned empty POS options');
      }
      
      setPosOptions(data);
    } catch (err) {
      console.error('Failed to fetch POS options:', err);
      setPosOptions([]);
      setError(err instanceof Error 
        ? `API Connection Error: ${err.message}` 
        : 'API Connection Error: Unable to fetch POS options');
    } finally {
      setLoading(false);
    }
  }, [authToken]);
  
  // Only fetch when we have an auth token
  useEffect(() => {
    if (authToken) {
      fetchPOSOptions();
    }
  }, [authToken, fetchPOSOptions]);

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
    
    // API actions
    refreshPOSOptions: fetchPOSOptions,
    
    // Flow control
    resetSelections
  };
}
