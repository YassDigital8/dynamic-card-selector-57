
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface RoomTypeHeaderProps {
  onAddRoomType: () => void;
}

const RoomTypeHeader: React.FC<RoomTypeHeaderProps> = ({ onAddRoomType }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-medium text-foreground">Room Types</h3>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAddRoomType}
        className="flex items-center gap-1 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
      >
        <PlusCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        Add Room Type
      </Button>
    </div>
  );
};

export default RoomTypeHeader;
