
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormValues } from '../../formSchema';
import { Users, DollarSign, User } from 'lucide-react';

interface BasicInfoFieldsProps {
  form: UseFormReturn<FormValues>;
  index: number;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ form, index }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`roomTypes.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Room Type Name
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g. Deluxe Room" 
                  {...field} 
                  className="bg-white dark:bg-gray-950"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`roomTypes.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Brief description of room" 
                  {...field}
                  className="bg-white dark:bg-gray-950"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name={`roomTypes.${index}.maxAdults`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                Max Adults
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
                  className="bg-white dark:bg-gray-950"
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`roomTypes.${index}.maxChildren`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                Max Children
              </FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0"
                  className="bg-white dark:bg-gray-950" 
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`roomTypes.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                Base Price
              </FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  placeholder="0.00"
                  className="bg-white dark:bg-gray-950"
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                />
              </FormControl>
              <FormDescription>Per night price (optional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BasicInfoFields;
