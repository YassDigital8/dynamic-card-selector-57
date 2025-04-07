import { useState, useEffect } from 'react';
import { POSEntry } from '@/models/POSModel';
import { toast } from 'sonner';
import { isInDemoMode } from '@/services/authService';
import { API_BASE_URL, createAuthHeaders, handleApiError } from '@/services/api/config/apiConfig';

export const usePOSData = () => {
  const [posEntries, setPosEntries] = useState<POSEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch POS data
  useEffect(() => {
    const fetchPOSData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (isInDemoMode()) {
          // Return mock data in demo mode
          setTimeout(() => {
            setPosEntries([
              { 
                id: 1, 
                key: 'SY', 
                englishName: 'Syria', 
                arabicName: 'سوريا', 
                createdDate: '2025-01-01', 
                createdBy: 'admin'
              },
              { 
                id: 2, 
                key: 'UAE', 
                englishName: 'United Arab Emirates', 
                arabicName: 'الإمارات العربية المتحدة', 
                createdDate: '2025-01-02', 
                createdBy: 'admin'
              },
              { 
                id: 3, 
                key: 'KSA', 
                englishName: 'Saudi Arabia', 
                arabicName: 'المملكة العربية السعودية', 
                createdDate: '2025-01-03', 
                createdBy: 'admin'
              },
            ]);
            setIsLoading(false);
          }, 800);
          return;
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
        setPosEntries(data);
      } catch (err) {
        console.error('Failed to fetch POS data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load POS data');
        
        // Fallback to demo data when API fails
        setPosEntries([
          { 
            id: 1, 
            key: 'SY', 
            englishName: 'Syria', 
            arabicName: 'سوريا', 
            createdDate: '2025-01-01', 
            createdBy: 'admin'
          },
          { 
            id: 2, 
            key: 'UAE', 
            englishName: 'United Arab Emirates', 
            arabicName: 'الإمارات العربية المتحدة', 
            createdDate: '2025-01-02', 
            createdBy: 'admin'
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPOSData();
  }, []);
  
  // Add a new POS
  const addPOS = async (posData: POSEntry) => {
    try {
      if (isInDemoMode()) {
        // Simulate API call in demo mode
        const newPOS = {
          ...posData,
          id: posEntries.length + 1,
          createdDate: new Date().toISOString(),
          createdBy: 'demo-user',
        };
        
        setPosEntries([...posEntries, newPOS]);
        toast.success('POS added successfully', {
          description: `${posData.englishName} has been added.`
        });
        return;
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
      setPosEntries([...posEntries, newPOS]);
      
      toast.success('POS added successfully', {
        description: `${posData.englishName} has been added.`
      });
    } catch (err) {
      console.error('Failed to add POS:', err);
      toast.error('Failed to add POS', {
        description: err instanceof Error ? err.message : 'An unknown error occurred'
      });
    }
  };
  
  // Delete a POS
  const deletePOS = async (key: string) => {
    // Currently disabled, but keeping the implementation for future use
    toast('Delete functionality disabled', {
      description: `Delete operation for POS is currently disabled.`
    });
    
    /* Uncomment when delete functionality is needed
    try {
      if (isInDemoMode()) {
        // Simulate API call in demo mode
        setPosEntries(posEntries.filter(pos => pos.key !== key));
        toast.success('POS deleted successfully');
        return;
      }
      
      // Real API call
      const response = await fetch(`${API_BASE_URL}/POS/${key}`, {
        method: 'DELETE',
        headers: createAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(await handleApiError(response));
      }
      
      setPosEntries(posEntries.filter(pos => pos.key !== key));
      toast.success('POS deleted successfully');
    } catch (err) {
      console.error('Failed to delete POS:', err);
      toast.error('Failed to delete POS', {
        description: err instanceof Error ? err.message : 'An unknown error occurred'
      });
    }
    */
  };
  
  return {
    posEntries,
    isLoading,
    error,
    addPOS,
    deletePOS
  };
};
