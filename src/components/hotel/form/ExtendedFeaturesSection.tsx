
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentTabs } from './payment/components';

const ExtendedFeaturesSection: React.FC = () => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Payment Options</CardTitle>
      </CardHeader>
      <CardContent>
        <PaymentTabs />
      </CardContent>
    </Card>
  );
};

export default ExtendedFeaturesSection;
