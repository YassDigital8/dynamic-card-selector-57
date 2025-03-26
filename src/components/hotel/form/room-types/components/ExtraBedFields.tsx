
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
import { Switch } from '@/components/ui/switch';
import { Bed } from 'lucide-react';

interface ExtraBedFieldsProps {
  form: UseFormReturn<FormValues>;
  index: number;
}

const ExtraBedFields: React.FC<ExtraBedFieldsProps> = ({ form, index }) => {
  const allowExtraBed = form.watch(`roomTypes.${index}.allowExtraBed`);

  return (
    <div className="p-4 bg-blue-50/50 dark:bg-blue-950/10 rounded-md border border-blue-100 dark:border-blue-900/50">
      <div className="flex items-center gap-2 mb-3">
        <Bed className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <h4 className="font-medium text-blue-700 dark:text-blue-400">Extra Bed Settings</h4>
      </div>
      
      <FormField
        control={form.control}
        name={`roomTypes.${index}.allowExtraBed`}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-100 dark:border-blue-900/50 p-3 bg-white dark:bg-gray-950">
            <div className="space-y-0.5">
              <FormLabel>Allow Extra Bed</FormLabel>
              <FormDescription>
                Enable extra bed option for this room type
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {allowExtraBed && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`roomTypes.${index}.maxExtraBeds`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Extra Beds</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    max="5"
                    placeholder="1"
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
            name={`roomTypes.${index}.extraBedPrice`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extra Bed Price</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    placeholder="0.00"
                    className="bg-white dark:bg-gray-950"
                    {...field} 
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription>Price per night</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ExtraBedFields;
