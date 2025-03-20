
import { useEffect } from 'react';
import { Hotel, AmenityImage } from '@/models/HotelModel';

const useAmenityImageMapping = (hotel: Hotel) => {
  // Extract all amenity images
  const amenityImagesMap = new Map<string, AmenityImage[]>();
  
  // Debug hotel amenities object with more detail
  useEffect(() => {
    console.log('Hotel Gallery - Hotel ID:', hotel.id);
    console.log('Hotel Gallery - Hotel Name:', hotel.name);
    console.log('Hotel Gallery - Amenities object:', JSON.stringify(hotel.amenities, null, 2));
    
    // Check all possible image arrays with explicit property access
    const imageArraysConfig = [
      { key: 'spa', name: 'Spa', enabled: hotel.amenities.spa, arr: hotel.amenities.spaImages },
      { key: 'bar', name: 'Bar', enabled: hotel.amenities.bar, arr: hotel.amenities.barImages },
      { key: 'gym', name: 'Gym', enabled: hotel.amenities.gym, arr: hotel.amenities.gymImages },
      { key: 'restaurant', name: 'Restaurant', enabled: hotel.amenities.restaurant, arr: hotel.amenities.restaurantImages },
      { key: 'breakfast', name: 'Breakfast', enabled: hotel.amenities.breakfast, arr: hotel.amenities.breakfastImages },
      { key: 'swimmingPool', name: 'Swimming Pool', enabled: hotel.amenities.swimmingPool, arr: hotel.amenities.swimmingPoolImages }
    ];
    
    imageArraysConfig.forEach(({ key, name, enabled, arr }) => {
      console.log(`HotelGallery - ${name} enabled:`, enabled);
      console.log(`HotelGallery - ${name} images:`, arr);
      
      if (enabled && Array.isArray(arr) && arr.length > 0) {
        console.log(`SUCCESS: ${name} has ${arr.length} images. First image:`, arr[0]);
      } else if (enabled && (!arr || !Array.isArray(arr) || arr.length === 0)) {
        console.log(`WARNING: ${name} is enabled but has no images or invalid array`);
      }
    });
  }, [hotel]);
  
  // Function to safely add images to our map
  const addImagesToMap = (key: string, displayName: string, images?: AmenityImage[]) => {
    if (images && Array.isArray(images) && images.length > 0) {
      console.log(`Adding ${images.length} images for ${displayName}:`, images);
      amenityImagesMap.set(displayName, images);
    } else {
      console.log(`No images found for ${displayName} or invalid array`);
    }
  };
  
  // Define amenity keys type
  type AmenityKey = 'bar' | 'gym' | 'spa' | 'restaurant' | 'breakfast' | 'swimmingPool';
  
  // Check if amenity is enabled before adding images - simplified logic with direct property access
  const addAmenityIfEnabled = (key: AmenityKey, displayName: string) => {
    const amenityEnabled = hotel.amenities[key];
    const imagesKey = `${key}Images` as const;
    const images = hotel.amenities[imagesKey];
    
    if (amenityEnabled && Array.isArray(images) && images.length > 0) {
      addImagesToMap(key, displayName, images);
    } else if (amenityEnabled) {
      console.log(`HotelGallery - ${displayName} (${key}) is enabled but has no valid images`);
    }
  };
  
  // Add each amenity directly using the simplified function
  addAmenityIfEnabled('bar', 'Bar');
  addAmenityIfEnabled('gym', 'Gym');
  addAmenityIfEnabled('spa', 'Spa');
  addAmenityIfEnabled('restaurant', 'Restaurant');
  addAmenityIfEnabled('breakfast', 'Breakfast');
  addAmenityIfEnabled('swimmingPool', 'Swimming Pool');
  
  // Add room type images
  const roomTypeImages: AmenityImage[] = [];
  hotel.roomTypes.forEach(roomType => {
    if (roomType.imageUrl) {
      roomTypeImages.push({
        url: roomType.imageUrl,
        title: roomType.name,
        description: `Main image for ${roomType.name}`
      });
    }
    
    if (roomType.images && roomType.images.length > 0) {
      roomType.images.forEach(imgUrl => {
        roomTypeImages.push({
          url: imgUrl,
          title: roomType.name,
          description: `Image for ${roomType.name}`
        });
      });
    }
  });
  
  if (roomTypeImages.length > 0) {
    amenityImagesMap.set('Room Types', roomTypeImages);
  }
  
  // Convert amenity images map to array for rendering
  const amenityCategories = Array.from(amenityImagesMap.entries());
  
  // Debug output to help diagnose issues
  console.log('Gallery categories built:', amenityCategories);
  console.log('Total categories with images:', amenityCategories.length);

  return { amenityCategories };
};

export default useAmenityImageMapping;
