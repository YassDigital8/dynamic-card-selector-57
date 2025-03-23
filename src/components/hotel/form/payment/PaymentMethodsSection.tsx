
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { defaultBankAccountDetails } from '../formDefaults';
import { DEFAULT_PAYMENT_METHODS } from './paymentMethodConstants';
import PaymentMethodItem from './PaymentMethodItem';
import AddPaymentMethod from './AddPaymentMethod';

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
      DEFAULT_PAYMENT_METHODS.forEach(method => {
        if (method.id === 'bank-transfer') {
          console.log("Adding bank transfer method with account details");
          append({
            ...method,
            bankAccountDetails: defaultBankAccountDetails
          });
        } else {
          append(method);
        }
      });
    }
  }, [fields.length, append]);
  
  const handleAddPaymentMethod = (name: string) => {
    append({
      id: `method-${Date.now()}`,
      name: name.trim(),
      enabled: true
    });
  };
  
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
          
          <Separator className="my-4" />
          
          <AddPaymentMethod onAdd={handleAddPaymentMethod} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsSection;
