
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderPlus, FileText, Globe, Folder, HelpCircle, Languages, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SelectionStep } from '@/models/PageModel';

interface PageSelectorsProps {
  posOptions: string[];
  languageOptions: string[];
  selectedPOS: string;
  selectedLanguage: string;
  setSelectedPOS: (value: string) => void;
  setSelectedLanguage: (value: string) => void;
  loading: boolean;
  currentStep: SelectionStep; // Added currentStep prop to match usage in Index.tsx
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
  return (
    <Card className="shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="bg-blue-50 dark:bg-blue-900/30 border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center gap-2 text-lg">
          <Languages className="h-5 w-5" />
          Region & Language Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: POS Selection */}
          {currentStep === 'pos' && (
            <motion.div 
              key="pos-selection"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInVariants}
              className="space-y-4"
            >
              <Alert className="bg-blue-50 border-blue-100 text-blue-800">
                <HelpCircle className="h-4 w-4" />
                <AlertDescription>
                  First, please select a Point of Service (POS) region
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Flag className="h-4 w-4 text-green-500" />
                  Select POS
                </label>
                <Select
                  value={selectedPOS}
                  onValueChange={setSelectedPOS}
                >
                  <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-400 transition-colors">
                    <SelectValue placeholder="Select POS" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    {posOptions.map((pos) => (
                      <SelectItem key={pos} value={pos} className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{pos}</SelectItem>
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
              className="space-y-4"
            >
              <Alert className="bg-blue-50 border-blue-100 text-blue-800">
                <HelpCircle className="h-4 w-4" />
                <AlertDescription>
                  Now, please select a language for the {selectedPOS} region
                </AlertDescription>
              </Alert>
              
              <div className="text-sm font-medium mb-4">
                Selected POS: <span className="text-green-600 font-bold">{selectedPOS}</span>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Globe className="h-4 w-4 text-blue-500" />
                  Select Language
                </label>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 transition-colors">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang} value={lang} className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{lang}</SelectItem>
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
              className="space-y-4"
            >
              <Alert className="bg-green-50 border-green-100 text-green-800">
                <HelpCircle className="h-4 w-4" />
                <AlertDescription>
                  Great! You have selected {selectedPOS} - {selectedLanguage}. Now choose how to proceed:
                </AlertDescription>
              </Alert>
              
              <div className="flex flex-col space-y-2 text-sm font-medium mb-2">
                <div>Selected POS: <span className="text-green-600 font-bold">{selectedPOS}</span></div>
                <div>Selected Language: <span className="text-blue-600 font-bold">{selectedLanguage}</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default PageSelectors;
