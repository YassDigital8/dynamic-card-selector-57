
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AmenityImage } from '@/models/HotelModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { useToast } from '@/hooks/use-toast';
import { amenitiesWithImages } from './constants';
import { FormValues } from '../formSchema';

interface UseAmenityAddImageProps {
  form: UseFormReturn<FormValues>;
  selectedAmenity: string | null;
}

export const useAmenityAddImage = ({ form, selectedAmenity }: UseAmenityAddImageProps) => {
  const { toast } = useToast();
  
  const handleAddImage = useCallback((imageUrl: string, metadata?: FileMetadataValues) => {
    if (!selectedAmenity || !imageUrl) {
      console.log('Missing selectedAmenity or imageUrl:', { selectedAmenity, imageUrl });
      return;
    }
    
    const imageFieldName = `amenities.${selectedAmenity}Images`;
    // Ensure we get the current state of the images array
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    const newImage: AmenityImage = {
      url: imageUrl,
      description: metadata?.altText || `${amenitiesWithImages[selectedAmenity as keyof typeof amenitiesWithImages]} image`,
      title: metadata?.title || '',
      caption: metadata?.caption || '',
      id: `${selectedAmenity}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      metadata: metadata
    };
    
    console.log(`Adding image to ${selectedAmenity}:`, newImage);
    
    // First, ensure the amenity is enabled
    if (!form.getValues(`amenities.${selectedAmenity}`)) {
      console.log(`Enabling ${selectedAmenity} since an image is being added`);
      form.setValue(`amenities.${selectedAmenity}`, true, { 
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
    }
    
    // Create a new array with the existing images plus the new one
    const updatedImages = Array.isArray(currentImages) 
      ? [...currentImages, newImage] 
      : [newImage];
    
    // Set the images array with proper dirty flag to mark the form as changed
    form.setValue(imageFieldName as any, updatedImages, { 
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
    
    // Force form validation
    setTimeout(() => {
      form.trigger('amenities');
      form.trigger();
    }, 10);
    
    // Notify user
    toast({
      title: "Image added",
      description: `Image was added to ${amenitiesWithImages[selectedAmenity as keyof typeof amenitiesWithImages]}`,
    });
  }, [form, selectedAmenity, toast]);

  return { handleAddImage };
};
