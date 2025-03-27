
import { useCallback } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { useHotelCrud } from '../crud';
import { useRoomTypes } from '../useRoomTypes';

/**
 * Hook to manage hotel and room type operations
 */
export const useHotelOperations = (selectedHotel: Hotel | null, hotels: Hotel[]) => {
  const { addHotel: addHotelCrud, updateHotel: updateHotelCrud, deleteHotel: deleteHotelCrud } = useHotelCrud();
  const { addRoomType, updateRoomType, deleteRoomType } = useRoomTypes();

  // Handle hotel operations with updates to selected hotel
  const handleAddHotel = useCallback(async (hotelData: HotelFormData) => {
    try {
      console.log('Starting hotel add process...', hotelData);
      
      // Add processing log to track the flow
      console.log('Calling addHotelCrud with data:', {
        ...hotelData,
        posKey: hotelData.posKey || 'not set'
      });
      
      const result = await addHotelCrud(hotelData);
      
      console.log('Add hotel result:', result);
      
      return result;
    } catch (error) {
      console.error('Error adding hotel:', error);
      return { success: false, error };
    }
  }, [addHotelCrud]);

  const handleUpdateHotel = useCallback(async (id: string, hotelData: HotelFormData) => {
    try {
      const result = await updateHotelCrud(id, hotelData);
      return result;
    } catch (error) {
      console.error('Error updating hotel:', error);
      return { success: false, error };
    }
  }, [updateHotelCrud]);

  const handleDeleteHotel = useCallback(async (id: string) => {
    try {
      const result = await deleteHotelCrud(id);
      return result;
    } catch (error) {
      console.error('Error deleting hotel:', error);
      return { success: false, error };
    }
  }, [deleteHotelCrud]);

  // Room type operations with the current hotel's room types
  const handleAddRoomType = useCallback((hotelId: string, roomTypeData: any) => {
    try {
      const hotel = hotels.find(h => h.id === hotelId);
      if (!hotel) return { success: false, error: 'Hotel not found' };
      
      const result = addRoomType(hotelId, roomTypeData, hotel.roomTypes);
      return result;
    } catch (error) {
      console.error('Error adding room type:', error);
      return { success: false, error };
    }
  }, [hotels, addRoomType]);

  const handleUpdateRoomType = useCallback((hotelId: string, roomTypeId: string, roomTypeData: any) => {
    try {
      const hotel = hotels.find(h => h.id === hotelId);
      if (!hotel) return { success: false, error: 'Hotel not found' };
      
      const result = updateRoomType(hotelId, roomTypeId, roomTypeData, hotel.roomTypes);
      return result;
    } catch (error) {
      console.error('Error updating room type:', error);
      return { success: false, error };
    }
  }, [hotels, updateRoomType]);

  const handleDeleteRoomType = useCallback((hotelId: string, roomTypeId: string) => {
    try {
      const hotel = hotels.find(h => h.id === hotelId);
      if (!hotel) return { success: false, error: 'Hotel not found' };
      
      const result = deleteRoomType(hotelId, roomTypeId, hotel.roomTypes);
      return result;
    } catch (error) {
      console.error('Error deleting room type:', error);
      return { success: false, error };
    }
  }, [hotels, deleteRoomType]);

  return {
    addHotel: handleAddHotel,
    updateHotel: handleUpdateHotel,
    deleteHotel: handleDeleteHotel,
    addRoomType: handleAddRoomType,
    updateRoomType: handleUpdateRoomType,
    deleteRoomType: handleDeleteRoomType
  };
};

export default useHotelOperations;
