
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl 
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';

interface TimeToggleProps {
  form: UseFormReturn<any>;
  onToggle: (checked: boolean) => void;
}

const TimeToggle: React.FC<TimeToggleProps> = ({ form, onToggle }) => {
  return (
    <FormField
      control={form.control}
      name="hasTime"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between border p-3 rounded-md">
          <div className="space-y-0.5">
            <FormLabel>Event has specific time?</FormLabel>
            <div className="text-sm text-muted-foreground">
              Toggle on to add start and end times for your event
            </div>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                onToggle(checked);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default TimeToggle;
