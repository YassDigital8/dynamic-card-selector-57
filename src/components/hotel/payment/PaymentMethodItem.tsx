
import React, { useEffect } from 'react';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X, CreditCard, Cash, Building, CreditCardIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../form/formSchema';
import { motion } from 'framer-motion';

interface PaymentMethodItemProps {
  index: number;
  field: Record<string, any>;
  onRemove: (index: number) => void;
}

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({ index, field, onRemove }) => {
  const form = useFormContext<FormValues>();
  
  // Use watch for reactivity - this will trigger re-render when the checkbox changes
  const isEnabled = form.watch(`paymentMethods.${index}.enabled`);
  const isCustomMethod = !['cash', 'credit-card', 'debit-card', 'bank-transfer'].includes(field.id);

  // Get icon based on payment method type
  const getMethodIcon = () => {
    switch (field.id) {
      case 'cash':
        return <Cash className="h-4 w-4 text-green-500" />;
      case 'bank-transfer':
        return <Building className="h-4 w-4 text-blue-500" />;
      case 'credit-card':
      case 'debit-card':
        return <CreditCard className="h-4 w-4 text-purple-500" />;
      default:
        return <CreditCardIcon className="h-4 w-4 text-indigo-500" />;
    }
  };

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
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <FormField
        control={form.control}
        name={`paymentMethods.${index}.enabled`}
        render={({ field: checkboxField }) => (
          <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border border-indigo-100 dark:border-indigo-900 p-4 transition-all hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30">
            <div className="flex items-center space-x-3">
              <FormControl>
                <Checkbox
                  checked={checkboxField.value}
                  onCheckedChange={checkboxField.onChange}
                  className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer flex items-center gap-2">
                {getMethodIcon()}
                <span className="text-indigo-900 dark:text-indigo-100">{field.name}</span>
                {field.id === 'bank-transfer' && isEnabled && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    Configure Details
                  </span>
                )}
              </FormLabel>
            </div>
            {isCustomMethod && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            )}
          </FormItem>
        )}
      />
    </motion.div>
  );
};

export default PaymentMethodItem;
