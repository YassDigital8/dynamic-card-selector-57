
import React from 'react';
import { motion } from 'framer-motion';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HotelListHeaderProps {
  count: number;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

const HotelListHeader: React.FC<HotelListHeaderProps> = ({ 
  count, 
  viewMode = 'grid',
  onViewModeChange
}) => {
  const springConfig = {
    type: "spring" as const,
    stiffness: 220,
    damping: 28,
    mass: 0.7
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="flex items-center justify-between mb-4"
    >
      <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        Hotels ({count})
      </h2>
      
      {onViewModeChange && (
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-md p-0.5">
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 py-1 ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
            onClick={() => onViewModeChange('grid')}
          >
            <Grid size={16} className="text-indigo-600 dark:text-indigo-400" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 py-1 ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
            onClick={() => onViewModeChange('list')}
          >
            <List size={16} className="text-indigo-600 dark:text-indigo-400" />
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default HotelListHeader;
