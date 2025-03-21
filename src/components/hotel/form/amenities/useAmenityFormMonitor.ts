
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';

export const useAmenityFormMonitor = (form: UseFormReturn<FormValues>) => {
  useEffect(() => {
    // Subscribe to form changes to debug amenity images
    const subscription = form.watch((value, { name, type }) => {
      if (name?.startsWith('amenities.') && name.includes('Images')) {
        console.log(`AmenityFormMonitor - ${name} changed:`, JSON.stringify(form.getValues(name as any), null, 2));
        console.log('Form is dirty:', form.formState.isDirty);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  return null;
};

export default useAmenityFormMonitor;
