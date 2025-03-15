
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from '@/components/ui/dialog';
import { AddPageFormValues } from '@/viewmodels/PageAdditionViewModel';
import AddPageDialogForm from './AddPageDialogForm';

interface AddPageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pos: string;
  language: string;
  selectedSlug: string;
  selectedSubSlug: string;
  onAddPage: (pageData: AddPageFormValues) => Promise<void>;
}

const AddPageDialog = ({ 
  open, 
  onOpenChange, 
  pos, 
  language, 
  selectedSlug,
  selectedSubSlug,
  onAddPage 
}: AddPageDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatedUrlPath = selectedSlug && selectedSubSlug 
    ? `${selectedSlug}/${selectedSubSlug}` 
    : selectedSlug || '';

  const handleAddPage = async (formValues: AddPageFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onAddPage(formValues);
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add page');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Page</DialogTitle>
          <DialogDescription>
            Create a new page for {pos} in {language}
          </DialogDescription>
        </DialogHeader>

        <AddPageDialogForm
          pos={pos}
          language={language}
          generatedUrlPath={generatedUrlPath}
          onOpenChange={onOpenChange}
          onAddPage={handleAddPage}
          isSubmitting={isSubmitting}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddPageDialog;
