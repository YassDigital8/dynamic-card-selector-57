
import { useCallback } from 'react';
import { Hotel } from '@/models/HotelModel';
import { useToast } from '@/hooks/use-toast';

interface UseDeleteHotelProps {
  hotels: Hotel[];
  setHotels: React.Dispatch<React.SetStateAction<Hotel[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDeleteHotel = ({ hotels, setHotels, setIsLoading }: UseDeleteHotelProps) => {
  const { toast } = useToast();

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
        variant: "default",
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
  }, [hotels, setHotels, setIsLoading, toast]);

  return { deleteHotel };
};
