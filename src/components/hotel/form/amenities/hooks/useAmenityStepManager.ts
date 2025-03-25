
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
  
  // Cast the selectedAmenity as AmenityWithImages for type compatibility
  const typedSelectedAmenity = selectedAmenity as AmenityWithImages;
  
  const { handleAddImage } = useAmenityAddImage({ form, selectedAmenity: typedSelectedAmenity });
  const { handleAddMultipleImages } = useAmenityAddMultipleImages({ form, selectedAmenity: typedSelectedAmenity });
  const { handleRemoveImage } = useAmenityRemoveImage({ form });
  const { hasEnabledAmenities, amenities, getEnabledCount } = useEnabledAmenities({ form });

  // Force validation on mount and when amenities change, but prevent excessive re-validation
  useEffect(() => {
    // Use a flag to track if we're in a validation process
    let isValidating = false;
    
    const timeoutId = setTimeout(() => {
      if (!isValidating) {
        isValidating = true;
        
        form.trigger('amenities').finally(() => {
          isValidating = false;
        });
        
        const enabledCount = getEnabledCount();
        console.log('Any amenity enabled:', hasEnabledAmenities(), 'Count:', enabledCount);
        
        // Only trigger the parent form if we need to update step status
        if (form.formState.isValid !== (enabledCount > 0)) {
          form.trigger();
        }
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [amenities, hasEnabledAmenities, form, getEnabledCount]);

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
