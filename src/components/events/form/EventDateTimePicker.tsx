
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription 
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { DateRangePicker, TimeInputs, TimeToggle } from './date';
import { Lock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EventDateTimePickerProps {
  form: UseFormReturn<any>;
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  handleTimeToggle: (checked: boolean) => void;
  isEditing?: boolean;
}

const EventDateTimePicker: React.FC<EventDateTimePickerProps> = ({
  form,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleTimeToggle,
  isEditing = false
}) => {
  const hasTime = form.watch('hasTime');

  return (
    <FormField
      control={form.control}
      name="date.displayValue"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="flex items-center gap-2">
            Date/Schedule
            {isEditing && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Only end date can be extended for existing events</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </FormLabel>
          <div className="flex flex-col space-y-2">
            {isEditing ? (
              <>
                <div className="bg-muted p-3 rounded-md mb-2">
                  <p className="text-sm">{field.value}</p>
                </div>
                <FormDescription>
                  For existing events, you can only extend the end date. All other date/time settings are locked.
                </FormDescription>
                <div className="mt-4">
                  <FormLabel className="text-sm">Extend End Date (Optional)</FormLabel>
                  <DateRangePicker 
                    startDate={undefined}
                    endDate={endDate}
                    onStartDateChange={() => {}}
                    onEndDateChange={setEndDate}
                    disableStartDate={true}
                    showEndDateOnly={true}
                    minSelectableDate={startDate}
                  />
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
            
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
