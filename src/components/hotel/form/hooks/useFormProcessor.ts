
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { HotelFormData } from '@/models/HotelModel';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';

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
    console.log("Handling form submission. Steps validity:", stepsValidity);
    
    // If we have step validation info, use it to check if all steps are valid
    if (stepsValidity && goToStep) {
      const invalidStepIndex = stepsValidity.findIndex(valid => valid === false);
      
      if (invalidStepIndex !== -1) {
        console.log("Invalid step found at index:", invalidStepIndex);
        
        // Show error toast about incomplete steps
        toast({
          variant: "destructive",
          title: "Incomplete Form",
          description: (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>Please complete all required information before saving. Navigating to the first incomplete step.</span>
            </div>
          ),
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
