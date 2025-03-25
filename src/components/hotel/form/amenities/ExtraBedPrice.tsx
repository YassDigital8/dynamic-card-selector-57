
import React from 'react';
import { Input } from '@/components/ui/input';
import { DollarSign } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../formSchema';

interface ExtraBedPriceProps {
  price?: number;
}

const ExtraBedPrice: React.FC<ExtraBedPriceProps> = ({ price = 0 }) => {
  const form = useFormContext<FormValues>();
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const sanitizedValue = isNaN(value) ? 0 : value;
    
    form.setValue('extraBedPolicy.pricePerNight', sanitizedValue, {
      shouldValidate: true,
      shouldDirty: true
    });
  };
  
  return (
    <div className="mt-2 flex items-center">
      <div className="text-sm text-muted-foreground mr-2">Price per night:</div>
      <div className="relative w-24">
        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          type="number"
          value={price}
          onChange={handlePriceChange}
          className="pl-7 h-8 py-1"
          min={0}
          step="0.01"
        />
      </div>
    </div>
  );
};

export default ExtraBedPrice;
