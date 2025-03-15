
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderTree, FolderDown, Link, PlusCircle, ArrowRight, HelpCircle, Route, GitBranch } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SelectionStep } from '@/models/PageModel';

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
  currentStep: SelectionStep; // Added currentStep prop to match usage in Index.tsx
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.03,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10
    }
  },
  tap: { 
    scale: 0.97
  }
};

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
  
  // Generate dynamic URL for display - Now POS comes first, then language
  const dynamicUrl = selectedPOS && selectedLanguage ? 
    `${selectedPOS.toLowerCase()}/${selectedLanguage.toLowerCase()}${selectedSlug ? '/' + selectedSlug : ''}${selectedSubSlug ? '/' + selectedSubSlug : ''}` 
    : '';

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
          <CardHeader className="bg-blue-50 dark:bg-blue-900/30 border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center gap-2">
              <Route className="h-5 w-5" />
              Choose Your Action
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-6">
            <Alert className="bg-blue-50 border-blue-100 text-blue-800">
              <HelpCircle className="h-4 w-4" />
              <AlertDescription>
                Choose how you want to proceed - configure a path or add a new page directly
              </AlertDescription>
            </Alert>

            {/* Dynamic URL Display */}
            {(selectedPOS && selectedLanguage) && (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                className="mb-6 overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Link className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current URL Path</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-3 text-sm text-gray-800 dark:text-gray-200 font-mono overflow-x-auto">
                  {dynamicUrl || "URL will appear here as you make selections"}
                </div>
              </motion.div>
            )}

            {/* Action Options Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Option 1: Configure Path */}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="border border-blue-200 rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                onClick={() => {
                  // When they click this, they'll see the path configuration fields
                  if (availableSlugs.length === 0) {
                    // If slugs aren't loaded, trigger their load (handled by the parent component)
                  }
                }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <GitBranch className="h-8 w-8 text-blue-600" />
                  <h3 className="font-medium text-blue-800">Configure Path</h3>
                  <p className="text-sm text-gray-600">
                    Select a parent path and optionally a sub-path
                  </p>
                  
                  {availableSlugs.length > 0 && (
                    <div className="w-full mt-3 space-y-3">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <FolderTree className="h-4 w-4 text-purple-500" />
                          Select Parent Path
                        </label>
                        <Select
                          value={selectedSlug}
                          onValueChange={setSelectedSlug}
                        >
                          <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400 transition-colors">
                            <SelectValue placeholder="-- Select Parent --" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                            {availableSlugs.map((slug) => (
                              <SelectItem key={slug} value={slug} className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{slug}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {subSlugs.length > 0 && selectedSlug && (
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <FolderDown className="h-4 w-4 text-amber-500" />
                            Select Sub Path
                          </label>
                          <Select
                            value={selectedSubSlug}
                            onValueChange={setSelectedSubSlug}
                          >
                            <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-amber-400 transition-colors">
                              <SelectValue placeholder="-- Select Sub Path --" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                              {subSlugs.map((slug) => (
                                <SelectItem key={slug} value={slug} className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{slug}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Option 2: Add New Page Directly */}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="border border-green-200 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                onClick={onAddPageClick}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <PlusCircle className="h-8 w-8 text-green-600" />
                  <h3 className="font-medium text-green-800">Add New Page</h3>
                  <p className="text-sm text-gray-600">
                    Create a new page directly without configuring paths
                  </p>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onAddPageClick) onAddPageClick();
                    }}
                    className="mt-3 w-full gap-2 shadow-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all"
                  >
                    <PlusCircle className="h-5 w-5" />
                    Add Page Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default PathSelectors;
