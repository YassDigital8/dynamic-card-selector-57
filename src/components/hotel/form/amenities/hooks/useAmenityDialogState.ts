
import { useState, useCallback } from 'react';
import { SelectedAmenityType, AmenityKeyType, DialogStateProps } from './types';
import { amenitiesWithImages } from '../constants';

export const useAmenityDialogState = () => {
  const [selectedAmenity, setSelectedAmenity] = useState<SelectedAmenityType | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  
  const openImageDialog = useCallback((amenityKey: string) => {
    // Extract the amenity key from the full path (e.g., "amenities.bar" -> "bar")
    const key = amenityKey.split('.')[1] as AmenityKeyType;
    
    if (!amenitiesWithImages[key]) {
      console.error('Invalid amenity key:', key);
      return;
    }
    
    console.log('Opening image dialog for:', key);
    setSelectedAmenity({
      key,
      label: amenitiesWithImages[key]
    });
    setIsImageDialogOpen(true);
  }, []);
  
  const handleCloseDialog = useCallback(() => {
    setIsImageDialogOpen(false);
  }, []);

  return {
    selectedAmenity,
    setSelectedAmenity,
    isImageDialogOpen,
    setIsImageDialogOpen,
    openImageDialog,
    handleCloseDialog
  };
};
