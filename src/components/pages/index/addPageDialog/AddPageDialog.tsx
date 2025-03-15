
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from '@/components/ui/dialog';
import { AddPageFormValues } from '@/viewmodels/PageAdditionViewModel';
import AddPageDialogForm from './AddPageDialogForm';
import { dialogContentVariants } from './animations';

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add page');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]" asChild>
        <motion.div
          variants={dialogContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
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
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPageDialog;
