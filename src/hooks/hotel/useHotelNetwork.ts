
import { useState, useEffect, useCallback } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { useHotelCrud } from './useHotelCrud';
import { useRoomTypes } from './useRoomTypes';

export const useHotelNetwork = (selectedPOS: string = '') => {
  const { hotels, isLoading, addHotel, updateHotel, deleteHotel } = useHotelCrud();
  const { addRoomType, updateRoomType, deleteRoomType } = useRoomTypes();
  
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Filter hotels by POS
  useEffect(() => {
    try {
      if (selectedPOS && selectedPOS !== 'all') {
        const filtered = hotels.filter(hotel => 
          hotel.posKey.toLowerCase() === selectedPOS.toLowerCase()
        );
        setFilteredHotels(filtered);
        
        // Clear selected hotel if it's not in the filtered list
        if (selectedHotel && !filtered.some(h => h.id === selectedHotel.id)) {
          setSelectedHotel(null);
        }
      } else {
        // Show all hotels when no POS is selected or 'all' is selected
        setFilteredHotels([...hotels]);
      }
      
      // Mark as initialized once we've processed the hotels
      if (!isInitialized) {
        setIsInitialized(true);
      }
    } catch (error) {
      console.error('Error filtering hotels:', error);
      // Ensure we still mark as initialized even if there's an error
      if (!isInitialized) {
        setIsInitialized(true);
      }
      // Fallback to empty array on error
      setFilteredHotels([]);
    }
  }, [selectedPOS, hotels, selectedHotel, isInitialized]);

  // Handle hotel operations with updates to selected hotel
  const handleAddHotel = useCallback((hotelData: HotelFormData) => {
    try {
      const result = addHotel(hotelData);
      
      if (result.success && result.hotel) {
        // Select the newly added hotel
        setSelectedHotel(result.hotel);
      }
      
      return result;
    } catch (error) {
      console.error('Error adding hotel:', error);
      return { success: false, error };
    }
  }, [addHotel]);

  const handleUpdateHotel = useCallback((id: string, hotelData: HotelFormData) => {
    try {
      const result = updateHotel(id, hotelData);
      
      if (result.success && result.hotel) {
        // If we're updating the currently selected hotel, update that too
        if (selectedHotel && selectedHotel.id === id) {
          setSelectedHotel(result.hotel);
        }
      }
      
      setIsEditing(false);
      return result;
    } catch (error) {
      console.error('Error updating hotel:', error);
      setIsEditing(false);
      return { success: false, error };
    }
  }, [updateHotel, selectedHotel]);

  const handleDeleteHotel = useCallback((id: string) => {
    try {
      const result = deleteHotel(id);
      
      // If we're deleting the currently selected hotel, clear the selection
      if (result.success && selectedHotel && selectedHotel.id === id) {
        setSelectedHotel(null);
      }
      
      return result;
    } catch (error) {
      console.error('Error deleting hotel:', error);
      return { success: false, error };
    }
  }, [deleteHotel, selectedHotel]);

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
    hotels: filteredHotels,
    allHotels: hotels,
    selectedHotel,
    isLoading,
    isEditing,
    isInitialized,
    setSelectedHotel,
    setIsEditing,
    addHotel: handleAddHotel,
    updateHotel: handleUpdateHotel,
    deleteHotel: handleDeleteHotel,
    addRoomType: handleAddRoomType,
    updateRoomType: handleUpdateRoomType,
    deleteRoomType: handleDeleteRoomType
  };
};

export default useHotelNetwork;
