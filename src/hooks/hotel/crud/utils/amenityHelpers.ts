
import { Hotel } from '@/models/HotelModel';

// Function to validate and ensure all amenity image arrays exist
export const validateAmenityImages = (hotel: Hotel): Hotel => {
  if (!hotel.amenities) {
    return hotel;
  }
  
  const amenityKeysWithImages = ['bar', 'gym', 'spa', 'restaurant', 'breakfast', 'swimmingPool'];
  const updatedAmenities = { ...hotel.amenities };
  
  amenityKeysWithImages.forEach(amenityKey => {
    const imagesKey = `${amenityKey}Images` as keyof typeof updatedAmenities;
    
    // Initialize empty array if it doesn't exist
    if (!updatedAmenities[imagesKey]) {
      updatedAmenities[imagesKey] = [];
    }
    
    // Ensure the value is an array
    if (!Array.isArray(updatedAmenities[imagesKey])) {
      console.warn(`${imagesKey} is not an array, initializing to empty array`);
      updatedAmenities[imagesKey] = [];
    }
  });
  
  return {
    ...hotel,
    amenities: updatedAmenities
  };
};

// Function to deep clone hotel with amenity images to avoid reference issues
export const cloneAmenityImages = (hotel: Hotel): Hotel => {
  return JSON.parse(JSON.stringify(hotel));
};

// Function to ensure contact details and social media arrays exist
export const validateContactInfo = (hotel: Hotel): Hotel => {
  const updatedHotel = { ...hotel };
  
  // Initialize contactDetails if it doesn't exist or isn't an array
  if (!updatedHotel.contactDetails || !Array.isArray(updatedHotel.contactDetails)) {
    updatedHotel.contactDetails = [];
  }
  
  // Initialize socialMedia if it doesn't exist or isn't an array
  if (!updatedHotel.socialMedia || !Array.isArray(updatedHotel.socialMedia)) {
    updatedHotel.socialMedia = [];
  }
  
  return updatedHotel;
};
