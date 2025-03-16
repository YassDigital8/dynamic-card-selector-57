
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Languages } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectionStep } from '@/models/PageModel';
import { useIsMobile } from '@/hooks/use-mobile';
import { POSSelection, LanguageSelection, OptionsDisplay, SlugPath } from './pageSelector';

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

interface PageSelectorsProps {
  posOptions: POSOption[];
  languageOptions: string[];
  selectedPOS: string;
  selectedLanguage: string;
  setSelectedPOS: (value: string) => void;
  setSelectedLanguage: (value: string) => void;
  loading: boolean;
  currentStep: SelectionStep;
  error?: string | null;
  onRetry?: () => void;
}

const PageSelectors = ({
  posOptions,
  languageOptions,
  selectedPOS,
  selectedLanguage,
  setSelectedPOS,
  setSelectedLanguage,
  loading,
  currentStep,
  error,
  onRetry
}: PageSelectorsProps) => {
  const isMobile = useIsMobile();
  const selectedPOSName = posOptions.find(pos => pos.key === selectedPOS)?.englishName || selectedPOS;
  
  return (
    <Card className="shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="bg-blue-50 dark:bg-blue-900/30 border-b border-gray-200 dark:border-gray-700 p-2 sm:p-3 md:p-4">
        <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center gap-1.5 md:gap-2 text-sm sm:text-base md:text-lg">
          <Languages className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          {isMobile ? "Select Region" : "Region & Language Selection"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-3 md:p-5 space-y-3 sm:space-y-4 md:space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: POS Selection */}
          {currentStep === 'pos' && (
            <POSSelection
              posOptions={posOptions}
              selectedPOS={selectedPOS}
              setSelectedPOS={setSelectedPOS}
              loading={loading}
              error={error}
              onRetry={onRetry}
            />
          )}

          {/* Step 2: Language Selection */}
          {currentStep === 'language' && (
            <LanguageSelection
              languageOptions={languageOptions}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              selectedPOS={selectedPOS}
              posEnglishName={selectedPOSName}
            />
          )}

          {/* Step 3: Options Display */}
          {currentStep === 'options' && (
            <OptionsDisplay
              selectedPOS={selectedPOS}
              selectedLanguage={selectedLanguage}
              posOptions={posOptions}
            />
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default PageSelectors;
