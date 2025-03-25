
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FileInfo } from '@/models/FileModel';
import { useToast } from '@/hooks/use-toast';
import { amenitiesWithImages } from '../constants';
import { FormValues } from '../../formSchema';

interface UseAmenityAddMultipleImagesProps {
  form: UseFormReturn<FormValues>;
  selectedAmenity: string | null;
}

export const useAmenityAddMultipleImages = ({ form, selectedAmenity }: UseAmenityAddMultipleImagesProps) => {
  const { toast } = useToast();
  
  const handleAddMultipleImages = useCallback((files: FileInfo[]) => {
    if (!selectedAmenity || files.length === 0) {
      console.log('Missing selectedAmenity or files:', { selectedAmenity, fileCount: files.length });
      return;
    }
    
    const imageFieldName = `amenities.${selectedAmenity}Images`;
    // Ensure we get the current state of the images array
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    console.log(`Adding ${files.length} images to ${selectedAmenity}`);
    
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
      description: file.metadata?.altText || `${amenitiesWithImages[selectedAmenity as keyof typeof amenitiesWithImages]} image ${index + 1}`,
      title: file.metadata?.title || file.name,
      caption: file.metadata?.caption || '',
      id: `${selectedAmenity}-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      metadata: file.metadata
    }));
    
    // Create a new array with the existing images plus the new ones
    const updatedImages = Array.isArray(currentImages) 
      ? [...currentImages, ...newImages] 
      : [...newImages];
    
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
      title: "Images added",
      description: `${files.length} images were added to ${amenitiesWithImages[selectedAmenity as keyof typeof amenitiesWithImages]}`,
    });
  }, [form, selectedAmenity, toast]);

  return { handleAddMultipleImages };
};
