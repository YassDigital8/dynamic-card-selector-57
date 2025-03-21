
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { amenitiesWithImages } from './constants';
import { FormValues } from '../formSchema';

export const useAmenityFormMonitor = (form: UseFormReturn<FormValues>) => {
  // Debug current amenity values
  useEffect(() => {
    const amenities = form.getValues('amenities');
    console.log('useAmenityImages - Current form amenities:', amenities);
    
    // Check all image fields systematically
    Object.keys(amenitiesWithImages).forEach(key => {
      const amenityKey = key as keyof typeof amenitiesWithImages;
      const enabled = amenities[amenityKey];
      const imagesKey = `${amenityKey}Images` as keyof typeof amenities;
      const images = amenities[imagesKey];
      
      console.log(`${amenitiesWithImages[amenityKey]} (${amenityKey}): enabled=${enabled}, images=${Array.isArray(images) ? images.length : 'none'}`);
      
      if (enabled && Array.isArray(images) && images.length > 0) {
        console.log(`First image for ${amenityKey}:`, images[0]);
      }
    });
    
    // For critical debugging, monitor changes
    const subscription = form.watch((value, { name, type }) => {
      if (name?.startsWith('amenities.') && name.includes('Images')) {
        console.log(`Form field changed: ${name}`, value);
        console.log('Form is dirty:', form.formState.isDirty);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
};
