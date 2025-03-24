
import React from 'react';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../formSchema';
import { DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ExtraBedPriceInput: React.FC = () => {
  const form = useFormContext<FormValues>();

  return (
    <FormField
      control={form.control}
      name="extraBedPolicy.pricePerNight"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price per Night</FormLabel>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign className="h-4 w-4 text-gray-500" />
            </div>
            <FormControl>
              <Input
                {...field}
                type="number"
                min="0"
                step="0.01"
                onChange={e => {
                  const value = parseFloat(e.target.value) || 0;
                  field.onChange(value);
                }}
                className="pl-10"
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ExtraBedPriceInput;
