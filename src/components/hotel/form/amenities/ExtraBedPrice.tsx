
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { DollarSign } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../formSchema';

interface ExtraBedPriceProps {
  price?: number;
}

const ExtraBedPrice: React.FC<ExtraBedPriceProps> = ({ price = 0 }) => {
  const form = useFormContext<FormValues>();
  const [inputValue, setInputValue] = useState<string>(price === 0 ? '' : price.toString());
  
  // Update local state when price prop changes
  useEffect(() => {
    if (price !== undefined) {
      setInputValue(price === 0 ? '' : price.toString());
    }
  }, [price]);
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input for better editing experience
    setInputValue(value);
    
    // Only update form when value is valid or empty (will convert to 0)
    const numericValue = value === '' ? 0 : parseFloat(value);
    if (!isNaN(numericValue)) {
      form.setValue('extraBedPolicy.pricePerNight', numericValue, {
        shouldValidate: true,
        shouldDirty: true
      });
    }
  };
  
  return (
    <div className="mt-2 flex items-center">
      <div className="text-sm text-muted-foreground mr-2">Price per night:</div>
      <div className="relative w-24">
        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handlePriceChange}
          className="pl-7 h-8 py-1"
          min={0}
          step="0.01"
          placeholder="0.00"
          onBlur={() => {
            // On blur, ensure we have a valid number (at least 0)
            if (inputValue === '' || isNaN(parseFloat(inputValue))) {
              setInputValue('');
              form.setValue('extraBedPolicy.pricePerNight', 0, {
                shouldValidate: true,
                shouldDirty: true
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default ExtraBedPrice;
