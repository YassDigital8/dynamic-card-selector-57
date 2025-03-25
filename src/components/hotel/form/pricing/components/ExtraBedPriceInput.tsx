
import React, { useState } from 'react';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../formSchema';
import { DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ExtraBedPriceInput: React.FC = () => {
  const form = useFormContext<FormValues>();
  
  return (
    <FormField
      control={form.control}
      name="extraBedPolicy.pricePerNight"
      render={({ field }) => {
        const [inputValue, setInputValue] = useState(field.value?.toString() || '0');
        
        return (
          <FormItem>
            <FormLabel>Price per Night</FormLabel>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <DollarSign className="h-4 w-4 text-gray-500" />
              </div>
              <FormControl>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={inputValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    setInputValue(value);
                    
                    // Update form value if valid number or empty (will convert to 0)
                    const numericValue = value === '' ? 0 : parseFloat(value);
                    if (!isNaN(numericValue)) {
                      field.onChange(numericValue);
                    }
                  }}
                  onBlur={() => {
                    // On blur, ensure we have a valid number (at least 0)
                    if (inputValue === '' || isNaN(parseFloat(inputValue))) {
                      setInputValue('0');
                      field.onChange(0);
                    }
                  }}
                  className="pl-10"
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ExtraBedPriceInput;
