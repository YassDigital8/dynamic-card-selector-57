
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface FormActionsProps {
  isLoading: boolean;
  showButtons?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ isLoading, showButtons = true }) => {
  if (!showButtons) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
        <Save className="mr-1 h-4 w-4" />
        {isLoading ? "Saving..." : "Save Hotel"}
      </Button>
    </div>
  );
};

export default FormActions;
