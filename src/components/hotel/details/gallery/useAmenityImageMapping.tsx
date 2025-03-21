
import { useEffect } from 'react';
import { Hotel, AmenityImage } from '@/models/HotelModel';

const useAmenityImageMapping = (hotel: Hotel) => {
  // Extract all amenity images
  const amenityImagesMap = new Map<string, AmenityImage[]>();
  
  // Debug hotel amenities object with more detail
  useEffect(() => {
    console.log('Hotel Gallery - Hotel ID:', hotel.id);
    console.log('Hotel Gallery - Hotel Name:', hotel.name);
    console.log('Hotel Gallery - Full Amenities object:', JSON.stringify(hotel.amenities, null, 2));
    
    // Detailed check for all image arrays
    Object.entries(hotel.amenities).forEach(([key, value]) => {
      if (key.includes('Images') && Array.isArray(value) && value.length > 0) {
        console.log(`Hotel Gallery - Found ${value.length} images for ${key}`);
        console.log(`First image:`, value[0]);
      }
    });
  }, [hotel]);
  
  // Function to safely add images to our map
  const addImagesToMap = (key: string, displayName: string, images?: AmenityImage[]) => {
    if (images && Array.isArray(images) && images.length > 0) {
      console.log(`Adding ${images.length} images for ${displayName}:`, images);
      amenityImagesMap.set(displayName, images);
    }
  };
  
  // Map of amenity keys to their display names
  const amenityDisplayMap: Record<string, string> = {
    bar: 'Bar',
    gym: 'Gym',
    spa: 'Spa',
    restaurant: 'Restaurant',
    breakfast: 'Breakfast',
    swimmingPool: 'Swimming Pool'
  };
  
  // Process all potential image arrays systematically
  Object.entries(amenityDisplayMap).forEach(([key, displayName]) => {
    const amenityEnabled = hotel.amenities[key as keyof typeof hotel.amenities];
    const imagesKey = `${key}Images` as keyof typeof hotel.amenities;
    const images = hotel.amenities[imagesKey];
    
    if (amenityEnabled && Array.isArray(images) && images.length > 0) {
      addImagesToMap(key, displayName, images);
    }
  });
  
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
  console.log('Gallery categories built:', amenityCategories.length);
  amenityCategories.forEach(([category, images]) => {
    console.log(`Category: ${category}, Images: ${images.length}`);
  });

  return { amenityCategories };
};

export default useAmenityImageMapping;
