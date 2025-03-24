
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
  const { hasEnabledAmenities, amenities, getEnabledCount } = useEnabledAmenities({ form });

  // Force validation on mount and when amenities change
  useEffect(() => {
    // This will ensure the step is revalidated whenever amenities change
    form.trigger('amenities');
    
    console.log('Amenities updated:', amenities);
    const enabledCount = getEnabledCount();
    console.log('Any amenity enabled:', hasEnabledAmenities(), 'Count:', enabledCount);
    
    // Force a validation of the parent form to update step status
    form.trigger();
  }, [amenities, hasEnabledAmenities, form, getEnabledCount]);

  return {
    selectedAmenity,
    isImageDialogOpen,
    openImageDialog,
    handleAddImage,
    handleAddMultipleImages,
    handleRemoveImage,
    handleCloseDialog,
    hasEnabledAmenities,
    getEnabledCount
  };
};
