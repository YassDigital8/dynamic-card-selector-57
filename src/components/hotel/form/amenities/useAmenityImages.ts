
import { useState, useEffect, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AmenityImage } from '@/models/HotelModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { FileInfo } from '@/models/FileModel';
import { useToast } from '@/hooks/use-toast';
import { amenitiesWithImages } from './constants';
import { FormValues } from '../formSchema';

type AmenityWithImages = 'bar' | 'gym' | 'spa' | 'restaurant' | 'breakfast' | 'swimmingPool';

interface UseAmenityImagesProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

export const useAmenityImages = ({ form, hotelId }: UseAmenityImagesProps) => {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityWithImages | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Debug current amenity values
  useEffect(() => {
    const amenities = form.getValues('amenities');
    console.log('useAmenityImages - Current form amenities:', amenities);
    
    // Check all image fields systematically
    Object.keys(amenitiesWithImages).forEach(key => {
      const amenityKey = key as AmenityWithImages;
      const enabled = amenities[amenityKey];
      const imagesKey = `${amenityKey}Images` as keyof typeof amenities;
      const images = amenities[imagesKey];
      
      console.log(`${amenitiesWithImages[amenityKey]} (${amenityKey}): enabled=${enabled}, images=${Array.isArray(images) ? images.length : 'none'}`);
      
      if (enabled && Array.isArray(images) && images.length > 0) {
        console.log(`First image for ${amenityKey}:`, images[0]);
      }
    });
    
    // For critical debugging, monitor changes
    const subscription = form.watch((value, { name, type }) => {
      if (name?.startsWith('amenities.') && name.includes('Images')) {
        console.log(`Form field changed: ${name}`, value);
        console.log('Form is dirty:', form.formState.isDirty);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  const openImageDialog = useCallback((amenityName: string) => {
    // Extract just the amenity key from the full path (e.g., "amenities.bar" -> "bar")
    const amenityKey = amenityName.split('.')[1] as AmenityWithImages;
    console.log('Opening image dialog for:', amenityKey);
    setSelectedAmenity(amenityKey);
    setIsImageDialogOpen(true);
  }, []);
  
  const handleAddImage = useCallback((imageUrl: string, metadata?: FileMetadataValues) => {
    if (!selectedAmenity || !imageUrl) {
      console.log('Missing selectedAmenity or imageUrl:', { selectedAmenity, imageUrl });
      return;
    }
    
    const imageFieldName = `amenities.${selectedAmenity}Images` as const;
    // Ensure we get the current state of the images array
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    const newImage: AmenityImage = {
      url: imageUrl,
      description: metadata?.altText || `${amenitiesWithImages[selectedAmenity]} image`,
      title: metadata?.title || '',
      caption: metadata?.caption || '',
      id: `${selectedAmenity}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      metadata: metadata
    };
    
    console.log(`Adding image to ${selectedAmenity}:`, newImage);
    console.log('Current images before adding:', currentImages);
    
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
    // Make sure to handle the case where currentImages might not be an array
    const updatedImages = Array.isArray(currentImages) 
      ? [...currentImages, newImage] 
      : [newImage];
    
    // Set the images array with proper dirty flag to mark the form as changed
    form.setValue(imageFieldName as any, updatedImages, { 
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
    
    // Force form state update to ensure changes are recognized
    form.trigger();
    
    // Get updated images to verify
    const verifiedImages = form.getValues(imageFieldName as any);
    console.log('Updated images after adding:', verifiedImages);
    console.log('Form is dirty:', form.formState.isDirty);
    
    // Log the entire form state for debugging
    console.log('Complete form state after image add:', form.getValues());
    
    // Notify user
    toast({
      title: "Image added",
      description: `Image was added to ${amenitiesWithImages[selectedAmenity]}. Don't forget to save your changes.`,
      variant: "default",
    });
    
    setIsImageDialogOpen(false);
  }, [form, selectedAmenity, toast]);

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
    
    // Log the entire form state for debugging
    console.log('Complete form state after multiple images add:', form.getValues());
    
    // Notify user
    toast({
      title: "Images added",
      description: `${files.length} images were added to ${amenitiesWithImages[selectedAmenity]}. Don't forget to save your changes.`,
      variant: "default",
    });
    
    setIsImageDialogOpen(false);
  }, [form, selectedAmenity, toast]);
  
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
    
    // Log the entire form state for debugging
    console.log('Complete form state after image removal:', form.getValues());
    
    // Notify user
    toast({
      title: "Image removed",
      description: `Image was removed from ${amenitiesWithImages[amenityName]}. Don't forget to save your changes.`,
      variant: "default",
    });
  }, [form, toast]);
  
  const handleCloseDialog = useCallback(() => {
    setIsImageDialogOpen(false);
  }, []);

  return {
    selectedAmenity,
    isImageDialogOpen,
    openImageDialog,
    handleAddImage,
    handleAddMultipleImages,
    handleRemoveImage,
    handleCloseDialog
  };
};

export default useAmenityImages;
