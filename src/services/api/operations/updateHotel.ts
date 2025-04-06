
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { toast } from '@/hooks/use-toast';
import { API_BASE_URL, createAuthHeaders, handleApiError } from '../config/apiConfig';
import { transformHotelToApiRequest, transformApiResponseToHotel } from '../transforms/hotelTransforms';
import { isInDemoMode } from '@/services/authService';

/**
 * Update an existing hotel
 */
export const updateHotel = async (id: string, hotelData: HotelFormData): Promise<Hotel | null> => {
  // In demo mode, simulate a successful API response with mock data
  if (isInDemoMode()) {
    console.log('Demo mode active: Simulating hotel update');
    const mockUpdatedHotel: Hotel = {
      ...hotelData,
      id,
      updatedAt: new Date()
    };
    return mockUpdatedHotel;
  }
  
  try {
    // Transform our hotel model to match API expectations
    const apiHotel = transformHotelToApiRequest(hotelData);
    
    const response = await fetch(`${API_BASE_URL}/Hotel/${id}`, {
      method: 'PUT',
      headers: createAuthHeaders(),
      body: JSON.stringify(apiHotel)
    });
    
    if (!response.ok) {
      const errorMessage = await handleApiError(response);
      throw new Error(errorMessage);
    }
    
    const hotel = await response.json();
    return transformApiResponseToHotel(hotel);
  } catch (error) {
    console.error('Error updating hotel:', error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to update hotel",
      variant: "destructive",
    });
    return null;
  }
};
