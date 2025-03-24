
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentMethodsSection, BankDetailsSection } from './payment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Building } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues } from './formSchema';

const ExtendedFeaturesSection: React.FC = () => {
  const form = useFormContext<FormValues>();
  
  // Watch payment methods to determine if bank transfer is enabled
  const paymentMethods = useWatch({
    control: form.control,
    name: 'paymentMethods',
    defaultValue: []
  });
  
  // Check if bank transfer is enabled
  const bankTransferMethod = paymentMethods.find(method => method.id === 'bank-transfer' && method.enabled);
  const showBankDetailsTab = !!bankTransferMethod;
  
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Payment Options</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="payment" className="space-y-4">
          <TabsList className={`grid ${showBankDetailsTab ? 'grid-cols-2' : 'grid-cols-1'}`}>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment Methods</span>
            </TabsTrigger>
            {showBankDetailsTab && (
              <TabsTrigger value="bank-details" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Bank Details</span>
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="payment" className="mt-0">
            <PaymentMethodsSection />
          </TabsContent>
          
          {showBankDetailsTab && (
            <TabsContent value="bank-details" className="mt-0">
              <BankDetailsSection bankTransferMethod={bankTransferMethod} />
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExtendedFeaturesSection;
