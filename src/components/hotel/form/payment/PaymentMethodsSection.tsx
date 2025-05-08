
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FormValues } from '../schemas/formSchema';
import { CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { defaultBankAccountDetails } from '../formDefaults';
import { DEFAULT_PAYMENT_METHODS } from './paymentMethodConstants';
import PaymentMethodItem from './PaymentMethodItem';

const PaymentMethodsSection: React.FC = () => {
  const form = useFormContext<FormValues>();
  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control: form.control,
    name: 'paymentMethods'
  });

  // Initialize payment methods if empty
  React.useEffect(() => {
    if (fields.length === 0) {
      console.log("Initializing payment methods with defaults");
      
      // Use a Set to track unique method IDs
      const addedMethodIds = new Set<string>();
      
      DEFAULT_PAYMENT_METHODS.forEach(method => {
        // Skip if this method ID has already been added
        if (addedMethodIds.has(method.id)) {
          console.log(`Skipping duplicate payment method: ${method.id}`);
          return;
        }
        
        // Add this method ID to our tracking set
        addedMethodIds.add(method.id);
        
        if (method.id === 'bank-transfer') {
          console.log("Adding bank transfer method with account details");
          append({
            ...method,
            enabled: false, // Make sure none are enabled by default
            bankAccountDetails: defaultBankAccountDetails
          });
        } else {
          append({
            ...method,
            enabled: false // Make sure none are enabled by default
          });
        }
      });
    }
  }, [fields.length, append]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Methods
        </CardTitle>
        <CardDescription>
          Configure which payment methods are accepted at your hotel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <PaymentMethodItem
              key={field.id}
              index={index}
              field={field}
              onRemove={() => remove(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsSection;
