
import React from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderTree, FolderDown, GitBranch } from 'lucide-react';
import { buttonVariants } from './animations';

interface PathConfigOptionProps {
  availableSlugs: string[];
  selectedSlug: string;
  setSelectedSlug: (value: string) => void;
  subSlugs: string[];
  selectedSubSlug: string;
  setSelectedSubSlug: (value: string) => void;
}

const PathConfigOption = ({
  availableSlugs,
  selectedSlug,
  setSelectedSlug,
  subSlugs,
  selectedSubSlug,
  setSelectedSubSlug
}: PathConfigOptionProps) => {
  return (
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="border border-blue-200 rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
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
  );
};

export default PathConfigOption;
