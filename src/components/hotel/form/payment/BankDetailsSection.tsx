
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../formSchema';
import BankAccountDetails from './BankAccountDetails';

interface BankDetailsSectionProps {
  bankTransferMethod: any;
}

const BankDetailsSection: React.FC<BankDetailsSectionProps> = ({ bankTransferMethod }) => {
  const form = useFormContext<FormValues>();
  
  // Find the index of the bank transfer method in the payment methods array
  const paymentMethods = form.getValues('paymentMethods') || [];
  const bankMethodIndex = paymentMethods.findIndex(method => method.id === 'bank-transfer');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Bank Account Information
        </CardTitle>
        <CardDescription>
          These bank details will be shown to customers who want to pay via bank transfer
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bankMethodIndex >= 0 ? (
          <BankAccountDetails paymentMethodIndex={bankMethodIndex} />
        ) : (
          <div className="text-center p-4 text-muted-foreground">
            Please enable Bank Transfer in the Payment tab first.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BankDetailsSection;
