
import { Hotel } from '@/models/HotelModel';

/**
 * Validates amenity images in a hotel and ensures they are arrays
 * @param hotel The hotel object to validate
 */
export const validateAmenityImages = (hotel: Hotel | undefined): void => {
  if (!hotel) return;
  
  // Final validation of amenity images before saving
  Object.entries(hotel.amenities).forEach(([key, value]) => {
    if (key.includes('Images')) {
      if (Array.isArray(value)) {
        console.log(`Final ${key} in updated hotel: ${value.length} images`);
        if (value.length > 0) {
          console.log(`Sample image:`, JSON.stringify(value[0], null, 2));
        }
      } else {
        console.error(`ERROR: ${key} is not an array in final updated hotel:`, value);
        // Ensure it's an array to prevent runtime errors
        const stringKey = String(key);
        
        if (hotel) {
          const amenitiesRef = hotel.amenities;
          amenitiesRef[stringKey as keyof typeof amenitiesRef] = [] as any;
        }
      }
    }
  });
};
