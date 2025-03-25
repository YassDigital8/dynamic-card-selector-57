
import { useState, useCallback } from 'react';

export const useAmenityDialogState = () => {
  const [selectedAmenity, setSelectedAmenity] = useState<string>('');
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  
  const openImageDialog = useCallback((amenityName: string) => {
    // Extract just the amenity key from the full path (e.g., "amenities.bar" -> "bar")
    const amenityKey = amenityName.split('.')[1] || amenityName;
    console.log('Opening image dialog for:', amenityKey);
    setSelectedAmenity(amenityKey);
    setIsImageDialogOpen(true);
  }, []);
  
  const handleCloseDialog = useCallback(() => {
    setIsImageDialogOpen(false);
  }, []);

  return {
    selectedAmenity,
    isImageDialogOpen,
    openImageDialog,
    handleCloseDialog
  };
};
