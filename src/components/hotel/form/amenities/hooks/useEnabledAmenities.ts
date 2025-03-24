
import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { AmenityHookProps } from './types';

export const useEnabledAmenities = ({ form }: AmenityHookProps) => {
  // Watch the form's amenities to detect changes
  const amenities = useWatch({
    control: form.control,
    name: 'amenities'
  });

  // Check if any amenity is enabled
  const hasEnabledAmenities = useCallback(() => {
    if (!amenities) return false;
    
    // Get only boolean properties that are true (excluding image arrays)
    const enabledAmenities = Object.entries(amenities)
      .filter(([key, value]) => {
        // Only consider boolean properties (not image arrays)
        return typeof value === 'boolean' && !key.includes('Images') && value === true;
      });
    
    console.log("Enabled amenities count:", enabledAmenities.length);
    console.log("Enabled amenities:", enabledAmenities.map(([key]) => key));
    
    return enabledAmenities.length > 0;
  }, [amenities]);

  return { 
    hasEnabledAmenities, 
    amenities,
    // Add a direct count getter for clearer validation
    getEnabledCount: () => {
      if (!amenities) return 0;
      return Object.entries(amenities)
        .filter(([key, value]) => typeof value === 'boolean' && !key.includes('Images') && value === true)
        .length;
    }
  };
};
