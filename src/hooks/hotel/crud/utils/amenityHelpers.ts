
import { AmenityImage, HotelAmenities } from '@/models/HotelModel';

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
    barImages: [] as AmenityImage[],
    gymImages: [] as AmenityImage[],
    spaImages: [] as AmenityImage[],
    restaurantImages: [] as AmenityImage[],
    breakfastImages: [] as AmenityImage[],
    swimmingPoolImages: [] as AmenityImage[]
  };
};

/**
 * Ensures all amenity image arrays are initialized
 */
export const ensureAmenityImageArrays = (amenities: HotelAmenities): HotelAmenities => {
  const updated = { ...amenities };
  
  // For each amenity that can have images, ensure the array exists
  if (!updated.barImages) updated.barImages = [] as AmenityImage[];
  if (!updated.gymImages) updated.gymImages = [] as AmenityImage[];
  if (!updated.spaImages) updated.spaImages = [] as AmenityImage[];
  if (!updated.restaurantImages) updated.restaurantImages = [] as AmenityImage[];
  if (!updated.breakfastImages) updated.breakfastImages = [] as AmenityImage[];
  if (!updated.swimmingPoolImages) updated.swimmingPoolImages = [] as AmenityImage[];
  
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
