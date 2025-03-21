
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FileInfo } from '@/models/FileModel';
import { useToast } from '@/hooks/use-toast';
import { amenitiesWithImages } from './constants';
import { FormValues } from '../formSchema';
import { AmenityWithImages } from './types';

interface UseAddMultipleImagesParams {
  form: UseFormReturn<FormValues>;
  selectedAmenity: AmenityWithImages | null;
}

export const useAddMultipleImages = ({ form, selectedAmenity }: UseAddMultipleImagesParams) => {
  const { toast } = useToast();
  
  const handleAddMultipleImages = useCallback((files: FileInfo[]) => {
    if (!selectedAmenity || files.length === 0) {
      console.log('Missing selectedAmenity or files:', { selectedAmenity, fileCount: files.length });
      return;
    }
    
    const imageFieldName = `amenities.${selectedAmenity}Images` as const;
    // Ensure we get the current state of the images array
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    console.log(`Adding ${files.length} images to ${selectedAmenity}`);
    console.log('Files to add:', files);
    
    // First, ensure the amenity is enabled
    if (!form.getValues(`amenities.${selectedAmenity}`)) {
      console.log(`Enabling ${selectedAmenity} since images are being added`);
      form.setValue(`amenities.${selectedAmenity}`, true, { 
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
    }
    
    const newImages = files.map((file, index) => ({
      url: file.url,
      description: file.metadata?.altText || `${amenitiesWithImages[selectedAmenity]} image ${index + 1}`,
      title: file.metadata?.title || file.name,
      caption: file.metadata?.caption || '',
      id: `${selectedAmenity}-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      metadata: file.metadata
    }));
    
    // Create a new array with the existing images plus the new ones
    // Make sure to handle the case where currentImages might not be an array
    const updatedImages = Array.isArray(currentImages) 
      ? [...currentImages, ...newImages] 
      : [...newImages];
    
    // Set the images array with proper dirty flag to mark the form as changed
    form.setValue(imageFieldName as any, updatedImages, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
    
    // Force form state update to ensure changes are recognized
    form.trigger();
    
    // Verify updated images
    const verifiedImages = form.getValues(imageFieldName as any);
    console.log('Updated images after adding multiple:', verifiedImages);
    console.log('Form is dirty:', form.formState.isDirty);
    
    // Notify user
    toast({
      title: "Images added",
      description: `${files.length} images were added to ${amenitiesWithImages[selectedAmenity]}. Don't forget to save your changes.`,
      variant: "default",
    });
  }, [form, selectedAmenity, toast]);

  return { handleAddMultipleImages };
};
