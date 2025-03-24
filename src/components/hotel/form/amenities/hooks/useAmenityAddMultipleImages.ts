
import { useCallback } from 'react';
import { AmenityHookProps } from './types';
import { useToast } from '@/hooks/use-toast';
import { FileInfo } from '@/models/FileModel';
import { amenitiesWithImages } from '../constants';

interface UseAmenityAddMultipleImagesProps extends AmenityHookProps {
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
    
    const imageFieldName = `amenities.${selectedAmenity}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    console.log(`Adding ${files.length} images to ${selectedAmenity}`);
    
    // First, ensure the amenity is enabled
    if (!form.getValues(`amenities.${selectedAmenity}`)) {
      form.setValue(`amenities.${selectedAmenity}`, true, { 
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
    
    form.setValue(imageFieldName as any, updatedImages, {
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
