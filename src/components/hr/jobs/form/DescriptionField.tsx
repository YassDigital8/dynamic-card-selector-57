
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { JobFormValues } from './jobFormSchema';

interface DescriptionFieldProps {
  form: UseFormReturn<JobFormValues>;
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Job Description</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Detailed description of the job..." 
              className="min-h-32" 
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionField;
