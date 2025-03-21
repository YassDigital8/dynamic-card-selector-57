
import { Hotel } from '@/models/HotelModel';

/**
 * Validates and ensures all amenity image arrays are properly formatted
 * to prevent runtime errors when the hotel is loaded or edited.
 */
export const validateAmenityImages = (hotel: Hotel | undefined) => {
  if (!hotel || !hotel.amenities) return hotel;
  
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
