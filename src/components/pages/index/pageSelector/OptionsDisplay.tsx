
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { fadeInVariants } from '../pathSelector/animations';

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

interface OptionsDisplayProps {
  selectedPOS: string;
  selectedLanguage: string;
  posOptions: POSOption[];
}

const OptionsDisplay = ({
  selectedPOS,
  selectedLanguage,
  posOptions
}: OptionsDisplayProps) => {
  const selectedPOSName = posOptions.find(pos => pos.key === selectedPOS)?.englishName || selectedPOS;
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInVariants}
      className="space-y-2 sm:space-y-3 md:space-y-4"
    >
      <Alert className="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30 text-green-800 dark:text-green-300 p-1.5 sm:p-2 md:p-4">
        <HelpCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
        <AlertDescription className="text-[10px] sm:text-xs md:text-sm">
          Great! You have selected {selectedPOSName} - {selectedLanguage}. Now choose how to proceed:
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col space-y-0.5 sm:space-y-1 md:space-y-2 text-[10px] sm:text-xs md:text-sm font-medium mb-1 sm:mb-2">
        <div>Selected POS: <span className="text-green-600 dark:text-green-400 font-bold">
          {selectedPOSName}
        </span></div>
        <div>Selected Language: <span className="text-blue-600 dark:text-blue-400 font-bold">{selectedLanguage}</span></div>
      </div>
    </motion.div>
  );
};

export default OptionsDisplay;
