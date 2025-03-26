
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../formSchema';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface BasicInfoFieldsProps {
  form: UseFormReturn<FormValues>;
  index: number;
}

export const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ form, index }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Basic Information</h3>
      
      {/* Room Type Name */}
      <FormField
        control={form.control}
        name={`roomTypes.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Room Type Name</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Standard Room, Presidential Suite, etc."
                autoFocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Room Price */}
      <FormField
        control={form.control}
        name={`roomTypes.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Base Price</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="number"
                placeholder="Enter base price per night"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? '' : Number(value));
                }}
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
            <FormLabel>Max Adults</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="number" 
                placeholder="Maximum number of adults"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? '' : Number(value));
                }}
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
