
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LocationMapPicker from './location/LocationMapPicker';
import { PaymentMethodsSection, BankDetailsSection } from './payment';
import ExtraBedPricingSection from './pricing/ExtraBedPricingSection';
import HotelPreviewCard from './preview/HotelPreviewCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, CreditCard, Bed, Eye, Building } from 'lucide-react';
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
        <CardTitle className="text-xl">Extended Features</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="location" className="space-y-4">
          <TabsList className={`grid ${showBankDetailsTab ? 'grid-cols-5' : 'grid-cols-4'}`}>
            <TabsTrigger value="location" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Location</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            {showBankDetailsTab && (
              <TabsTrigger value="bank-details" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Bank Details</span>
              </TabsTrigger>
            )}
            <TabsTrigger value="extra-bed" className="flex items-center gap-2">
              <Bed className="h-4 w-4" />
              <span className="hidden sm:inline">Extra Bed</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="location" className="mt-0">
            <LocationMapPicker />
          </TabsContent>
          
          <TabsContent value="payment" className="mt-0">
            <PaymentMethodsSection />
          </TabsContent>
          
          {showBankDetailsTab && (
            <TabsContent value="bank-details" className="mt-0">
              <BankDetailsSection bankTransferMethod={bankTransferMethod} />
            </TabsContent>
          )}
          
          <TabsContent value="extra-bed" className="mt-0">
            <ExtraBedPricingSection />
          </TabsContent>
          
          <TabsContent value="preview" className="mt-0">
            <HotelPreviewCard />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExtendedFeaturesSection;
