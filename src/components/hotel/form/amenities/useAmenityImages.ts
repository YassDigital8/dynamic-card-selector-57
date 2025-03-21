
import { useState, useCallback } from 'react';
import { useAddAmenityImage } from './useAddAmenityImage';
import { useAddMultipleImages } from './useAddMultipleImages';
import { useRemoveAmenityImage } from './useRemoveAmenityImage';
import { useAmenityFormMonitor } from './useAmenityFormMonitor';
import { UseAmenityImagesProps, UseAmenityImagesReturn, AmenityWithImages } from './types';

export const useAmenityImages = ({ form, hotelId }: UseAmenityImagesProps): UseAmenityImagesReturn => {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityWithImages | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  // Use the monitoring hook for form state
  useAmenityFormMonitor(form);
  
  // Import handlers from other hooks
  const { handleAddImage } = useAddAmenityImage({ form, selectedAmenity });
  const { handleAddMultipleImages } = useAddMultipleImages({ form, selectedAmenity });
  const { handleRemoveImage } = useRemoveAmenityImage(form);
  
  const openImageDialog = useCallback((amenityName: string) => {
    // Extract just the amenity key from the full path (e.g., "amenities.bar" -> "bar")
    const amenityKey = amenityName.split('.')[1] as AmenityWithImages;
    console.log('Opening image dialog for:', amenityKey);
    setSelectedAmenity(amenityKey);
    setIsImageDialogOpen(true);
  }, []);
  
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
