
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
    
    return updateHotel(hotelId, {
      ...currentHotel,
      roomTypes: [...currentRoomTypes, newRoomType]
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
    
    return updateHotel(hotelId, {
      ...currentHotel,
      roomTypes: updatedRoomTypes
    });
  };

  // Function to delete a room type
  const deleteRoomType = (hotelId: string, roomTypeId: string, currentRoomTypes: RoomType[]) => {
    // Find the current hotel to get all of its data
    const currentHotel = hotels.find(h => h.id === hotelId);
    if (!currentHotel) return { success: false, error: 'Hotel not found' };
    
    const updatedRoomTypes = currentRoomTypes.filter(rt => rt.id !== roomTypeId);
    
    return updateHotel(hotelId, {
      ...currentHotel,
      roomTypes: updatedRoomTypes
    });
  };

  return {
    addRoomType,
    updateRoomType,
    deleteRoomType
  };
};
