
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

interface PagePath {
  id: number;
  pageUrlName: string;
}

interface PathSelectorsProps {
  availableSlugs: string[];
  selectedSlug: string;
  setSelectedSlug: (value: string) => void;
  subSlugs: string[];
  selectedSubSlug: string;
  setSelectedSubSlug: (value: string) => void;
  selectedPathId: number | null;
  selectedSubPathId: number | null;
  slugsWithIds?: PagePath[];
  subSlugsWithIds?: PagePath[];
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
  selectedPathId,
  selectedSubPathId,
  slugsWithIds,
  subSlugsWithIds,
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
          <CardHeader className="bg-blue-50 dark:bg-blue-900/30 border-b border-gray-200 dark:border-gray-700 p-1 md:p-4">
            <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center gap-1 md:gap-2 text-[10px] md:text-lg">
              <Route className="h-3 w-3 md:h-5 md:w-5" />
              {isMobile ? "Actions" : "Choose Your Action"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-5 space-y-2 md:space-y-6">
            {!isMobile && (
              <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30 text-blue-800 dark:text-blue-300 p-1 md:p-4">
                <HelpCircle className="h-2.5 w-2.5 md:h-4 md:w-4" />
                <AlertDescription className="text-xs md:text-sm">
                  Choose how you want to proceed - configure a path or add a new page directly
                </AlertDescription>
              </Alert>
            )}

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
            <div className="grid grid-cols-1 gap-2 md:gap-4 mt-1 md:mt-4">
              {/* Option 1: Configure Path */}
              <PathConfigOption
                availableSlugs={availableSlugs}
                selectedSlug={selectedSlug}
                setSelectedSlug={setSelectedSlug}
                subSlugs={subSlugs}
                selectedSubSlug={selectedSubSlug}
                setSelectedSubSlug={setSelectedSubSlug}
                selectedPathId={selectedPathId}
                selectedSubPathId={selectedSubPathId}
                slugsWithIds={slugsWithIds}
                subSlugsWithIds={subSlugsWithIds}
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
