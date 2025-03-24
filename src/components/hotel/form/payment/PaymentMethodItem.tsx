
import React, { useEffect } from 'react';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../formSchema';

interface PaymentMethodItemProps {
  index: number;
  field: Record<string, any>;
  onRemove: (index: number) => void;
}

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({ index, field }) => {
  const form = useFormContext<FormValues>();
  
  // Use watch for reactivity - this will trigger re-render when the checkbox changes
  const isEnabled = form.watch(`paymentMethods.${index}.enabled`);

  // Debug logging to help understand state
  useEffect(() => {
    console.log(`Payment Method (index: ${index}):`, { 
      name: field.name,
      isEnabled, 
      id: field.id,
      isBankTransfer: field.id === 'bank-transfer'
    });
  }, [isEnabled, field.id, field.name, index]);

  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name={`paymentMethods.${index}.enabled`}
        render={({ field: checkboxField }) => (
          <FormItem className={`flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4 ${
            checkboxField.value ? 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800' : ''
          }`}>
            <div className="flex items-center space-x-3">
              <FormControl>
                <Checkbox
                  checked={checkboxField.value}
                  onCheckedChange={checkboxField.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                {field.name}
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default PaymentMethodItem;
