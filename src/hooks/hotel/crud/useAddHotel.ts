
import { useCallback } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { useToast } from '@/hooks/use-toast';
import { validateContactInfo } from './utils/amenityHelpers';

interface UseAddHotelProps {
  hotels: Hotel[];
  setHotels: React.Dispatch<React.SetStateAction<Hotel[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAddHotel = ({ setHotels, setIsLoading }: UseAddHotelProps) => {
  const { toast } = useToast();

  const addHotel = useCallback((hotelData: HotelFormData) => {
    setIsLoading(true);
    try {
      // Log amenity images to ensure they're being saved correctly
      if (hotelData.amenities) {
        console.log('Adding hotel with amenities:', JSON.stringify(hotelData.amenities, null, 2));
        Object.entries(hotelData.amenities).forEach(([key, value]) => {
          if (key.includes('Images') && Array.isArray(value) && value.length > 0) {
            console.log(`Found ${value.length} images for ${key}:`, JSON.stringify(value, null, 2));
          }
        });
      }
      
      // Log contact details and social media
      if (hotelData.contactDetails && hotelData.contactDetails.length > 0) {
        console.log('Adding hotel with contact details:', JSON.stringify(hotelData.contactDetails, null, 2));
      }
      
      if (hotelData.socialMedia && hotelData.socialMedia.length > 0) {
        console.log('Adding hotel with social media:', JSON.stringify(hotelData.socialMedia, null, 2));
      }
      
      const newHotel: Hotel = {
        ...hotelData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Validate and ensure contact info arrays
      const validatedHotel = validateContactInfo(newHotel);
      
      setHotels(prevHotels => [...prevHotels, validatedHotel]);
      
      toast({
        title: "Hotel Added Successfully",
        description: `${validatedHotel.name} has been added to your hotel network`,
        variant: "default",
      });
      
      return { success: true, hotel: validatedHotel };
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
  }, [toast, setHotels, setIsLoading]);

  return { addHotel };
};
