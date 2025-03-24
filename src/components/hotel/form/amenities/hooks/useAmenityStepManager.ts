
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

  // Force validation on mount and when amenities change
  useEffect(() => {
    // This will ensure the step is revalidated whenever amenities change
    form.trigger('amenities');
    
    console.log('Amenities updated:', amenities);
    const enabledCount = Object.entries(amenities || {})
      .filter(([key, value]) => typeof value === 'boolean' && value === true)
      .length;
    console.log('Any amenity enabled:', hasEnabledAmenities(), 'Count:', enabledCount);
  }, [amenities, hasEnabledAmenities, form]);

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
