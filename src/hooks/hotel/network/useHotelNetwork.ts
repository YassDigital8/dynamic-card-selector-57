
import { useState, useEffect } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { useHotelCrud } from '../crud';
import { useHotelFiltering } from './useHotelFiltering';
import { useHotelOperations } from './useHotelOperations';

export const useHotelNetwork = (selectedPOS: string = '') => {
  const { hotels, allHotels, isLoading } = useHotelCrud();
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Log for debugging
  useEffect(() => {
    console.log('Hotels from useHotelCrud:', hotels);
    console.log('allHotels from useHotelCrud:', allHotels);
    console.log('Total hotels loaded:', hotels.length);
  }, [hotels, allHotels]);
  
  // Use the filtering hook
  const { filteredHotels, isInitialized } = useHotelFiltering(hotels, selectedPOS);
  
  // Use the operations hook
  const {
    addHotel,
    updateHotel,
    deleteHotel,
    addRoomType,
    updateRoomType,
    deleteRoomType
  } = useHotelOperations(selectedHotel, allHotels);

  // Update selectedHotel after operations if needed
  const handleAddHotel = async (hotelData: HotelFormData) => {
    const result = await addHotel(hotelData);
    
    // Add type guard to safely check if hotel property exists
    if (result.success && 'hotel' in result && result.hotel) {
      setSelectedHotel(result.hotel);
    }
    return result;
  };

  const handleUpdateHotel = async (id: string, hotelData: HotelFormData) => {
    const result = await updateHotel(id, hotelData);
    
    // Add type guard to safely check if hotel property exists
    if (result.success && 'hotel' in result && result.hotel) {
      // If we're updating the currently selected hotel, update that too
      if (selectedHotel && selectedHotel.id === id) {
        setSelectedHotel(result.hotel);
      }
    }
    setIsEditing(false);
    return result;
  };

  const handleDeleteHotel = async (id: string) => {
    const result = await deleteHotel(id);
    if (result.success && selectedHotel && selectedHotel.id === id) {
      setSelectedHotel(null);
    }
    return result;
  };

  return {
    hotels: filteredHotels,
    allHotels,
    selectedHotel,
    isLoading,
    isEditing,
    isInitialized,
    setSelectedHotel,
    setIsEditing,
    addHotel: handleAddHotel,
    updateHotel: handleUpdateHotel,
    deleteHotel: handleDeleteHotel,
    addRoomType,
    updateRoomType,
    deleteRoomType
  };
};

export default useHotelNetwork;
