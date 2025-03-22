
import { AmenityImage, HotelAmenities, Hotel } from '@/models/HotelModel';

/**
 * Creates a default amenities object with all fields set to false
 * and empty image arrays for image-enabled amenities
 */
export const createDefaultAmenities = (): HotelAmenities => {
  return {
    airConditioning: false,
    bar: false,
    gym: false,
    parking: false,
    spa: false,
    restaurant: false,
    breakfast: false,
    wifi: false,
    swimmingPool: false,
    petsAllowed: false,
    extraBed: false,
    // Initialize empty image arrays for amenities that support images
    barImages: [] as unknown as AmenityImage[],
    gymImages: [] as unknown as AmenityImage[],
    spaImages: [] as unknown as AmenityImage[],
    restaurantImages: [] as unknown as AmenityImage[],
    breakfastImages: [] as unknown as AmenityImage[],
    swimmingPoolImages: [] as unknown as AmenityImage[]
  };
};

/**
 * Ensures all amenity image arrays are initialized
 */
export const ensureAmenityImageArrays = (amenities: HotelAmenities): HotelAmenities => {
  const updated = { ...amenities };
  
  // For each amenity that can have images, ensure the array exists
  if (!updated.barImages) updated.barImages = [] as unknown as AmenityImage[];
  if (!updated.gymImages) updated.gymImages = [] as unknown as AmenityImage[];
  if (!updated.spaImages) updated.spaImages = [] as unknown as AmenityImage[];
  if (!updated.restaurantImages) updated.restaurantImages = [] as unknown as AmenityImage[];
  if (!updated.breakfastImages) updated.breakfastImages = [] as unknown as AmenityImage[];
  if (!updated.swimmingPoolImages) updated.swimmingPoolImages = [] as unknown as AmenityImage[];
  
  return updated;
};

/**
 * Processes amenity images to ensure they have proper IDs and structure
 */
export const processAmenityImages = (amenities: HotelAmenities): HotelAmenities => {
  const processed = { ...amenities };
  
  // Process each amenity that can have images
  const processImages = (key: keyof HotelAmenities, images?: AmenityImage[]) => {
    if (!images) return [] as AmenityImage[];
    
    return images.map((img, index) => ({
      ...img,
      id: img.id || `${key}-${index}-${Date.now()}`
    }));
  };
  
  processed.barImages = processImages('barImages', processed.barImages);
  processed.gymImages = processImages('gymImages', processed.gymImages);
  processed.spaImages = processImages('spaImages', processed.spaImages);
  processed.restaurantImages = processImages('restaurantImages', processed.restaurantImages);
  processed.breakfastImages = processImages('breakfastImages', processed.breakfastImages);
  processed.swimmingPoolImages = processImages('swimmingPoolImages', processed.swimmingPoolImages);
  
  return processed;
};

/**
 * Checks if an amenity has images
 */
export const amenityHasImages = (amenities: HotelAmenities, amenityImageKey: string): boolean => {
  const images = amenities[amenityImageKey as keyof HotelAmenities] as AmenityImage[] | undefined;
  return Array.isArray(images) && images.length > 0;
};

/**
 * Validates and ensures contact info arrays are properly initialized
 */
export const validateContactInfo = (hotel: Hotel): Hotel => {
  const validatedHotel = { ...hotel };
  
  // Ensure contactDetails is always an array
  if (!Array.isArray(validatedHotel.contactDetails)) {
    validatedHotel.contactDetails = [];
  }
  
  // Ensure socialMedia is always an array
  if (!Array.isArray(validatedHotel.socialMedia)) {
    validatedHotel.socialMedia = [];
  }
  
  return validatedHotel;
};

/**
 * Validates amenity images to ensure proper structure
 */
export const validateAmenityImages = (hotel: Hotel): Hotel => {
  if (!hotel.amenities) return hotel;
  
  const amenities = ensureAmenityImageArrays(hotel.amenities);
  hotel.amenities = processAmenityImages(amenities);
  
  return hotel;
};

/**
 * Creates a deep clone of hotel with amenity images to avoid reference issues
 */
export const cloneAmenityImages = (hotel: Hotel): Hotel => {
  // Create a deep clone of the hotel object
  const clonedHotel = JSON.parse(JSON.stringify(hotel));
  
  // Ensure image arrays have proper types after cloning
  if (clonedHotel.amenities) {
    clonedHotel.amenities = ensureAmenityImageArrays(clonedHotel.amenities);
  }
  
  return clonedHotel;
};
