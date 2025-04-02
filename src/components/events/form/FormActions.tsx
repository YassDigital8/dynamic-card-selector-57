
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Save, X } from 'lucide-react';

interface FormActionsProps {
  onCancel: () => void;
  isLoading: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel, isLoading }) => {
  return (
    <CardFooter className="flex justify-between">
      <Button type="button" variant="outline" onClick={onCancel}>
        <X className="mr-2 h-4 w-4" />
        Cancel
      </Button>
      <Button type="submit" disabled={isLoading}>
        <Save className="mr-2 h-4 w-4" />
        {isLoading ? "Saving..." : "Save Event"}
      </Button>
    </CardFooter>
  );
};

export default FormActions;
