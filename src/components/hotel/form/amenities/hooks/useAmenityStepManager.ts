
import { useEffect } from 'react';
import { AmenityHookProps, AmenityStepManagerReturn } from './types';
import { useAmenityDialogState } from './useAmenityDialogState';
import { useAmenityAddImage } from './useAmenityAddImage';
import { useAmenityAddMultipleImages } from './useAmenityAddMultipleImages';
import { useAmenityRemoveImage } from './useAmenityRemoveImage';
import { useEnabledAmenities } from './useEnabledAmenities';

export const useAmenityStepManager = ({ 
  form, 
  hotelId 
}: AmenityHookProps): AmenityStepManagerReturn => {
  // Use the individual hooks
  const { 
    selectedAmenity, 
    isImageDialogOpen, 
    openImageDialog, 
    handleCloseDialog 
  } = useAmenityDialogState();
  
  const { handleAddImage } = useAmenityAddImage({ form, selectedAmenity });
  const { handleAddMultipleImages } = useAmenityAddMultipleImages({ form, selectedAmenity });
  const { handleRemoveImage } = useAmenityRemoveImage({ form });
  const { hasEnabledAmenities, amenities } = useEnabledAmenities({ form });

  // Log amenity status changes
  useEffect(() => {
    console.log('Amenities updated:', amenities);
    console.log('Any amenity enabled:', hasEnabledAmenities());
  }, [amenities, hasEnabledAmenities]);

  // Return all the functionality
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
