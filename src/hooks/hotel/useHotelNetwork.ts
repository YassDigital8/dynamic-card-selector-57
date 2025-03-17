
import { useState, useEffect, useCallback } from 'react';
import { Hotel } from '@/models/HotelModel';
import { useHotelCrud } from './useHotelCrud';
import { useRoomTypes } from './useRoomTypes';

export const useHotelNetwork = (selectedPOS: string = '') => {
  const { hotels, isLoading, addHotel, updateHotel, deleteHotel } = useHotelCrud();
  const { addRoomType, updateRoomType, deleteRoomType } = useRoomTypes();
  
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Filter hotels by POS
  useEffect(() => {
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
      setFilteredHotels(hotels);
    }
  }, [selectedPOS, hotels, selectedHotel]);

  // Handle hotel operations with updates to selected hotel
  const handleAddHotel = useCallback((hotelData: any) => {
    const result = addHotel(hotelData);
    
    if (result.success && result.hotel) {
      // Select the newly added hotel
      setSelectedHotel(result.hotel);
    }
    
    return result.success;
  }, [addHotel]);

  const handleUpdateHotel = useCallback((id: string, hotelData: any) => {
    const result = updateHotel(id, hotelData);
    
    if (result.success && result.hotel) {
      // If we're updating the currently selected hotel, update that too
      if (selectedHotel && selectedHotel.id === id) {
        setSelectedHotel(result.hotel);
      }
    }
    
    setIsEditing(false);
    return result.success;
  }, [updateHotel, selectedHotel]);

  const handleDeleteHotel = useCallback((id: string) => {
    const result = deleteHotel(id);
    
    // If we're deleting the currently selected hotel, clear the selection
    if (result.success && selectedHotel && selectedHotel.id === id) {
      setSelectedHotel(null);
    }
    
    return result.success;
  }, [deleteHotel, selectedHotel]);

  // Room type operations with the current hotel's room types
  const handleAddRoomType = useCallback((hotelId: string, roomTypeData: any) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) return false;
    
    const result = addRoomType(hotelId, roomTypeData, hotel.roomTypes);
    return result.success;
  }, [hotels, addRoomType]);

  const handleUpdateRoomType = useCallback((hotelId: string, roomTypeId: string, roomTypeData: any) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) return false;
    
    const result = updateRoomType(hotelId, roomTypeId, roomTypeData, hotel.roomTypes);
    return result.success;
  }, [hotels, updateRoomType]);

  const handleDeleteRoomType = useCallback((hotelId: string, roomTypeId: string) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) return false;
    
    const result = deleteRoomType(hotelId, roomTypeId, hotel.roomTypes);
    return result.success;
  }, [hotels, deleteRoomType]);

  return {
    hotels: filteredHotels,
    allHotels: hotels,
    selectedHotel,
    isLoading,
    isEditing,
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
