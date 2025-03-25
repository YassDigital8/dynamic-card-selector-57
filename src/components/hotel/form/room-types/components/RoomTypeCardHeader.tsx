
import React from 'react';
import { Bed, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardHeader } from '@/components/ui/card';

interface RoomTypeCardHeaderProps {
  roomName: string;
  maxAdults: number;
  maxChildren: number;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onRemove: () => void;
}

const RoomTypeCardHeader: React.FC<RoomTypeCardHeaderProps> = ({
  roomName,
  maxAdults,
  maxChildren,
  index,
  isExpanded,
  onToggleExpand,
  onRemove
}) => {
  return (
    <CardHeader 
      className="p-4 pb-3 border-b border-indigo-100 dark:border-indigo-900/50 flex flex-row items-center justify-between cursor-pointer"
      onClick={onToggleExpand}
    >
      <div className="flex items-center gap-3">
        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
          <Bed className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h4 className="font-medium text-indigo-700 dark:text-indigo-400">
            {roomName || `Room Type ${index + 1}`}
          </h4>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Max Occupancy: {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}
            {maxChildren > 0 ? `, ${maxChildren} ${maxChildren === 1 ? 'child' : 'children'}` : ''}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {index > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand();
          }}
          className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'}</span>
        </Button>
      </div>
    </CardHeader>
  );
};

export default RoomTypeCardHeader;
