
import { useState, useEffect } from 'react';
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
    console.log('Current form amenities:', amenities);
    
    // Check if spa is enabled and has images
    if (amenities.spa) {
      console.log('Spa is enabled, images:', amenities.spaImages || 'No spa images yet');
    }
    
    // Check if gym is enabled and has images
    if (amenities.gym) {
      console.log('Gym is enabled, images:', amenities.gymImages || 'No gym images yet');
    }
    
    // For critical debugging, monitor changes
    const subscription = form.watch((value, { name, type }) => {
      if (name?.startsWith('amenities.') && name.includes('Images')) {
        console.log(`Form field changed: ${name}`, value);
        console.log('Form is dirty:', form.formState.isDirty);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  const openImageDialog = (amenityName: string) => {
    // Extract just the amenity key from the full path (e.g., "amenities.bar" -> "bar")
    const amenityKey = amenityName.split('.')[1] as AmenityWithImages;
    console.log('Opening image dialog for:', amenityKey);
    setSelectedAmenity(amenityKey);
    setIsImageDialogOpen(true);
  };
  
  const handleAddImage = (imageUrl: string, metadata?: FileMetadataValues) => {
    if (!selectedAmenity || !imageUrl) {
      console.log('Missing selectedAmenity or imageUrl:', { selectedAmenity, imageUrl });
      return;
    }
    
    const imageFieldName = `amenities.${selectedAmenity}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    const newImage: AmenityImage = {
      url: imageUrl,
      description: metadata?.altText || `${amenitiesWithImages[selectedAmenity]} image`,
      title: metadata?.title || '',
      caption: metadata?.caption || '',
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
    
    // Set the images array with proper dirty flag to mark the form as changed
    form.setValue(imageFieldName as any, [...currentImages, newImage], { 
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
    
    // Force form state update to ensure changes are recognized
    form.trigger();
    
    // Get updated images to verify
    const updatedImages = form.getValues(imageFieldName as any);
    console.log('Updated images after adding:', updatedImages);
    console.log('Form is dirty:', form.formState.isDirty);
    
    // Notify user
    toast({
      title: "Image added",
      description: `Image was added to ${amenitiesWithImages[selectedAmenity]}. Don't forget to save your changes.`,
      variant: "default",
    });
    
    setIsImageDialogOpen(false);
  };

  const handleAddMultipleImages = (files: FileInfo[]) => {
    if (!selectedAmenity || files.length === 0) {
      console.log('Missing selectedAmenity or files:', { selectedAmenity, fileCount: files.length });
      return;
    }
    
    const imageFieldName = `amenities.${selectedAmenity}Images` as const;
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
    
    const newImages = files.map(file => ({
      url: file.url,
      description: file.metadata?.altText || `${amenitiesWithImages[selectedAmenity]} image`,
      title: file.metadata?.title || file.name,
      caption: file.metadata?.caption || '',
      metadata: file.metadata
    }));
    
    // Set the images array with proper dirty flag to mark the form as changed
    form.setValue(imageFieldName as any, [...currentImages, ...newImages], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
    
    // Force form state update to ensure changes are recognized
    form.trigger();
    
    // Verify updated images
    const updatedImages = form.getValues(imageFieldName as any);
    console.log('Updated images after adding multiple:', updatedImages);
    console.log('Form is dirty:', form.formState.isDirty);
    
    // Notify user
    toast({
      title: "Images added",
      description: `${files.length} images were added to ${amenitiesWithImages[selectedAmenity]}. Don't forget to save your changes.`,
      variant: "default",
    });
    
    setIsImageDialogOpen(false);
  };
  
  const handleRemoveImage = (amenityName: string, index: number) => {
    const imageFieldName = `amenities.${amenityName}Images` as const;
    const currentImages = form.getValues(imageFieldName as any) || [];
    
    console.log(`Removing image at index ${index} from ${amenityName}`);
    console.log('Current images before removal:', currentImages);
    
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
    
    // Notify user
    toast({
      title: "Image removed",
      description: `Image was removed from ${amenitiesWithImages[amenityName]}. Don't forget to save your changes.`,
      variant: "default",
    });
  };
  
  const handleCloseDialog = () => {
    setIsImageDialogOpen(false);
  };

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
