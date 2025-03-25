
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface AddRoomTypeButtonProps {
  onAddRoomType: () => void;
}

const AddRoomTypeButton: React.FC<AddRoomTypeButtonProps> = ({ onAddRoomType }) => {
  return (
    <div className="flex justify-center mt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onAddRoomType}
        className="flex items-center gap-2 border-dashed border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 w-full justify-center py-6"
      >
        <PlusCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        Add Another Room Type
      </Button>
    </div>
  );
};

export default AddRoomTypeButton;
