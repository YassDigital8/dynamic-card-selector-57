
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormSchema } from '../eventFormSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface SingleTicketPricingProps {
  form: UseFormReturn<EventFormSchema>;
}

export const SingleTicketPricing: React.FC<SingleTicketPricingProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Base Price ($)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="totalInventory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Capacity</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                placeholder="Maximum number of attendees"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
