
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyRoomTypeStateProps {
  onAddRoomType: () => void;
}

const EmptyRoomTypeState: React.FC<EmptyRoomTypeStateProps> = ({ onAddRoomType }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddRoomType();
  };
  
  return (
    <div className="border border-dashed border-indigo-200 dark:border-indigo-800/50 rounded-lg p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">No Room Types</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Add one or more room types to your hotel.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          className="bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          Add your first room type
        </Button>
      </div>
    </div>
  );
};

export default EmptyRoomTypeState;
