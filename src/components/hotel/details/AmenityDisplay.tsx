
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
  extraBedPrice?: number;
}

const AmenityDisplay: React.FC<AmenityDisplayProps> = ({ amenities, extraBedPrice }) => {
  useEffect(() => {
    console.log('AmenityDisplay - Rendering with updated amenities');
    
    // Check all image arrays with more detail
    Object.entries(amenityImageMapping).forEach(([amenityKey, imagesKey]) => {
      const hasAmenity = amenities[amenityKey as keyof HotelAmenities];
      const images = amenities[imagesKey as keyof HotelAmenities];
      
      if (Array.isArray(images) && images.length > 0) {
        console.log(`${amenityKey} has ${images.length} images`);
      } else if (hasAmenity) {
        console.log(`${amenityKey} is enabled but has no images or images array is invalid`);
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
        extraData={{ extraBedPrice }}
      />

      {/* Image Gallery Dialog */}
      {selectedAmenity && (
        <AmenityImageGallery
          key={`gallery-${selectedAmenity}-${JSON.stringify(getAmenityImages(amenities, selectedAmenity))}`}
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
