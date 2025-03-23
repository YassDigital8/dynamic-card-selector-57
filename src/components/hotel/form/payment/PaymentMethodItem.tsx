
import React, { useEffect } from 'react';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../formSchema';
import BankAccountDetails from './BankAccountDetails';

interface PaymentMethodItemProps {
  index: number;
  field: Record<string, any>;
  onRemove: (index: number) => void;
}

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({ index, field, onRemove }) => {
  const form = useFormContext<FormValues>();
  // Check if this payment method is bank transfer - ensure correct ID matching
  const isBankTransfer = field.id === 'bank-transfer';
  // Use watch for reactivity - this will trigger re-render when the checkbox changes
  const isEnabled = form.watch(`paymentMethods.${index}.enabled`);
  const isCustomMethod = !['cash', 'credit-card', 'debit-card', 'bank-transfer'].includes(field.id);

  // Debug logging to help understand state
  useEffect(() => {
    console.log(`Payment Method (index: ${index}):`, { 
      name: field.name,
      isEnabled, 
      id: field.id,
      isBankTransfer
    });
    
    if (isBankTransfer) {
      console.log(`Bank Transfer Payment Method Details:`, { 
        bankDetails: form.getValues(`paymentMethods.${index}.bankAccountDetails`)
      });
    }
  }, [isEnabled, field.id, field.name, index, form, isBankTransfer]);

  return (
    <div>
      <FormField
        control={form.control}
        name={`paymentMethods.${index}.enabled`}
        render={({ field: checkboxField }) => (
          <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
            <div className="flex items-center space-x-3">
              <FormControl>
                <Checkbox
                  checked={checkboxField.value}
                  onCheckedChange={checkboxField.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                {form.getValues(`paymentMethods.${index}.name`)}
              </FormLabel>
            </div>
            {isCustomMethod && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            )}
          </FormItem>
        )}
      />

      {/* Render bank details ONLY if this is a bank transfer AND it's enabled */}
      {isBankTransfer && isEnabled && (
        <BankAccountDetails paymentMethodIndex={index} />
      )}
    </div>
  );
};

export default PaymentMethodItem;
