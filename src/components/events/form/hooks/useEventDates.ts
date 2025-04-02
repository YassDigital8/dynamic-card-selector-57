
import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formatEventDates } from '../../utils/dateUtils';

export const useEventDates = (form: UseFormReturn<any>, initialDate?: string) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [hasTime, setHasTime] = useState<boolean>(false);

  // Update date display when dates change
  useEffect(() => {
    if (startDate || endDate) {
      const startTime = form.getValues('startTime');
      const endTime = form.getValues('endTime');
      const hasTimeValue = form.getValues('hasTime');
      
      const displayValue = formatEventDates(startDate, endDate, startTime, endTime, hasTimeValue);
      form.setValue('date', {
        startDate,
        endDate,
        displayValue
      });
    }
  }, [startDate, endDate, form]);

  // Update display value when time changes
  useEffect(() => {
    if (startDate) {
      const startTime = form.getValues('startTime');
      const endTime = form.getValues('endTime');
      const hasTimeValue = form.getValues('hasTime');
      
      const displayValue = formatEventDates(startDate, endDate, startTime, endTime, hasTimeValue);
      form.setValue('date.displayValue', displayValue);
    }
  }, [form.watch('startTime'), form.watch('endTime'), form.watch('hasTime'), startDate, endDate, form]);

  const handleTimeToggle = (checked: boolean) => {
    setHasTime(checked);
    form.setValue('hasTime', checked);
    if (!checked) {
      form.setValue('startTime', '');
      form.setValue('endTime', '');
    }
  };

  return {
    startDate,
    endDate,
    hasTime,
    setStartDate,
    setEndDate,
    handleTimeToggle
  };
};
