
import { useCallback, useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { AmenityHookProps } from './types';

export const useEnabledAmenities = ({ form }: AmenityHookProps) => {
  // Watch the form's amenities to detect changes
  const amenities = useWatch({
    control: form.control,
    name: 'amenities'
  });

  // Memoize the calculation of enabled amenities to prevent excessive re-renders
  const enabledAmenities = useMemo(() => {
    if (!amenities) return [];
    
    // Get only boolean properties that are true (excluding image arrays)
    return Object.entries(amenities)
      .filter(([key, value]) => {
        // Only consider boolean properties that are true (not image arrays)
        return typeof value === 'boolean' && !key.includes('Images') && value === true;
      }) as Array<[string, boolean]>; // Explicitly cast to the correct type
  }, [amenities]);
  
  // Check if any amenity is enabled
  const hasEnabledAmenities = useCallback(() => {
    return enabledAmenities.length > 0;
  }, [enabledAmenities]);

  // Provide a direct count getter for clearer validation
  const getEnabledCount = useCallback(() => {
    return enabledAmenities.length;
  }, [enabledAmenities]);

  // Force validation when amenities change
  useEffect(() => {
    // Trigger validation if we have any enabled amenities
    if (enabledAmenities.length > 0) {
      console.log("Amenities enabled, triggering validation:", enabledAmenities);
      form.trigger('amenities');
      form.trigger(); // Trigger full form validation
    }
  }, [enabledAmenities, form]);

  return { 
    hasEnabledAmenities, 
    amenities,
    getEnabledCount,
    enabledAmenities
  };
};
