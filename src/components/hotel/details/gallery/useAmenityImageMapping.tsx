
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
    
    // Check image arrays more thoroughly
    Object.entries(hotel.amenities).forEach(([key, value]) => {
      if (key.includes('Images') && Array.isArray(value)) {
        console.log(`Hotel Gallery - Found ${value.length} images for ${key}`);
        if (value.length > 0) {
          console.log(`First image:`, value[0]);
        } else {
          console.log(`Empty image array for ${key}`);
        }
      }
    });
  }, [hotel]);
  
  // Function to safely add images to our map
  const addImagesToMap = (key: string, displayName: string, images?: AmenityImage[] | any[]) => {
    if (images && Array.isArray(images) && images.length > 0) {
      // Ensure each image has the required structure
      const validImages = images.map((img, index) => {
        // Handle different possible image formats
        if (typeof img === 'string') {
          return {
            url: img,
            title: `${displayName} image ${index + 1}`,
            description: `Image for ${displayName}`,
            id: `${key}-${index}-${Date.now()}`
          };
        } else if (typeof img === 'object' && img !== null) {
          // Ensure url property exists
          if (!img.url) {
            console.error(`Invalid image object without URL:`, img);
            return null;
          }
          return {
            url: img.url,
            title: img.title || `${displayName} image ${index + 1}`,
            description: img.description || `Image for ${displayName}`,
            caption: img.caption,
            id: img.id || `${key}-${index}-${Date.now()}`,
            metadata: img.metadata
          };
        }
        return null;
      }).filter(Boolean) as AmenityImage[];
      
      if (validImages.length > 0) {
        console.log(`Adding ${validImages.length} validated images for ${displayName}`);
        amenityImagesMap.set(displayName, validImages);
      }
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
    
    if (amenityEnabled) {
      console.log(`Processing ${key}: enabled=${amenityEnabled}, images available=${!!images}`);
      // Make sure we're only passing arrays to addImagesToMap
      if (Array.isArray(images)) {
        addImagesToMap(key, displayName, images);
      } else {
        console.log(`No valid images array found for ${key}`);
      }
    }
  });
  
  // Add room type images
  const roomTypeImages: AmenityImage[] = [];
  hotel.roomTypes.forEach(roomType => {
    if (roomType.imageUrl) {
      roomTypeImages.push({
        url: roomType.imageUrl,
        title: roomType.name,
        description: `Main image for ${roomType.name}`,
        id: `room-${roomType.id}-main-${Date.now()}`
      });
    }
    
    if (roomType.images && roomType.images.length > 0) {
      roomType.images.forEach((imgUrl, idx) => {
        roomTypeImages.push({
          url: imgUrl,
          title: roomType.name,
          description: `Image for ${roomType.name}`,
          id: `room-${roomType.id}-${idx}-${Date.now()}`
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
