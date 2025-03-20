
import { HotelAmenities, AmenityImage } from '@/models/HotelModel';

// Mapping of amenity keys to display names
export const amenityDisplayNames: Record<keyof HotelAmenities, string> = {
  airConditioning: 'Air Conditioning',
  bar: 'Bar',
  gym: 'Gym',
  parking: 'Parking',
  spa: 'Spa',
  restaurant: 'Restaurant',
  breakfast: 'Breakfast',
  wifi: 'Wi-Fi',
  swimmingPool: 'Swimming Pool',
  petsAllowed: 'Pets Allowed',
  extraBed: 'Extra Bed',
  barImages: 'Bar Images',
  gymImages: 'Gym Images',
  spaImages: 'Spa Images',
  restaurantImages: 'Restaurant Images',
  breakfastImages: 'Breakfast Images',
  swimmingPoolImages: 'Swimming Pool Images'
};

// Map amenity names to their images array
export const amenityImageMapping: Record<string, keyof HotelAmenities> = {
  bar: 'barImages',
  gym: 'gymImages',
  spa: 'spaImages',
  restaurant: 'restaurantImages',
  breakfast: 'breakfastImages',
  swimmingPool: 'swimmingPoolImages'
};

// Helper function to check if an amenity has images
export const hasAmenityImages = (amenities: HotelAmenities, amenityKey: string): boolean => {
  if (!amenityImageMapping[amenityKey]) return false;
  
  const imagesArray = amenities[amenityImageMapping[amenityKey]];
  return Array.isArray(imagesArray) && imagesArray.length > 0;
};

// Helper function to get amenity images safely
export const getAmenityImages = (amenities: HotelAmenities, amenityKey: string | null): AmenityImage[] => {
  if (!amenityKey || !amenityImageMapping[amenityKey]) return [];
  
  const imagesArray = amenities[amenityImageMapping[amenityKey]];
  return Array.isArray(imagesArray) ? imagesArray : [];
};
