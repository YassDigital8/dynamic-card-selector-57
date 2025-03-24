
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bed } from 'lucide-react';
import { 
  ExtraBedPriceInput, 
  MaxExtraBedsRadioGroup, 
  RoomTypeSelector, 
  ExtraBedNotes,
  DisabledState
} from './components';
import { useExtraBedPolicy } from './hooks/useExtraBedPolicy';

const ExtraBedPricingSection: React.FC = () => {
  const { extraBedEnabled } = useExtraBedPolicy();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Bed className="h-5 w-5 text-blue-500" />
          Extra Bed Pricing
        </CardTitle>
      </CardHeader>
      
      {!extraBedEnabled ? (
        <DisabledState />
      ) : (
        <CardContent>
          <div className="space-y-4">
            <ExtraBedPriceInput />
            <MaxExtraBedsRadioGroup />
            <RoomTypeSelector />
            <ExtraBedNotes />
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ExtraBedPricingSection;
