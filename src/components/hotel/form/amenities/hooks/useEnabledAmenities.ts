
import { useCallback, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { AmenityHookProps } from './types';

export const useEnabledAmenities = ({ form }: AmenityHookProps) => {
  // Watch the form's amenities to detect changes - use memo to prevent excessive recalculations
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
        // Only consider boolean properties (not image arrays)
        return typeof value === 'boolean' && !key.includes('Images') && value === true;
      });
  }, [amenities]);
  
  // Check if any amenity is enabled - implemented as a memoized callback
  const hasEnabledAmenities = useCallback(() => {
    return enabledAmenities.length > 0;
  }, [enabledAmenities]);

  // Provide a direct count getter for clearer validation
  const getEnabledCount = useCallback(() => {
    return enabledAmenities.length;
  }, [enabledAmenities]);

  return { 
    hasEnabledAmenities, 
    amenities,
    getEnabledCount
  };
};
