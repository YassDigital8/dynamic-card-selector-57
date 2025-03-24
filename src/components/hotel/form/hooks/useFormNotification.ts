
import { useToast } from '@/hooks/use-toast';

export const useFormNotification = () => {
  const { toast } = useToast();
  
  const showIncompleteFormError = () => {
    toast({
      variant: "destructive",
      title: "Incomplete Form",
      description: "Please complete all required information before saving. Navigating to the first incomplete step."
    });
  };
  
  const showSuccessNotification = (title: string, description: string) => {
    toast({
      variant: "default",
      title,
      description
    });
  };
  
  return { showIncompleteFormError, showSuccessNotification };
};
