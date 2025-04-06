
import { Hotel } from '@/models/HotelModel';
import { toast } from '@/hooks/use-toast';
import { API_BASE_URL, createAuthHeaders, handleApiError } from '../config/apiConfig';
import { transformApiResponseToHotel } from '../transforms/hotelTransforms';

/**
 * Fetch all hotels from the API
 */
export const fetchHotels = async (): Promise<Hotel[]> => {
  try {
    console.log('Fetching hotels from:', `${API_BASE_URL}/Hotel`);
    
    const response = await fetch(`${API_BASE_URL}/Hotel`, {
      method: 'GET',
      headers: createAuthHeaders()
    });
    
    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorMessage = await handleApiError(response);
      throw new Error(errorMessage);
    }
    
    // For debugging - log the raw response
    const responseText = await response.text();
    console.log('Raw API response:', responseText);
    
    // Try to parse the response as JSON
    let hotels;
    try {
      hotels = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse API response as JSON:', parseError);
      console.log('Falling back to mock data due to JSON parse error');
      throw new Error('Invalid JSON response from API');
    }
    
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
