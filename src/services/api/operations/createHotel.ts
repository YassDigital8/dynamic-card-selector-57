
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { toast } from '@/hooks/use-toast';
import { API_BASE_URL, createAuthHeaders } from '../config/apiConfig';
import { transformHotelToApiRequest, transformApiResponseToHotel } from '../transforms/hotelTransforms';

/**
 * Create a new hotel
 */
export const createHotel = async (hotelData: HotelFormData): Promise<Hotel | null> => {
  try {
    // Transform our hotel model to match API expectations
    const apiHotel = transformHotelToApiRequest(hotelData);
    
    console.log('Sending hotel data to API:', apiHotel);
    
    const response = await fetch(`${API_BASE_URL}/Hotel`, {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify(apiHotel)
    });
    
    const responseText = await response.text();
    console.log('API response text:', responseText);
    
    let responseData;
    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch (e) {
      console.error('Failed to parse API response:', e);
      responseData = null;
    }
    
    if (!response.ok) {
      throw new Error(responseData?.message || `Failed to create hotel: ${response.status}`);
    }
    
    console.log('Hotel created successfully:', responseData);
    
    if (!responseData) {
      throw new Error('No data returned from API');
    }
    
    return transformApiResponseToHotel(responseData);
  } catch (error) {
    console.error('Error creating hotel:', error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to create hotel",
      variant: "destructive",
    });
    return null;
  }
};
