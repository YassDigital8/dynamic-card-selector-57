
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface TimeInputsProps {
  form: UseFormReturn<any>;
  showTimeInputs: boolean;
}

const TimeInputs: React.FC<TimeInputsProps> = ({ form, showTimeInputs }) => {
  if (!showTimeInputs) return null;
  
  return (
    <div className="flex space-x-2">
      <FormField
        control={form.control}
        name="startTime"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Start Time</FormLabel>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <FormControl>
                <Input
                  type="time"
                  {...field}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="endTime"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>End Time (Optional)</FormLabel>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <FormControl>
                <Input
                  type="time"
                  {...field}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TimeInputs;
