
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../schemas/formSchema';

interface UseRoomTypeFormProps {
  form: UseFormReturn<FormValues>;
  index: number;
}

export const useRoomTypeForm = ({ form, index }: UseRoomTypeFormProps) => {
  const [hasExtraBed, setHasExtraBed] = useState<boolean>(false);
  
  // Watch for changes in the allowExtraBed field
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === `roomTypes.${index}.allowExtraBed`) {
        const extraBedEnabled = form.getValues(`roomTypes.${index}.allowExtraBed`);
        setHasExtraBed(!!extraBedEnabled);
      }
    });
    
    // Set initial value
    setHasExtraBed(!!form.getValues(`roomTypes.${index}.allowExtraBed`));
    
    return () => subscription.unsubscribe();
  }, [form, index]);
  
  return {
    hasExtraBed
  };
};
