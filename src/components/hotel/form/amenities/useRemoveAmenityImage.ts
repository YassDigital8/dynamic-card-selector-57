
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { amenitiesWithImages } from './constants';
import { FormValues } from '../formSchema';

export const useRemoveAmenityImage = (form: UseFormReturn<FormValues>) => {
  const { toast } = useToast();
  
  const handleRemoveImage = useCallback((amenityName: string, index: number) => {
    const imageFieldName = `amenities.${amenityName}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    console.log(`Removing image at index ${index} from ${amenityName}`);
    console.log('Current images before removal:', currentImages);
    
    if (!Array.isArray(currentImages)) {
      console.error('Images field is not an array:', currentImages);
      return;
    }
    
    if (index < 0 || index >= currentImages.length) {
      console.error('Invalid image index:', index);
      return;
    }
    
    // Create a new array without the image at the specified index
    const updatedImages = currentImages.filter((_, i) => i !== index);
    
    form.setValue(imageFieldName as any, updatedImages, { 
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true 
    });
    
    // Force form state update to ensure changes are recognized
    form.trigger();
    
    // Verify updated images
    const imagesAfterRemoval = form.getValues(imageFieldName as any);
    console.log('Images after removal:', imagesAfterRemoval);
    console.log('Form is dirty:', form.formState.isDirty);
    
    // Notify user
    toast({
      title: "Image removed",
      description: `Image was removed from ${amenitiesWithImages[amenityName]}. Don't forget to save your changes.`,
      variant: "default",
    });
  }, [form, toast]);

  return { handleRemoveImage };
};
