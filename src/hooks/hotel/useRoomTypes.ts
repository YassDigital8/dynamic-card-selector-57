
import { RoomType, Hotel } from '@/models/HotelModel';
import { useHotelCrud } from './useHotelCrud';

export const useRoomTypes = () => {
  const { updateHotel, hotels } = useHotelCrud();

  // Function to add a room type to a hotel
  const addRoomType = (hotelId: string, roomType: Omit<RoomType, 'id'>, currentRoomTypes: RoomType[]) => {
    // Find the current hotel to get all of its data
    const currentHotel = hotels.find(h => h.id === hotelId);
    if (!currentHotel) return { success: false, error: 'Hotel not found' };
    
    const newRoomType: RoomType = {
      ...roomType,
      id: Date.now().toString()
    };
    
    // Create a proper HotelFormData object from the existing hotel
    return updateHotel(hotelId, {
      name: currentHotel.name,
      country: currentHotel.country,
      governorate: currentHotel.governorate,
      streetAddress: currentHotel.streetAddress,
      posKey: currentHotel.posKey,
      rating: currentHotel.rating,
      amenities: currentHotel.amenities,
      roomTypes: [...currentRoomTypes, newRoomType],
      // Include other optional properties if they exist
      logoUrl: currentHotel.logoUrl,
      contactDetails: currentHotel.contactDetails,
      socialMedia: currentHotel.socialMedia,
      contractDocuments: currentHotel.contractDocuments,
      geolocation: currentHotel.geolocation,
      paymentMethods: currentHotel.paymentMethods,
      extraBedPolicy: currentHotel.extraBedPolicy
    });
  };

  // Function to update a room type
  const updateRoomType = (hotelId: string, roomTypeId: string, updatedData: Partial<RoomType>, currentRoomTypes: RoomType[]) => {
    // Find the current hotel to get all of its data
    const currentHotel = hotels.find(h => h.id === hotelId);
    if (!currentHotel) return { success: false, error: 'Hotel not found' };
    
    const updatedRoomTypes = currentRoomTypes.map(rt => 
      rt.id === roomTypeId ? { ...rt, ...updatedData } : rt
    );
    
    // Create a proper HotelFormData object from the existing hotel
    return updateHotel(hotelId, {
      name: currentHotel.name,
      country: currentHotel.country,
      governorate: currentHotel.governorate,
      streetAddress: currentHotel.streetAddress,
      posKey: currentHotel.posKey,
      rating: currentHotel.rating,
      amenities: currentHotel.amenities,
      roomTypes: updatedRoomTypes,
      // Include other optional properties if they exist
      logoUrl: currentHotel.logoUrl,
      contactDetails: currentHotel.contactDetails,
      socialMedia: currentHotel.socialMedia,
      contractDocuments: currentHotel.contractDocuments,
      geolocation: currentHotel.geolocation,
      paymentMethods: currentHotel.paymentMethods,
      extraBedPolicy: currentHotel.extraBedPolicy
    });
  };

  // Function to delete a room type
  const deleteRoomType = (hotelId: string, roomTypeId: string, currentRoomTypes: RoomType[]) => {
    // Find the current hotel to get all of its data
    const currentHotel = hotels.find(h => h.id === hotelId);
    if (!currentHotel) return { success: false, error: 'Hotel not found' };
    
    const updatedRoomTypes = currentRoomTypes.filter(rt => rt.id !== roomTypeId);
    
    // Create a proper HotelFormData object from the existing hotel
    return updateHotel(hotelId, {
      name: currentHotel.name,
      country: currentHotel.country,
      governorate: currentHotel.governorate,
      streetAddress: currentHotel.streetAddress,
      posKey: currentHotel.posKey,
      rating: currentHotel.rating,
      amenities: currentHotel.amenities,
      roomTypes: updatedRoomTypes,
      // Include other optional properties if they exist
      logoUrl: currentHotel.logoUrl,
      contactDetails: currentHotel.contactDetails,
      socialMedia: currentHotel.socialMedia,
      contractDocuments: currentHotel.contractDocuments,
      geolocation: currentHotel.geolocation,
      paymentMethods: currentHotel.paymentMethods,
      extraBedPolicy: currentHotel.extraBedPolicy
    });
  };

  return {
    addRoomType,
    updateRoomType,
    deleteRoomType
  };
};
