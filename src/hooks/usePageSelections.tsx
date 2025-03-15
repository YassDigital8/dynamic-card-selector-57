
import { useState } from 'react';

export function usePageSelections() {
  const [selectedPOS, setSelectedPOS] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  
  const posOptions = ['SY', 'UAE', 'KWI'];
  const languageOptions = ['English', 'Arabic'];

  return {
    selectedPOS,
    setSelectedPOS,
    selectedLanguage,
    setSelectedLanguage,
    posOptions,
    languageOptions
  };
}

