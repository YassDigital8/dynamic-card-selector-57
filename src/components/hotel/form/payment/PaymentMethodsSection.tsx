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
  return <Card>
      
      
    </Card>;
};
export default PaymentMethodsSection;