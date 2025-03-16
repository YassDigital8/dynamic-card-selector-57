
import React from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderTree, FolderDown, GitBranch } from 'lucide-react';
import { buttonVariants } from './animations';
import { useIsMobile } from '@/hooks/use-mobile';

interface PagePath {
  id: number;
  pageUrlName: string;
}

interface PathConfigOptionProps {
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
}

const PathConfigOption = ({
  availableSlugs,
  selectedSlug,
  setSelectedSlug,
  subSlugs,
  selectedSubSlug,
  setSelectedSubSlug,
  selectedPathId,
  selectedSubPathId,
  slugsWithIds = [],
  subSlugsWithIds = []
}: PathConfigOptionProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="border border-blue-200 rounded-lg p-2 md:p-4 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
    >
      <div className="flex flex-col items-center text-center gap-2 md:gap-3">
        <GitBranch className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-blue-600`} />
        <h3 className="font-medium text-blue-800 text-xs md:text-base">Configure Path</h3>
        {!isMobile && (
          <p className="text-xs text-gray-600">
            Select a parent path and optionally a sub-path
          </p>
        )}
        
        {availableSlugs.length > 0 && (
          <div className="w-full mt-1 md:mt-3 space-y-2 md:space-y-3">
            <div className="space-y-1 md:space-y-2">
              <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm font-medium text-gray-700 dark:text-gray-300">
                <FolderTree className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-purple-500`} />
                {isMobile ? "Parent Path" : "Select Parent Path"}
              </label>
              <Select
                value={selectedSlug}
                onValueChange={setSelectedSlug}
              >
                <SelectTrigger className={`w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400 transition-colors ${isMobile ? 'text-[10px] h-6 py-0 px-2' : ''}`}>
                  <SelectValue placeholder={isMobile ? "-- Select --" : "-- Select Parent --"} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  {availableSlugs.map((slug) => (
                    <SelectItem key={slug} value={slug} className={`text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isMobile ? 'text-[10px]' : ''}`}>
                      {slug}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedPathId !== null && (
                <div className="text-[9px] md:text-xs text-gray-500 mt-1">
                  Selected ID: {selectedPathId}
                </div>
              )}
            </div>

            {subSlugs.length > 0 && selectedSlug && (
              <div className="space-y-1 md:space-y-2">
                <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FolderDown className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-amber-500`} />
                  {isMobile ? "Sub Path" : "Select Sub Path"}
                </label>
                <Select
                  value={selectedSubSlug}
                  onValueChange={setSelectedSubSlug}
                >
                  <SelectTrigger className={`w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-amber-400 transition-colors ${isMobile ? 'text-[10px] h-6 py-0 px-2' : ''}`}>
                    <SelectValue placeholder={isMobile ? "-- Select --" : "-- Select Sub Path --"} />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    {subSlugs.map((slug) => (
                      <SelectItem key={slug} value={slug} className={`text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isMobile ? 'text-[10px]' : ''}`}>
                        {slug}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedSubPathId !== null && (
                  <div className="text-[9px] md:text-xs text-gray-500 mt-1">
                    Selected Sub ID: {selectedSubPathId}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PathConfigOption;
