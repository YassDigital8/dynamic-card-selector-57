
import { Hotel } from '@/models/HotelModel';
import { toast } from '@/hooks/use-toast';
import { API_BASE_URL, createAuthHeaders, handleApiError } from '../config/apiConfig';
import { transformApiResponseToHotel } from '../transforms/hotelTransforms';
import { isInDemoMode } from '@/services/authService';
import { defaultHotels } from '@/hooks/hotel/mockData';

/**
 * Fetch all hotels from the API, or return mock data in demo mode
 */
export const fetchHotels = async (): Promise<Hotel[]> => {
  // Check if in demo mode first
  if (isInDemoMode()) {
    console.log('Demo mode active: Using mock hotel data instead of API');
    return defaultHotels;
  }
  
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
      return defaultHotels;
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
    // Always fall back to mock data on any error
    return defaultHotels;
  }
};
