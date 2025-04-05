
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Save } from 'lucide-react';

interface FormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isEditing, onCancel }) => {
  return (
    <div className="pt-4 flex justify-end gap-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="flex items-center gap-2"
      >
        <X className="h-4 w-4" />
        Cancel
      </Button>
      <Button 
        type="submit" 
        className="flex items-center gap-2"
      >
        <Save className="h-4 w-4" />
        {isEditing ? 'Update Job' : 'Create Job'}
      </Button>
    </div>
  );
};

export default FormActions;
