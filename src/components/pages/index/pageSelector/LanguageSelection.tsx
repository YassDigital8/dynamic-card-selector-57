
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { fadeInVariants } from '../pathSelector/animations';

interface LanguageSelectionProps {
  languageOptions: string[];
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
  selectedPOS: string;
  posEnglishName: string;
}

const LanguageSelection = ({
  languageOptions,
  selectedLanguage,
  setSelectedLanguage,
  selectedPOS,
  posEnglishName
}: LanguageSelectionProps) => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInVariants}
      className="space-y-2 sm:space-y-3 md:space-y-4"
    >
      <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30 text-blue-800 dark:text-blue-300 p-1.5 sm:p-2 md:p-4">
        <HelpCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
        <AlertDescription className="text-[10px] sm:text-xs md:text-sm">
          Now, please select a language for the {posEnglishName || selectedPOS} region
        </AlertDescription>
      </Alert>
      
      <div className="text-[10px] sm:text-xs md:text-sm font-medium mb-1 sm:mb-2 md:mb-4">
        Selected POS: <span className="text-green-600 dark:text-green-400 font-bold">
          {posEnglishName || selectedPOS}
        </span>
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
  );
};

export default LanguageSelection;
