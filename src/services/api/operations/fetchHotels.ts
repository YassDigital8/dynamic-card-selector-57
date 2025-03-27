
import { Hotel } from '@/models/HotelModel';
import { toast } from '@/hooks/use-toast';
import { API_BASE_URL, createAuthHeaders, handleApiError } from '../config/apiConfig';
import { transformApiResponseToHotel } from '../transforms/hotelTransforms';

/**
 * Fetch all hotels from the API
 */
export const fetchHotels = async (): Promise<Hotel[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Hotel`, {
      method: 'GET',
      headers: createAuthHeaders()
    });
    
    if (!response.ok) {
      const errorMessage = await handleApiError(response);
      throw new Error(errorMessage);
    }
    
    const hotels = await response.json();
    
    // Transform API response to match our Hotel model
    return hotels.map((hotel: any) => transformApiResponseToHotel(hotel));
  } catch (error) {
    console.error('Error fetching hotels:', error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to fetch hotels",
      variant: "destructive",
    });
    return [];
  }
};
