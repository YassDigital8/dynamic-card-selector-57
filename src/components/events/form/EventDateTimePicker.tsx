
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { DateRangePicker, TimeInputs, TimeToggle } from './date';

interface EventDateTimePickerProps {
  form: UseFormReturn<any>;
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  handleTimeToggle: (checked: boolean) => void;
}

const EventDateTimePicker: React.FC<EventDateTimePickerProps> = ({
  form,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleTimeToggle
}) => {
  const hasTime = form.watch('hasTime');

  return (
    <FormField
      control={form.control}
      name="date.displayValue"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Date/Schedule</FormLabel>
          <div className="flex flex-col space-y-2">
            <DateRangePicker 
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />

            <TimeToggle 
              form={form}
              onToggle={handleTimeToggle}
            />

            <TimeInputs 
              form={form}
              showTimeInputs={hasTime}
            />
            
            <div className="text-xs text-muted-foreground mt-1 border-t pt-2">
              <strong>Display format:</strong> {field.value ? field.value : "Select start and optional end date/time"}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EventDateTimePicker;
