
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, X, Trash2 } from 'lucide-react';

interface EditFormButtonsProps {
  isLoading: boolean;
  onCancel: () => void;
  onDelete?: () => void;
}

const EditFormButtons: React.FC<EditFormButtonsProps> = ({
  isLoading,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        onClick={onCancel}
        className="border-blue-200 dark:border-blue-800"
        type="button"
        size="sm"
      >
        <X className="mr-1 h-3.5 w-3.5" />
        Cancel
      </Button>
      <Button 
        type="submit" 
        form="hotel-form" 
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700"
        size="sm"
      >
        <Save className="mr-1 h-3.5 w-3.5" />
        {isLoading ? "Saving..." : "Save Hotel"}
      </Button>
      {onDelete && (
        <Button 
          type="button" 
          variant="destructive"
          onClick={onDelete}
          size="sm"
        >
          <Trash2 className="mr-1 h-3.5 w-3.5" />
          Delete
        </Button>
      )}
    </div>
  );
};

export default EditFormButtons;
