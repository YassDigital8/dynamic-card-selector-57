
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface AddPageFormValues {
  title: string;
  description: string;
  pageUrlName: string;
}

interface PageAdditionViewModelProps {
  onSuccess?: () => void;
}

export function usePageAdditionViewModel({ onSuccess }: PageAdditionViewModelProps = {}) {
  const [addPageDialogOpen, setAddPageDialogOpen] = useState(false);
  const [isAddingPage, setIsAddingPage] = useState(false);
  const { toast } = useToast();

  const handleAddPage = async (formValues: AddPageFormValues, pos: string, language: string) => {
    setIsAddingPage(true);
    try {
      const apiUrl = 'https://92.112.184.210:7036/Page';
      
      const pageData = {
        pageUrlName: formValues.pageUrlName,
        language: language,
        pos: pos.toLowerCase(),
        title: formValues.title,
        description: formValues.description
      };
      
      console.log('Sending page data:', pageData);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Success",
        description: `Page "${formValues.title}" created successfully (mock)`,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding page:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add page",
      });
      throw error;
    } finally {
      setIsAddingPage(false);
    }
  };

  return {
    addPageDialogOpen,
    setAddPageDialogOpen,
    isAddingPage,
    handleAddPage
  };
}
