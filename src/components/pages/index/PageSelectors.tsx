
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages, HelpCircle, Flag, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SelectionStep } from '@/models/PageModel';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageSelectorsProps {
  posOptions: string[];
  languageOptions: string[];
  selectedPOS: string;
  selectedLanguage: string;
  setSelectedPOS: (value: string) => void;
  setSelectedLanguage: (value: string) => void;
  loading: boolean;
  currentStep: SelectionStep;
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 }
  }
};

const PageSelectors = ({
  posOptions,
  languageOptions,
  selectedPOS,
  selectedLanguage,
  setSelectedPOS,
  setSelectedLanguage,
  loading,
  currentStep
}: PageSelectorsProps) => {
  const isMobile = useIsMobile();
  
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
            <motion.div 
              key="pos-selection"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInVariants}
              className="space-y-2 sm:space-y-3 md:space-y-4"
            >
              <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30 text-blue-800 dark:text-blue-300 p-1.5 sm:p-2 md:p-4">
                <HelpCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                <AlertDescription className="text-[10px] sm:text-xs md:text-sm">
                  First, please select a Point of Service (POS) region
                </AlertDescription>
              </Alert>
              
              <div className="space-y-1 md:space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Flag className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-green-500" />
                  Select POS
                </label>
                <Select
                  value={selectedPOS}
                  onValueChange={setSelectedPOS}
                >
                  <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-400 transition-colors text-[10px] sm:text-xs md:text-sm h-8 md:h-10">
                    <SelectValue placeholder="Select POS" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-h-[40vh]">
                    {posOptions.map((pos) => (
                      <SelectItem key={pos} value={pos} className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-[10px] sm:text-xs md:text-sm">{pos}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {/* Step 2: Language Selection */}
          {currentStep === 'language' && (
            <motion.div 
              key="language-selection"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInVariants}
              className="space-y-2 sm:space-y-3 md:space-y-4"
            >
              <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30 text-blue-800 dark:text-blue-300 p-1.5 sm:p-2 md:p-4">
                <HelpCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                <AlertDescription className="text-[10px] sm:text-xs md:text-sm">
                  Now, please select a language for the {selectedPOS} region
                </AlertDescription>
              </Alert>
              
              <div className="text-[10px] sm:text-xs md:text-sm font-medium mb-1 sm:mb-2 md:mb-4">
                Selected POS: <span className="text-green-600 dark:text-green-400 font-bold">{selectedPOS}</span>
              </div>
              
              <div className="space-y-1 md:space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-blue-500" />
                  Select Language
                </label>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 transition-colors text-[10px] sm:text-xs md:text-sm h-8 md:h-10">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-h-[40vh]">
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang} value={lang} className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-[10px] sm:text-xs md:text-sm">{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {/* Step 3: Options (only displays if both POS and language are selected) */}
          {currentStep === 'options' && (
            <motion.div 
              key="options-display"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInVariants}
              className="space-y-2 sm:space-y-3 md:space-y-4"
            >
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30 text-green-800 dark:text-green-300 p-1.5 sm:p-2 md:p-4">
                <HelpCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                <AlertDescription className="text-[10px] sm:text-xs md:text-sm">
                  Great! You have selected {selectedPOS} - {selectedLanguage}. Now choose how to proceed:
                </AlertDescription>
              </Alert>
              
              <div className="flex flex-col space-y-0.5 sm:space-y-1 md:space-y-2 text-[10px] sm:text-xs md:text-sm font-medium mb-1 sm:mb-2">
                <div>Selected POS: <span className="text-green-600 dark:text-green-400 font-bold">{selectedPOS}</span></div>
                <div>Selected Language: <span className="text-blue-600 dark:text-blue-400 font-bold">{selectedLanguage}</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default PageSelectors;
