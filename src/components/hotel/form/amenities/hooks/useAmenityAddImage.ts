
import { useCallback } from 'react';
import { AmenityHookProps, SelectedAmenityType } from './types';
import { useToast } from '@/hooks/use-toast';
import { AmenityImage } from '@/models/HotelModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';

interface UseAmenityAddImageProps extends AmenityHookProps {
  selectedAmenity: SelectedAmenityType | null;
}

export const useAmenityAddImage = ({ form, selectedAmenity }: UseAmenityAddImageProps) => {
  const { toast } = useToast();
  
  const handleAddImage = useCallback((imageUrl: string, metadata?: FileMetadataValues) => {
    if (!selectedAmenity || !imageUrl) {
      console.log('Missing selectedAmenity or imageUrl');
      return;
    }
    
    const imageFieldName = `amenities.${selectedAmenity.key}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    const newImage: AmenityImage = {
      url: imageUrl,
      description: metadata?.altText || `${selectedAmenity.label} image`,
      title: metadata?.title || '',
      caption: metadata?.caption || '',
      id: `${selectedAmenity.key}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      metadata
    };
    
    console.log(`Adding image to ${selectedAmenity.key}:`, newImage);
    
    // First, ensure the amenity is enabled
    if (!form.getValues(`amenities.${selectedAmenity.key}`)) {
      form.setValue(`amenities.${selectedAmenity.key}`, true, { 
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
    
    toast({
      title: "Image added",
      description: `Image was added to ${selectedAmenity.label}. Don't forget to save your changes.`,
      variant: "default",
    });
  }, [form, selectedAmenity, toast]);

  return { handleAddImage };
};
