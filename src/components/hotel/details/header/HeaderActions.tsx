
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Trash2, Pencil } from 'lucide-react';

interface HeaderActionsProps {
  onEdit: () => void;
  onSave?: () => void;
  onDelete?: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  onEdit,
  onSave,
  onDelete
}) => {
  return (
    <div className="flex space-x-2">
      {onSave && (
        <Button
          onClick={onSave}
          variant="default"
          size="sm"
          className="text-xs h-8 bg-green-600 hover:bg-green-700"
        >
          <Save className="mr-1 h-3.5 w-3.5" />
          Save Hotel
        </Button>
      )}
      {onDelete && (
        <Button
          onClick={onDelete}
          variant="destructive"
          size="sm"
          className="text-xs h-8"
        >
          <Trash2 className="mr-1 h-3.5 w-3.5" />
          Delete
        </Button>
      )}
      <Button
        onClick={onEdit}
        variant="outline"
        size="sm"
        className="text-xs h-8"
      >
        <Pencil className="mr-1 h-3.5 w-3.5" />
        Edit
      </Button>
    </div>
  );
};

export default HeaderActions;

