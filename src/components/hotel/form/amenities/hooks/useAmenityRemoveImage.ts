
import { useCallback } from 'react';
import { AmenityHookProps, AmenityKeyType } from './types';
import { useToast } from '@/hooks/use-toast';
import { amenitiesWithImages } from '../constants';

export const useAmenityRemoveImage = ({ form }: AmenityHookProps) => {
  const { toast } = useToast();
  
  const handleRemoveImage = useCallback((amenityName: string, index: number) => {
    const imageFieldName = `amenities.${amenityName}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    console.log(`Removing image at index ${index} from ${amenityName}`);
    
    if (!Array.isArray(currentImages) || index < 0 || index >= currentImages.length) {
      console.error('Invalid image array or index:', currentImages, index);
      return;
    }
    
    const updatedImages = currentImages.filter((_, i) => i !== index);
    
    form.setValue(imageFieldName as any, updatedImages, { 
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true 
    });
    
    // Force form validation
    form.trigger();
    
    toast({
      title: "Image removed",
      description: `Image was removed from ${amenitiesWithImages[amenityName as AmenityKeyType]}. Don't forget to save your changes.`,
      variant: "default",
    });
  }, [form, toast]);

  return { handleRemoveImage };
};
