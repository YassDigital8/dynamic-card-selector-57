
import { useCallback } from 'react';
import { AmenityHookProps } from './types';
import { useToast } from '@/hooks/use-toast';
import { FileInfo } from '@/models/FileModel';
import { amenitiesWithImages } from '../constants';

interface UseAmenityAddMultipleImagesProps {
  form: AmenityHookProps['form'];
  hotelId?: string;
  selectedAmenity: string;
}

export const useAmenityAddMultipleImages = ({ 
  form, 
  selectedAmenity 
}: UseAmenityAddMultipleImagesProps) => {
  const { toast } = useToast();
  
  const handleAddMultipleImages = useCallback((files: FileInfo[]) => {
    if (!selectedAmenity || files.length === 0) {
      console.log('Missing selectedAmenity or files');
      return;
    }
    
    // Format this as a valid field path that TypeScript can understand
    const imageFieldPath = `amenities.${selectedAmenity}Images`;
    
    // Get the current images using getValues with a proper type assertion
    const formValues = form.getValues();
    const amenitiesValues = formValues.amenities || {};
    
    // Access images in a type-safe way
    const currentImages = amenitiesValues[`${selectedAmenity}Images` as keyof typeof amenitiesValues] || [];
    
    console.log(`Adding ${files.length} images to ${selectedAmenity}`);
    
    // First, ensure the amenity is enabled
    if (!formValues.amenities?.[selectedAmenity as keyof typeof amenitiesValues]) {
      // Enable the amenity in a type-safe way using bracket notation and type assertion
      form.setValue(`amenities.${selectedAmenity}` as any, true, { 
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
    }
    
    // Find the proper display label for the toast
    const amenityLabel = amenitiesWithImages[selectedAmenity] || selectedAmenity;
    
    const newImages = files.map((file, index) => ({
      url: file.url,
      description: file.metadata?.altText || `${amenityLabel} image ${index + 1}`,
      title: file.metadata?.title || file.name,
      caption: file.metadata?.caption || '',
      id: `${selectedAmenity}-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      metadata: file.metadata
    }));
    
    const updatedImages = Array.isArray(currentImages) 
      ? [...currentImages, ...newImages] 
      : [...newImages];
    
    // Use a type assertion to handle the dynamic path
    form.setValue(imageFieldPath as any, updatedImages, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
    
    // Force form validation
    form.trigger();
    
    toast({
      title: "Images added",
      description: `${files.length} images were added to ${amenityLabel}. Don't forget to save your changes.`,
      variant: "default",
    });
  }, [form, selectedAmenity, toast]);

  return { handleAddMultipleImages };
};
