
import { useState, useCallback } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { useToast } from '@/hooks/use-toast';
import { defaultHotels } from './hotelMockData';

export const useHotelCrud = () => {
  const [hotels, setHotels] = useState<Hotel[]>(defaultHotels);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Function to add a new hotel
  const addHotel = useCallback((hotelData: HotelFormData) => {
    setIsLoading(true);
    try {
      const newHotel: Hotel = {
        ...hotelData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setHotels(prevHotels => [...prevHotels, newHotel]);
      
      toast({
        title: "Hotel Added Successfully",
        description: `${newHotel.name} has been added to your hotel network`,
        variant: "default", // Changed from "success" to "default"
      });
      
      return { success: true, hotel: newHotel };
    } catch (error) {
      console.error('Error adding hotel:', error);
      
      toast({
        title: "Failed to Add Hotel",
        description: "There was an error adding your hotel. Please try again.",
        variant: "destructive"
      });
      
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Function to update an existing hotel
  const updateHotel = useCallback((id: string, hotelData: Partial<HotelFormData> | Partial<Hotel>) => {
    setIsLoading(true);
    try {
      let updatedHotel: Hotel | undefined;
      
      setHotels(prevHotels => {
        const updated = prevHotels.map(hotel => {
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
        return updated;
      });
      
      toast({
        title: "Hotel Updated Successfully",
        description: `${updatedHotel?.name || 'Hotel'} information has been updated`,
        variant: "default", // Changed from "success" to "default"
      });
      
      return { success: true, hotel: updatedHotel };
    } catch (error) {
      console.error('Error updating hotel:', error);
      
      toast({
        title: "Failed to Update Hotel",
        description: "There was an error updating your hotel. Please try again.",
        variant: "destructive"
      });
      
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Function to delete a hotel
  const deleteHotel = useCallback((id: string) => {
    setIsLoading(true);
    try {
      const hotelToDelete = hotels.find(hotel => hotel.id === id);
      
      if (!hotelToDelete) {
        throw new Error('Hotel not found');
      }
      
      setHotels(prevHotels => prevHotels.filter(hotel => hotel.id !== id));
      
      toast({
        title: "Hotel Deleted Successfully",
        description: `${hotelToDelete.name} has been removed from your hotel network`,
        variant: "default", // Changed from "success" to "default"
      });
      
      return { success: true, hotelName: hotelToDelete.name };
    } catch (error) {
      console.error('Error deleting hotel:', error);
      
      toast({
        title: "Failed to Delete Hotel",
        description: "There was an error deleting the hotel. Please try again.",
        variant: "destructive"
      });
      
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  }, [hotels, toast]);

  return {
    hotels,
    isLoading,
    addHotel,
    updateHotel,
    deleteHotel
  };
};
