
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
    
    const enabledAmenities = Object.entries(amenities)
      .filter(([key, value]) => typeof value === 'boolean' && value === true);
    
    console.log("Checking enabled amenities:", enabledAmenities);
    return enabledAmenities.length > 0;
  }, [amenities]);

  return { hasEnabledAmenities, amenities };
};
