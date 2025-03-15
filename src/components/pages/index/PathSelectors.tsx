
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Route, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SelectionStep } from '@/models/PageModel';
import DynamicUrlDisplay from './pathSelector/DynamicUrlDisplay';
import PathConfigOption from './pathSelector/PathConfigOption';
import AddPageOption from './pathSelector/AddPageOption';
import { fadeInVariants } from './pathSelector/animations';
import { useIsMobile } from '@/hooks/use-mobile';

interface PathSelectorsProps {
  availableSlugs: string[];
  selectedSlug: string;
  setSelectedSlug: (value: string) => void;
  subSlugs: string[];
  selectedSubSlug: string;
  setSelectedSubSlug: (value: string) => void;
  loading: boolean;
  selectedPOS: string;
  selectedLanguage: string;
  onAddPageClick?: () => void;
  currentStep: SelectionStep;
}

const PathSelectors = ({
  availableSlugs,
  selectedSlug,
  setSelectedSlug,
  subSlugs,
  selectedSubSlug,
  setSelectedSubSlug,
  loading,
  selectedPOS,
  selectedLanguage,
  onAddPageClick,
  currentStep
}: PathSelectorsProps) => {
  const isMobile = useIsMobile();
  
  // Only show this component in the options step
  if (currentStep !== 'options') return null;
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="path-selectors"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeInVariants}
      >
        <Card className="shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/30 border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4">
            <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center gap-2 text-base sm:text-lg">
              <Route className="h-4 w-4 sm:h-5 sm:w-5" />
              Choose Your Action
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-5 space-y-4 sm:space-y-6">
            <Alert className="bg-blue-50 border-blue-100 text-blue-800 p-2 sm:p-4 text-xs sm:text-sm">
              <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <AlertDescription>
                Choose how you want to proceed - configure a path or add a new page directly
              </AlertDescription>
            </Alert>

            {/* Dynamic URL Display */}
            {(selectedPOS && selectedLanguage) && (
              <DynamicUrlDisplay
                selectedPOS={selectedPOS}
                selectedLanguage={selectedLanguage}
                selectedSlug={selectedSlug}
                selectedSubSlug={selectedSubSlug}
              />
            )}

            {/* Action Options Cards */}
            <div className="grid grid-cols-1 gap-4 mt-2 sm:mt-4">
              {/* Option 1: Configure Path */}
              <PathConfigOption
                availableSlugs={availableSlugs}
                selectedSlug={selectedSlug}
                setSelectedSlug={setSelectedSlug}
                subSlugs={subSlugs}
                selectedSubSlug={selectedSubSlug}
                setSelectedSubSlug={setSelectedSubSlug}
              />

              {/* Option 2: Add New Page Directly */}
              <AddPageOption onAddPageClick={onAddPageClick} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default PathSelectors;
