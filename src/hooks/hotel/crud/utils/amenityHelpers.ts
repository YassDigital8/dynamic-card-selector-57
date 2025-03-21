
import { Hotel } from '@/models/HotelModel';

/**
 * Validates and ensures all amenity image arrays are properly formatted
 * to prevent runtime errors when the hotel is loaded or edited.
 */
export const validateAmenityImages = (hotel: Hotel | undefined) => {
  if (!hotel || !hotel.amenities) return hotel;
  
  console.log(`Validating amenity images for hotel: ${hotel.id}`);
  
  // Check each property that ends with 'Images' and ensure it's an array
  Object.entries(hotel.amenities).forEach(([key, value]) => {
    if (key.includes('Images')) {
      if (!Array.isArray(value)) {
        console.error(`Fixing invalid ${key}: not an array`, value);
        // Type-safe way to assign an empty array
        const amenities = hotel.amenities;
        const typedKey = key as keyof typeof amenities;
        amenities[typedKey] = [] as any;
      } else {
        // Log successful validation
        console.log(`Validated ${key}: ${Array.isArray(value) ? value.length : 0} images`);
      }
    }
  });
  
  return hotel;
};

/**
 * Deep clones amenity images to prevent reference issues
 */
export const cloneAmenityImages = (hotel: Hotel): Hotel => {
  if (!hotel || !hotel.amenities) return hotel;
  
  const clonedHotel = { ...hotel };
  clonedHotel.amenities = { ...hotel.amenities };
  
  // Deep clone all image arrays to break references
  Object.entries(hotel.amenities).forEach(([key, value]) => {
    if (key.includes('Images') && Array.isArray(value)) {
      const typedKey = key as keyof typeof clonedHotel.amenities;
      clonedHotel.amenities[typedKey] = JSON.parse(JSON.stringify(value));
    }
  });
  
  return clonedHotel;
};
