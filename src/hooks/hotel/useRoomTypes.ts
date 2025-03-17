
import { RoomType } from '@/models/HotelModel';
import { useHotelCrud } from './useHotelCrud';

export const useRoomTypes = () => {
  const { updateHotel } = useHotelCrud();

  // Function to add a room type to a hotel
  const addRoomType = (hotelId: string, roomType: Omit<RoomType, 'id'>, currentRoomTypes: RoomType[]) => {
    const newRoomType: RoomType = {
      ...roomType,
      id: Date.now().toString()
    };
    
    return updateHotel(hotelId, {
      roomTypes: [...currentRoomTypes, newRoomType]
    });
  };

  // Function to update a room type
  const updateRoomType = (hotelId: string, roomTypeId: string, updatedData: Partial<RoomType>, currentRoomTypes: RoomType[]) => {
    const updatedRoomTypes = currentRoomTypes.map(rt => 
      rt.id === roomTypeId ? { ...rt, ...updatedData } : rt
    );
    
    return updateHotel(hotelId, { roomTypes: updatedRoomTypes });
  };

  // Function to delete a room type
  const deleteRoomType = (hotelId: string, roomTypeId: string, currentRoomTypes: RoomType[]) => {
    const updatedRoomTypes = currentRoomTypes.filter(rt => rt.id !== roomTypeId);
    
    return updateHotel(hotelId, { roomTypes: updatedRoomTypes });
  };

  return {
    addRoomType,
    updateRoomType,
    deleteRoomType
  };
};
