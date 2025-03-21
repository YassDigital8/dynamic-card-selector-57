
import { useState, useCallback } from 'react';
import { Hotel, HotelFormData, AmenityImage } from '@/models/HotelModel';
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
      // Log amenity images to ensure they're being saved correctly
      if (hotelData.amenities) {
        console.log('Adding hotel with amenities:', JSON.stringify(hotelData.amenities, null, 2));
        Object.entries(hotelData.amenities).forEach(([key, value]) => {
          if (key.includes('Images') && Array.isArray(value) && value.length > 0) {
            console.log(`Found ${value.length} images for ${key}:`, JSON.stringify(value, null, 2));
          }
        });
      }
      
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
        variant: "default",
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
      
      // Log the update data for debugging
      console.log(`Updating hotel ${id} with data:`, JSON.stringify(hotelData, null, 2));
      
      // Check for amenity images in the update data
      if (hotelData.amenities) {
        console.log('Amenities in update data:', JSON.stringify(hotelData.amenities, null, 2));
        
        Object.entries(hotelData.amenities).forEach(([key, value]) => {
          if (key.includes('Images')) {
            console.log(`Updating ${key}:`, JSON.stringify(value, null, 2));
            if (Array.isArray(value) && value.length > 0) {
              console.log(`Found ${value.length} images for ${key}. Sample:`, JSON.stringify(value[0], null, 2));
            } else if (Array.isArray(value)) {
              console.log(`Empty array for ${key}`);
            } else {
              console.error(`Invalid value for ${key}: not an array`, value);
            }
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
                  mergedAmenities[stringKey as keyof typeof mergedAmenities] = value as any;
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
            Object.entries(updatedHotel.amenities).forEach(([key, value]) => {
              if (key.includes('Images')) {
                if (Array.isArray(value)) {
                  console.log(`Final ${key} in updated hotel: ${value.length} images`);
                  if (value.length > 0) {
                    console.log(`Sample image:`, JSON.stringify(value[0], null, 2));
                  }
                } else {
                  console.error(`ERROR: ${key} is not an array in final updated hotel:`, value);
                  // Ensure it's an array to prevent runtime errors
                  const stringKey = String(key);
                  updatedHotel!.amenities[stringKey as keyof typeof updatedHotel!.amenities] = [] as any;
                }
              }
            });
            
            return updatedHotel;
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
  }, [hotels, toast]);

  return {
    hotels,
    isLoading,
    addHotel,
    updateHotel,
    deleteHotel
  };
};
