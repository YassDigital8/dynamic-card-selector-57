
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
import { Switch } from '@/components/ui/switch';

interface ExtraBedFieldsProps {
  form: UseFormReturn<FormValues>;
  index: number;
}

export const ExtraBedFields: React.FC<ExtraBedFieldsProps> = ({ form, index }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Extra Bed Options</h3>
      
      {/* Allow Extra Bed */}
      <FormField
        control={form.control}
        name={`roomTypes.${index}.allowExtraBed`}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Allow Extra Bed
              </FormLabel>
              <div className="text-sm text-muted-foreground">
                Enable extra bed option for this room type
              </div>
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
      
      {form.watch(`roomTypes.${index}.allowExtraBed`) && (
        <>
          {/* Extra Bed Price */}
          <FormField
            control={form.control}
            name={`roomTypes.${index}.extraBedPrice`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extra Bed Price</FormLabel>
                <FormControl>
                  <Input 
                    value={field.value === 0 && document.activeElement === document.getElementById(`extra-bed-price-${index}`) ? '' : field.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === '' ? 0 : Number(value));
                    }}
                    type="number"
                    id={`extra-bed-price-${index}`}
                    placeholder="Price for each extra bed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Max Extra Beds */}
          <FormField
            control={form.control}
            name={`roomTypes.${index}.maxExtraBeds`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Extra Beds</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number" 
                    placeholder="Maximum number of extra beds allowed"
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
        </>
      )}
    </div>
  );
};

export default ExtraBedFields;
