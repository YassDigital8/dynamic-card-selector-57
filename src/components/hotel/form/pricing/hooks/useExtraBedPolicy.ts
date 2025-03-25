
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues } from '../../formSchema';

export const useExtraBedPolicy = () => {
  const form = useFormContext<FormValues>();
  const amenities = form.watch('amenities') || {};
  const extraBedEnabled = amenities.extraBed || false;
  
  // Watch for price changes to force updates
  const pricePerNight = useWatch({
    control: form.control,
    name: 'extraBedPolicy.pricePerNight',
    defaultValue: 0
  });

  // Initialize extra bed policy if not present
  useEffect(() => {
    if (!form.getValues('extraBedPolicy') && extraBedEnabled) {
      form.setValue('extraBedPolicy', {
        pricePerNight: 0,
        availableForRoomTypes: [],
        maxExtraBedsPerRoom: 1,
        notes: ''
      }, { shouldValidate: true });
    }
  }, [form, extraBedEnabled]);

  // Log when the price changes to debug
  useEffect(() => {
    if (extraBedEnabled) {
      console.log('Extra bed price updated:', pricePerNight);
    }
  }, [extraBedEnabled, pricePerNight]);

  return { extraBedEnabled, pricePerNight };
};
