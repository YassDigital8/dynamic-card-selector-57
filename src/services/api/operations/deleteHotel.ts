
import { toast } from '@/hooks/use-toast';
import { API_BASE_URL, createAuthHeaders, handleApiError } from '../config/apiConfig';
import { isInDemoMode } from '@/services/authService';

/**
 * Delete a hotel
 */
export const deleteHotel = async (id: string): Promise<boolean> => {
  // In demo mode, simulate a successful API response
  if (isInDemoMode()) {
    console.log('Demo mode active: Simulating hotel deletion');
    return true;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/Hotel/${id}`, {
      method: 'DELETE',
      headers: createAuthHeaders()
    });
    
    if (!response.ok) {
      const errorMessage = await handleApiError(response);
      throw new Error(errorMessage);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting hotel:', error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to delete hotel",
      variant: "destructive",
    });
    return false;
  }
};
