
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../formSchema';

interface BasicInfoFieldsProps {
  form: UseFormReturn<FormValues>;
  index: number;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ form, index }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Room Type Name */}
      <FormField
        control={form.control}
        name={`roomTypes.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel required>Room Type Name</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="e.g., Standard Double" 
                autoFocus={index > 0}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Max Adults */}
      <FormField
        control={form.control}
        name={`roomTypes.${index}.maxAdults`}
        render={({ field }) => (
          <FormItem>
            <FormLabel required>Max Adults</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                {...field} 
                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                min={1}
                value={field.value || 1}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Max Children */}
      <FormField
        control={form.control}
        name={`roomTypes.${index}.maxChildren`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Max Children</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                {...field} 
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                min={0}
                value={field.value || 0}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description (optional) */}
      <FormField
        control={form.control}
        name={`roomTypes.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Optional room description" 
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoFields;
