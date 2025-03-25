
import { useCallback } from 'react';
import { AmenityHookProps } from './types';
import { useToast } from '@/hooks/use-toast';
import { AmenityImage } from '@/models/HotelModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { amenitiesWithImages } from '../constants';

interface UseAmenityAddImageProps {
  form: AmenityHookProps['form'];
  hotelId?: string;
  selectedAmenity: string;
}

export const useAmenityAddImage = ({ form, selectedAmenity }: UseAmenityAddImageProps) => {
  const { toast } = useToast();
  
  const handleAddImage = useCallback((imageUrl: string, metadata?: FileMetadataValues) => {
    if (!selectedAmenity || !imageUrl) {
      console.log('Missing selectedAmenity or imageUrl');
      return;
    }
    
    // Format this as a valid field path that TypeScript can understand
    const imageFieldPath = `amenities.${selectedAmenity}Images`;
    
    // Get the current images using getValues with a proper type assertion
    const formValues = form.getValues();
    const amenitiesValues = formValues.amenities || {};
    
    // Access images in a type-safe way
    const currentImages = amenitiesValues[`${selectedAmenity}Images` as keyof typeof amenitiesValues] || [];
    
    const newImage: AmenityImage = {
      url: imageUrl,
      description: metadata?.altText || `${selectedAmenity} image`,
      title: metadata?.title || '',
      caption: metadata?.caption || '',
      id: `${selectedAmenity}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      metadata
    };
    
    console.log(`Adding image to ${selectedAmenity}:`, newImage);
    
    // First, ensure the amenity is enabled
    if (!formValues.amenities?.[selectedAmenity as keyof typeof amenitiesValues]) {
      // Enable the amenity in a type-safe way using bracket notation for type safety
      form.setValue(`amenities.${selectedAmenity}` as any, true, { 
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
    }
    
    // Add the new image to the array
    const updatedImages = Array.isArray(currentImages) 
      ? [...currentImages, newImage] 
      : [newImage];
    
    // Use a type assertion to handle the dynamic path
    form.setValue(imageFieldPath as any, updatedImages, { 
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
    
    // Force form validation
    form.trigger();
    
    // Find the proper display label for the toast
    const amenityLabel = amenitiesWithImages[selectedAmenity] || selectedAmenity;
    
    toast({
      title: "Image added",
      description: `Image was added to ${amenityLabel}. Don't forget to save your changes.`,
      variant: "default",
    });
  }, [form, selectedAmenity, toast]);

  return { handleAddImage };
};
