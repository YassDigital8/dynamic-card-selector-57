
import React from 'react';
import { FormField, FormItem, FormControl, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../formSchema';
import { Textarea } from '@/components/ui/textarea';

const ExtraBedNotes: React.FC = () => {
  const form = useFormContext<FormValues>();

  return (
    <FormField
      control={form.control}
      name="extraBedPolicy.notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Notes</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder="Add any special conditions or notes about extra beds"
              className="min-h-[100px]"
            />
          </FormControl>
          <FormDescription>
            Optional information about availability, restrictions, etc.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ExtraBedNotes;
