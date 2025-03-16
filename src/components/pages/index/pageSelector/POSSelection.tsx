
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flag, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { fadeInVariants } from '../pathSelector/animations';
import { useIsMobile } from '@/hooks/use-mobile';

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

interface POSSelectionProps {
  posOptions: POSOption[];
  selectedPOS: string;
  setSelectedPOS: (value: string) => void;
  loading: boolean;
  error?: string | null;
}

const POSSelection = ({
  posOptions,
  selectedPOS,
  setSelectedPOS,
  loading,
  error
}: POSSelectionProps) => {
  const isMobile = useIsMobile();
  
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
          First, please select a Point of Service (POS) region
        </AlertDescription>
      </Alert>
      
      {error && (
        <Alert className="bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30 text-red-800 dark:text-red-300 p-1.5 sm:p-2 md:p-4">
          <AlertDescription className="text-[10px] sm:text-xs md:text-sm">
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-1 md:space-y-2">
        <label className="flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
          <Flag className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-green-500" />
          Select POS
        </label>
        <Select
          value={selectedPOS}
          onValueChange={setSelectedPOS}
          disabled={loading || posOptions.length === 0}
        >
          <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-400 transition-colors text-[10px] sm:text-xs md:text-sm h-8 md:h-10">
            <SelectValue placeholder={loading ? "Loading..." : "Select POS"} />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-h-[40vh]">
            {posOptions.map((pos) => (
              <SelectItem 
                key={pos.id} 
                value={pos.key} 
                className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-[10px] sm:text-xs md:text-sm"
              >
                {pos.englishName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};

export default POSSelection;
