
import { useState } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { useToast } from '@/hooks/use-toast';
import { defaultHotels } from './hotelMockData';

export const useHotelCrud = () => {
  const [hotels, setHotels] = useState<Hotel[]>(defaultHotels);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Function to add a new hotel
  const addHotel = (hotelData: HotelFormData) => {
    setIsLoading(true);
    try {
      const newHotel: Hotel = {
        ...hotelData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setHotels([...hotels, newHotel]);
      
      toast({
        title: "Success",
        description: `${newHotel.name} has been added to your hotel network`,
      });
      
      return { success: true, hotel: newHotel };
    } catch (error) {
      console.error('Error adding hotel:', error);
      
      toast({
        title: "Error",
        description: "Failed to add hotel. Please try again.",
        variant: "destructive"
      });
      
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update an existing hotel
  const updateHotel = (id: string, hotelData: Partial<HotelFormData>) => {
    setIsLoading(true);
    try {
      let updatedHotel: Hotel | undefined;
      
      const updatedHotels = hotels.map(hotel => {
        if (hotel.id === id) {
          updatedHotel = {
            ...hotel,
            ...hotelData,
            updatedAt: new Date()
          };
          return updatedHotel;
        }
        return hotel;
      });
      
      setHotels(updatedHotels);
      
      toast({
        title: "Success",
        description: "Hotel information updated successfully",
      });
      
      return { success: true, hotel: updatedHotel };
    } catch (error) {
      console.error('Error updating hotel:', error);
      
      toast({
        title: "Error",
        description: "Failed to update hotel. Please try again.",
        variant: "destructive"
      });
      
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  // Function to delete a hotel
  const deleteHotel = (id: string) => {
    setIsLoading(true);
    try {
      const hotelToDelete = hotels.find(hotel => hotel.id === id);
      
      if (!hotelToDelete) {
        throw new Error('Hotel not found');
      }
      
      const filteredHotels = hotels.filter(hotel => hotel.id !== id);
      setHotels(filteredHotels);
      
      toast({
        title: "Success",
        description: `${hotelToDelete.name} has been removed from your hotel network`,
      });
      
      return { success: true, hotelName: hotelToDelete.name };
    } catch (error) {
      console.error('Error deleting hotel:', error);
      
      toast({
        title: "Error",
        description: "Failed to delete hotel. Please try again.",
        variant: "destructive"
      });
      
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    hotels,
    isLoading,
    addHotel,
    updateHotel,
    deleteHotel
  };
};
