
import React from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderTree, FolderDown, Link, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PathSelectorsProps {
  availableSlugs: string[];
  selectedSlug: string;
  setSelectedSlug: (value: string) => void;
  subSlugs: string[];
  selectedSubSlug: string;
  setSelectedSubSlug: (value: string) => void;
  loading: boolean;
  handleFetchData?: () => void; // Made optional since we won't need it anymore
  selectedPOS: string;
  selectedLanguage: string;
  onAddPageClick?: () => void;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
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
  onAddPageClick
}: PathSelectorsProps) => {
  
  // Generate dynamic URL for display - Now POS comes first, then language
  const dynamicUrl = selectedPOS && selectedLanguage ? 
    `${selectedPOS.toLowerCase()}/${selectedLanguage.toLowerCase()}${selectedSlug ? '/' + selectedSlug : ''}${selectedSubSlug ? '/' + selectedSubSlug : ''}` 
    : '';
  
  return (
    <Card className="shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="bg-blue-50 dark:bg-blue-900/30 border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center gap-2">
          <FolderTree className="h-5 w-5" />
          Path Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-6">
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
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dynamic URL Path</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-3 text-sm text-gray-800 dark:text-gray-200 font-mono overflow-x-auto">
              {dynamicUrl || "URL will appear here as you make selections"}
            </div>
          </motion.div>
        )}

        {availableSlugs.length > 0 && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="mb-6"
          >
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
          </motion.div>
        )}

        {subSlugs.length > 0 && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="mb-6"
          >
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
          </motion.div>
        )}

        {/* Add Page button - Now always appears at the end regardless of other elements */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="mb-6"
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              onClick={onAddPageClick}
              className="w-full gap-2 shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all"
              disabled={loading || !selectedPOS || !selectedLanguage}
            >
              <PlusCircle className="h-5 w-5" />
              Add Page
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default PathSelectors;
