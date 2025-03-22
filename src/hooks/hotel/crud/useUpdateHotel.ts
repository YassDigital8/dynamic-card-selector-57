
import { useCallback } from 'react';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { useToast } from '@/hooks/use-toast';
import { validateAmenityImages, cloneAmenityImages, validateContactInfo } from './utils/amenityHelpers';

interface UseUpdateHotelProps {
  hotels: Hotel[];
  setHotels: React.Dispatch<React.SetStateAction<Hotel[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useUpdateHotel = ({ setHotels, setIsLoading }: UseUpdateHotelProps) => {
  const { toast } = useToast();

  const updateHotel = useCallback((id: string, hotelData: Partial<HotelFormData> | Partial<Hotel>) => {
    setIsLoading(true);
    try {
      let updatedHotel: Hotel | undefined;
      
      // Log the update data for debugging
      console.log(`Updating hotel ${id} with data:`, JSON.stringify(hotelData, null, 2));
      
      // Check for amenity images in the update data
      if (hotelData.amenities) {
        console.log('Amenities in update data:', JSON.stringify(hotelData.amenities, null, 2));
        
        Object.entries(hotelData.amenities).forEach(([key, value]) => {
          if (key.includes('Images')) {
            console.log(`Updating ${key}:`, Array.isArray(value) ? value.length : 'not an array', value);
          }
        });
      }
      
      setHotels(prevHotels => {
        const updated = prevHotels.map(hotel => {
          if (hotel.id === id) {
            // Create a deep copy of the existing hotel
            const existingHotel = JSON.parse(JSON.stringify(hotel));
            
            // For amenities, we need special handling to ensure image arrays are preserved
            const mergedAmenities = { ...existingHotel.amenities };
            
            if (hotelData.amenities) {
              // Copy all amenity properties from update data, including image arrays
              Object.entries(hotelData.amenities).forEach(([key, value]) => {
                if (key.includes('Images') && Array.isArray(value)) {
                  console.log(`Merging ${key} with ${value.length} images`);
                  // Explicitly convert key to string here
                  const stringKey = String(key);
                  // Create a deep copy of the array to avoid reference issues
                  mergedAmenities[stringKey as keyof typeof mergedAmenities] = 
                    JSON.parse(JSON.stringify(value)) as any;
                } else {
                  // Boolean flags or other properties
                  const stringKey = String(key);
                  mergedAmenities[stringKey as keyof typeof mergedAmenities] = value as any;
                }
              });
            }
            
            // Create the updated hotel with merged amenities
            updatedHotel = {
              ...existingHotel,
              ...hotelData,
              amenities: mergedAmenities,
              updatedAt: new Date()
            };
            
            // Final validation of amenity images before saving
            updatedHotel = validateAmenityImages(updatedHotel);
            
            // Validate contact info
            updatedHotel = validateContactInfo(updatedHotel);
            
            // Break references by deep cloning
            return cloneAmenityImages(updatedHotel!);
          }
          return hotel;
        });
        return updated;
      });
      
      toast({
        title: "Hotel Updated Successfully",
        description: `${updatedHotel?.name || 'Hotel'} information has been updated`,
        variant: "default",
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
  }, [toast, setHotels, setIsLoading]);

  return { updateHotel };
};
