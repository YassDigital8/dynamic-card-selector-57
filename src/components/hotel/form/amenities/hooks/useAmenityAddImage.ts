
import { useCallback } from 'react';
import { AmenityHookProps } from './types';
import { useToast } from '@/hooks/use-toast';
import { AmenityImage } from '@/models/HotelModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { amenitiesWithImages } from '../constants';

interface UseAmenityAddImageProps extends AmenityHookProps {
  selectedAmenity: string;
}

export const useAmenityAddImage = ({ form, selectedAmenity }: UseAmenityAddImageProps) => {
  const { toast } = useToast();
  
  const handleAddImage = useCallback((imageUrl: string, metadata?: FileMetadataValues) => {
    if (!selectedAmenity || !imageUrl) {
      console.log('Missing selectedAmenity or imageUrl');
      return;
    }
    
    const imageFieldName = `amenities.${selectedAmenity}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
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
    if (!form.getValues(`amenities.${selectedAmenity}`)) {
      form.setValue(`amenities.${selectedAmenity}`, true, { 
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
    }
    
    // Add the new image to the array
    const updatedImages = Array.isArray(currentImages) 
      ? [...currentImages, newImage] 
      : [newImage];
    
    form.setValue(imageFieldName as any, updatedImages, { 
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
