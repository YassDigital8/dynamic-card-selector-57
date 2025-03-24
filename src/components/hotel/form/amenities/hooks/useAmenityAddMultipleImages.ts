
import { useCallback } from 'react';
import { AmenityHookProps, SelectedAmenityType } from './types';
import { useToast } from '@/hooks/use-toast';
import { FileInfo } from '@/models/FileModel';

interface UseAmenityAddMultipleImagesProps extends AmenityHookProps {
  selectedAmenity: SelectedAmenityType | null;
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
    
    const imageFieldName = `amenities.${selectedAmenity.key}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    console.log(`Adding ${files.length} images to ${selectedAmenity.key}`);
    
    // First, ensure the amenity is enabled
    if (!form.getValues(`amenities.${selectedAmenity.key}`)) {
      form.setValue(`amenities.${selectedAmenity.key}`, true, { 
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
    }
    
    const newImages = files.map((file, index) => ({
      url: file.url,
      description: file.metadata?.altText || `${selectedAmenity.label} image ${index + 1}`,
      title: file.metadata?.title || file.name,
      caption: file.metadata?.caption || '',
      id: `${selectedAmenity.key}-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
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
      description: `${files.length} images were added to ${selectedAmenity.label}. Don't forget to save your changes.`,
      variant: "default",
    });
  }, [form, selectedAmenity, toast]);

  return { handleAddMultipleImages };
};
