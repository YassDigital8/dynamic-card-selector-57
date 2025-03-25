import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues } from '../../formSchema';
import { useEffect } from 'react';

export const useExtraBedPolicy = () => {
  const form = useFormContext<FormValues>();
  
  // Watch the extraBed amenity toggle
  const extraBedEnabled = useWatch({
    control: form.control,
    name: 'amenities.extraBed',
    defaultValue: false
  });
  
  // Watch the extraBed price to keep it in sync
  const extraBedPrice = useWatch({
    control: form.control,
    name: 'extraBedPolicy.pricePerNight',
    defaultValue: 0
  });
  
  // Update the pricing field when the extraBed is toggled on
  useEffect(() => {
    if (extraBedEnabled && !form.getValues('extraBedPolicy')) {
      // Initialize extra bed policy with default values
      form.setValue('extraBedPolicy', {
        pricePerNight: 0, // This allows modifying - not fixed anymore
        availableForRoomTypes: [],
        maxExtraBedsPerRoom: 1,
        notes: ''
      }, { shouldValidate: true });
    }
  }, [extraBedEnabled, form]);
  
  return {
    extraBedEnabled,
    extraBedPrice
  };
};
