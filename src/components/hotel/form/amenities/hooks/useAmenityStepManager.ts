
import { useState, useCallback, useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { FormValues } from '../../formSchema';
import { amenitiesWithImages } from '../constants';
import { FileInfo } from '@/models/FileModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { AmenityImage } from '@/models/HotelModel';

interface UseAmenityStepManagerProps {
  form: UseFormReturn<FormValues>;
  hotelId?: string;
}

export type AmenityKeyType = keyof typeof amenitiesWithImages;

export interface SelectedAmenityType {
  key: AmenityKeyType;
  label: string;
}

export const useAmenityStepManager = ({ form, hotelId }: UseAmenityStepManagerProps) => {
  const { toast } = useToast();
  const [selectedAmenity, setSelectedAmenity] = useState<SelectedAmenityType | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  
  // Watch the form's amenities to detect changes
  const amenities = useWatch({
    control: form.control,
    name: 'amenities'
  });

  // Check if any amenity is enabled
  const hasEnabledAmenities = useCallback(() => {
    if (!amenities) return false;
    
    return Object.entries(amenities)
      .filter(([key, value]) => typeof value === 'boolean')
      .some(([_, value]) => value === true);
  }, [amenities]);

  // Log amenity status changes
  useEffect(() => {
    console.log('Amenities updated:', amenities);
    console.log('Any amenity enabled:', hasEnabledAmenities());
  }, [amenities, hasEnabledAmenities]);

  // Open the image dialog for a specific amenity
  const openImageDialog = useCallback((amenityKey: string) => {
    // Extract the amenity key from the full path (e.g., "amenities.bar" -> "bar")
    const key = amenityKey.split('.')[1] as AmenityKeyType;
    
    if (!amenitiesWithImages[key]) {
      console.error('Invalid amenity key:', key);
      return;
    }
    
    console.log('Opening image dialog for:', key);
    setSelectedAmenity({
      key,
      label: amenitiesWithImages[key]
    });
    setIsImageDialogOpen(true);
  }, []);
  
  // Close the image dialog
  const handleCloseDialog = useCallback(() => {
    setIsImageDialogOpen(false);
  }, []);

  // Add a single image to an amenity
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

  // Add multiple images to an amenity
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

  // Remove an image from an amenity
  const handleRemoveImage = useCallback((amenityName: string, index: number) => {
    const imageFieldName = `amenities.${amenityName}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    console.log(`Removing image at index ${index} from ${amenityName}`);
    
    if (!Array.isArray(currentImages) || index < 0 || index >= currentImages.length) {
      console.error('Invalid image array or index:', currentImages, index);
      return;
    }
    
    const updatedImages = currentImages.filter((_, i) => i !== index);
    
    form.setValue(imageFieldName as any, updatedImages, { 
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true 
    });
    
    // Force form validation
    form.trigger();
    
    toast({
      title: "Image removed",
      description: `Image was removed from ${amenitiesWithImages[amenityName as AmenityKeyType]}. Don't forget to save your changes.`,
      variant: "default",
    });
  }, [form, toast]);

  return {
    selectedAmenity,
    isImageDialogOpen,
    openImageDialog,
    handleAddImage,
    handleAddMultipleImages,
    handleRemoveImage,
    handleCloseDialog,
    hasEnabledAmenities
  };
};
