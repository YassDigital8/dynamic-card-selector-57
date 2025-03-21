
import { useState } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { useAddHotel } from './useAddHotel';
import { useUpdateHotel } from './useUpdateHotel';
import { useDeleteHotel } from './useDeleteHotel';
import { defaultHotels } from '../hotelMockData';

export const useHotelCrud = () => {
  const [hotels, setHotels] = useState<Hotel[]>(defaultHotels);
  const [isLoading, setIsLoading] = useState(false);
  
  // Use the specialized hooks, passing in the shared state
  const { addHotel } = useAddHotel({ hotels, setHotels, setIsLoading });
  const { updateHotel } = useUpdateHotel({ hotels, setHotels, setIsLoading });
  const { deleteHotel } = useDeleteHotel({ hotels, setHotels, setIsLoading });

  return {
    hotels,
    isLoading,
    addHotel,
    updateHotel,
    deleteHotel
  };
};
