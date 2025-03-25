
import { useEffect } from 'react';
import { AmenityHookProps, AmenityStepManagerReturn, AmenityWithImages } from './types';
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
    // Use a flag to track if we're in a validation process
    let isValidating = false;
    
    const timeoutId = setTimeout(() => {
      if (!isValidating) {
        isValidating = true;
        
        // Force validation of amenities field to check if any are enabled
        form.trigger('amenities').finally(() => {
          isValidating = false;
        });
        
        const enabledCount = getEnabledCount();
        console.log('Any amenity enabled:', hasEnabledAmenities(), 'Count:', enabledCount);
        
        // Trigger the parent form to update step status when amenity status changes
        if (enabledCount > 0) {
          form.trigger();
        }
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [amenities, hasEnabledAmenities, form, getEnabledCount]);

  // Cast the selectedAmenity as AmenityWithImages for type compatibility
  const typedSelectedAmenity = selectedAmenity as AmenityWithImages;

  return {
    selectedAmenity: typedSelectedAmenity,
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
