
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, ListIcon } from 'lucide-react';

interface HotelViewToggleProps {
  isGridView: boolean;
  onToggleView: () => void;
  disabled?: boolean;
}

const HotelViewToggle: React.FC<HotelViewToggleProps> = ({
  isGridView,
  onToggleView,
  disabled = false
}) => {
  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 rounded-l-md rounded-r-none ${
          !isGridView 
            ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' 
            : 'text-gray-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/50'
        } border border-r-0 ${!isGridView ? 'border-indigo-300' : 'border-gray-200'}`}
        onClick={onToggleView}
        disabled={disabled || !isGridView}
      >
        <ListIcon className="h-4 w-4" />
        <span className="text-xs ml-1 hidden sm:inline">List</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 rounded-l-none rounded-r-md ${
          isGridView 
            ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' 
            : 'text-gray-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/50'
        } border ${isGridView ? 'border-indigo-300' : 'border-gray-200'}`}
        onClick={onToggleView}
        disabled={disabled || isGridView}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="text-xs ml-1 hidden sm:inline">Grid</span>
      </Button>
    </div>
  );
};

export default HotelViewToggle;
