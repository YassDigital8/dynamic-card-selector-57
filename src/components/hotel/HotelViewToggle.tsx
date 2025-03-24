
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
      <span className="text-xs text-muted-foreground">View:</span>
      <div className="flex border rounded-md overflow-hidden">
        <Button
          variant="ghost"
          size="sm"
          className={`px-2 py-1 h-8 rounded-none ${
            !isGridView 
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' 
              : 'text-muted-foreground'
          }`}
          onClick={onToggleView}
          disabled={disabled || !isGridView}
        >
          <ListIcon className="h-4 w-4 mr-1" />
          <span className="text-xs">List</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`px-2 py-1 h-8 rounded-none ${
            isGridView 
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' 
              : 'text-muted-foreground'
          }`}
          onClick={onToggleView}
          disabled={disabled || isGridView}
        >
          <LayoutGrid className="h-4 w-4 mr-1" />
          <span className="text-xs">Grid</span>
        </Button>
      </div>
    </div>
  );
};

export default HotelViewToggle;
