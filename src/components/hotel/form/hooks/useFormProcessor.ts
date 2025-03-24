
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { HotelFormData } from '@/models/HotelModel';
import { useToast } from '@/hooks/use-toast';

interface UseFormProcessorProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (data: HotelFormData) => void;
  stepsValidity?: boolean[];
  goToStep?: (index: number) => void;
}

export const useFormProcessor = ({ 
  form, 
  onSubmit,
  stepsValidity,
  goToStep
}: UseFormProcessorProps) => {
  const { toast } = useToast();
  
  const handleSubmit = (data: FormValues) => {
    // If we have step validation info, use it to check if all steps are valid
    if (stepsValidity && goToStep) {
      const invalidStepIndex = stepsValidity.findIndex(valid => !valid);
      
      if (invalidStepIndex !== -1) {
        // Show error toast about incomplete steps
        toast({
          title: "Incomplete Form",
          description: "Please complete all required steps before saving.",
          variant: "destructive",
        });
        
        // Navigate to the first invalid step
        goToStep(invalidStepIndex);
        return;
      }
    }
    
    // If all steps are valid, or if we don't have validation info, proceed with submission
    console.log('Form data before submission:', data);
    onSubmit(data as HotelFormData);
  };

  return { handleSubmit };
};
