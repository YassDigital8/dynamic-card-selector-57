
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface DateRangePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  disableStartDate?: boolean;
  showEndDateOnly?: boolean;
  minSelectableDate?: Date;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  disableStartDate = false,
  showEndDateOnly = false,
  minSelectableDate
}) => {
  return (
    <div className={`grid ${showEndDateOnly ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-2`}>
      {!showEndDateOnly && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="start-date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
              disabled={disableStartDate}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : <span>Pick a start date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={onStartDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="end-date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {endDate ? format(endDate, "PPP") : <span>{showEndDateOnly ? "Set extension date" : "Pick an end date"}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={onEndDateChange}
            initialFocus
            fromDate={minSelectableDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
