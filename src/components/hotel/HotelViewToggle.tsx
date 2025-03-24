
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
    <div className="flex items-center space-x-2">
      <span className="text-xs md:text-sm text-muted-foreground">View:</span>
      <div className="flex border rounded-md overflow-hidden shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          className={`px-2 py-1 h-8 rounded-none ${
            !isGridView 
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' 
              : 'text-muted-foreground hover:bg-indigo-50 dark:hover:bg-indigo-900/50'
          }`}
          onClick={onToggleView}
          disabled={disabled || !isGridView}
        >
          <ListIcon className="h-4 w-4 mr-1" />
          <span className="text-xs md:text-sm">List</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`px-2 py-1 h-8 rounded-none ${
            isGridView 
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' 
              : 'text-muted-foreground hover:bg-indigo-50 dark:hover:bg-indigo-900/50'
          }`}
          onClick={onToggleView}
          disabled={disabled || isGridView}
        >
          <LayoutGrid className="h-4 w-4 mr-1" />
          <span className="text-xs md:text-sm">Grid</span>
        </Button>
      </div>
    </div>
  );
};

export default HotelViewToggle;
