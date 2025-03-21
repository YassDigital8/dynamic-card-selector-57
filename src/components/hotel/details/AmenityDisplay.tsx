
import React, { useState, useEffect } from 'react';
import { HotelAmenities } from '@/models/HotelModel';
import { 
  AmenityGrid, 
  AmenityImageGallery,
  amenityDisplayNames,
  amenityImageMapping,
  getAmenityImages
} from './amenities';

interface AmenityDisplayProps {
  amenities: HotelAmenities;
}

const AmenityDisplay: React.FC<AmenityDisplayProps> = ({ amenities }) => {
  useEffect(() => {
    // Debug logging to help diagnose the issue
    console.log('AmenityDisplay - Full amenities object:', JSON.stringify(amenities, null, 2));
    
    // Check all possible image arrays with more detail
    Object.entries(amenityImageMapping).forEach(([amenityKey, imagesKey]) => {
      const hasAmenity = amenities[amenityKey as keyof HotelAmenities];
      const images = amenities[imagesKey as keyof HotelAmenities];
      console.log(`AmenityDisplay - ${amenityKey} enabled:`, hasAmenity);
      console.log(`AmenityDisplay - ${amenityKey} images:`, images);
      
      if (Array.isArray(images) && images.length > 0) {
        console.log(`${amenityKey} has ${images.length} images. First image:`, JSON.stringify(images[0]));
      } else if (hasAmenity) {
        console.log(`WARNING: ${amenityKey} is enabled but has no images or images array is invalid`);
      }
    });
  }, [amenities]);

  // Extract amenity entries, filtering out the image arrays
  const amenityEntries = Object.entries(amenities)
    .filter(([key]) => !key.includes('Images'))
    .map(([key, value]) => [key, value]) as [keyof HotelAmenities, boolean][];

  const [selectedAmenity, setSelectedAmenity] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleViewImages = (amenity: string) => {
    const imagesKey = amenityImageMapping[amenity as keyof typeof amenityImageMapping];
    const images = amenities[imagesKey as keyof HotelAmenities];
    
    console.log(`Viewing images for ${amenity}:`, images);
    setSelectedAmenity(amenity);
    setIsGalleryOpen(true);
  };

  return (
    <>
      <AmenityGrid 
        amenities={amenities}
        amenityEntries={amenityEntries}
        onViewImages={handleViewImages}
      />

      {/* Image Gallery Dialog */}
      {selectedAmenity && (
        <AmenityImageGallery
          isOpen={isGalleryOpen}
          onOpenChange={setIsGalleryOpen}
          selectedAmenity={selectedAmenity}
          displayName={amenityDisplayNames[selectedAmenity as keyof HotelAmenities]}
          images={getAmenityImages(amenities, selectedAmenity)}
        />
      )}
    </>
  );
};

export default AmenityDisplay;
