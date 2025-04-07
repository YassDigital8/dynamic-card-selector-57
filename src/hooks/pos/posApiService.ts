import { POSEntry } from '@/models/POSModel';
import { toast } from 'sonner';
import { isInDemoMode } from '@/services/authService';
import { API_BASE_URL, createAuthHeaders, handleApiError } from '@/services/api/config/apiConfig';
import { mockPOSEntries, fallbackPOSEntries } from './mockPOSData';

/**
 * Fetches POS data from the API or returns mock data in demo mode
 */
export const fetchPOSData = async (): Promise<{ data: POSEntry[], error: string | null }> => {
  try {
    if (isInDemoMode()) {
      // Simulate API delay in demo mode
      return await new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: mockPOSEntries, error: null });
        }, 800);
      });
    }
    
    // Real API call
    const response = await fetch(`${API_BASE_URL}/POS`, {
      method: 'GET',
      headers: createAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(await handleApiError(response));
    }
    
    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    console.error('Failed to fetch POS data:', err);
    const errorMessage = err instanceof Error ? err.message : 'Failed to load POS data';
    
    // Return fallback data when API fails
    return { 
      data: fallbackPOSEntries, 
      error: errorMessage 
    };
  }
};

/**
 * Adds a new POS entry
 */
export const addPOSEntry = async (posData: POSEntry): Promise<{ success: boolean, data?: POSEntry }> => {
  try {
    if (isInDemoMode()) {
      // Simulate API call in demo mode
      const newPOS = {
        ...posData,
        id: mockPOSEntries.length + 1,
        createdDate: new Date().toISOString(),
        createdBy: 'demo-user',
      };
      
      toast.success('POS added successfully', {
        description: `${posData.englishName} has been added.`
      });
      
      return { success: true, data: newPOS };
    }
    
    // Real API call
    const response = await fetch(`${API_BASE_URL}/POS`, {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify(posData),
    });
    
    if (!response.ok) {
      throw new Error(await handleApiError(response));
    }
    
    const newPOS = await response.json();
    
    toast.success('POS added successfully', {
      description: `${posData.englishName} has been added.`
    });
    
    return { success: true, data: newPOS };
  } catch (err) {
    console.error('Failed to add POS:', err);
    toast.error('Failed to add POS', {
      description: err instanceof Error ? err.message : 'An unknown error occurred'
    });
    
    return { success: false };
  }
};

/**
 * Deletes a POS entry (currently disabled)
 */
export const deletePOSEntry = async (key: string): Promise<{ success: boolean }> => {
  // Currently disabled, but keeping the implementation for future use
  toast('Delete functionality disabled', {
    description: `Delete operation for POS is currently disabled.`
  });
  
  return { success: false };
  
  /* Uncomment when delete functionality is needed
  try {
    if (isInDemoMode()) {
      // Simulate API call in demo mode
      toast.success('POS deleted successfully');
      return { success: true };
    }
    
    // Real API call
    const response = await fetch(`${API_BASE_URL}/POS/${key}`, {
      method: 'DELETE',
      headers: createAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(await handleApiError(response));
    }
    
    toast.success('POS deleted successfully');
    return { success: true };
  } catch (err) {
    console.error('Failed to delete POS:', err);
    toast.error('Failed to delete POS', {
      description: err instanceof Error ? err.message : 'An unknown error occurred'
    });
    
    return { success: false };
  }
  */
};
