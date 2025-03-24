
import React from 'react';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../formSchema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const MaxExtraBedsRadioGroup: React.FC = () => {
  const form = useFormContext<FormValues>();

  return (
    <FormField
      control={form.control}
      name="extraBedPolicy.maxExtraBedsPerRoom"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Maximum Extra Beds per Room</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value?.toString()}
              onValueChange={val => field.onChange(parseInt(val))}
              className="flex flex-row space-x-4"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <FormItem key={num} className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value={num.toString()} id={`max-beds-${num}`} />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer" htmlFor={`max-beds-${num}`}>
                    {num}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MaxExtraBedsRadioGroup;
