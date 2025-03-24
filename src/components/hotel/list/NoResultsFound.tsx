
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoResultsFoundProps {
  springConfig: any;
  onClearFilters?: () => void;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ springConfig, onClearFilters }) => {
  return (
    <motion.div
      key="no-results"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={springConfig}
      className="p-8 text-center border border-dashed border-indigo-200 dark:border-indigo-800 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/20"
    >
      <div className="mb-4 bg-white dark:bg-indigo-950/80 w-14 h-14 rounded-full flex items-center justify-center mx-auto shadow-sm">
        <Search className="h-6 w-6 text-indigo-400 dark:text-indigo-300" />
      </div>
      
      <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-300">
        No Results Found
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4">
        No hotels match your current search criteria
      </p>
      
      <div className="bg-white/80 dark:bg-indigo-950/40 p-3 rounded-lg max-w-xs mx-auto mb-4">
        <h4 className="font-medium text-indigo-600 dark:text-indigo-400 text-sm mb-2">Suggestions:</h4>
        <ul className="text-xs text-left space-y-2 text-slate-700 dark:text-slate-300">
          <li className="flex items-start">
            <Search className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-indigo-500" />
            <span>Try using more general keywords</span>
          </li>
          <li className="flex items-start">
            <Filter className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-indigo-500" />
            <span>Remove some filters to broaden results</span>
          </li>
          <li className="flex items-start">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-indigo-500" />
            <span>Clear all filters and start again</span>
          </li>
        </ul>
      </div>
      
      {onClearFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="border-indigo-200 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
        >
          <RefreshCw className="mr-1 h-3.5 w-3.5" />
          Clear All Filters
        </Button>
      )}
    </motion.div>
  );
};

export default NoResultsFound;
