
import { useState, useEffect, useCallback } from 'react';
import { POSEntry } from '@/models/POSModel';
import { fetchPOSData, addPOSEntry, deletePOSEntry } from './posApiService';

/**
 * Hook for managing POS data
 */
export const usePOSData = () => {
  const [posEntries, setPosEntries] = useState<POSEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch POS data
  useEffect(() => {
    const loadPOSData = async () => {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await fetchPOSData();
      
      setPosEntries(data);
      setError(error);
      setIsLoading(false);
    };
    
    loadPOSData();
  }, []);
  
  // Add a new POS
  const addPOS = useCallback(async (posData: POSEntry) => {
    const { success, data } = await addPOSEntry(posData);
    
    if (success && data) {
      setPosEntries(prev => [...prev, data]);
    }
  }, []);
  
  // Delete a POS
  const deletePOS = useCallback(async (key: string) => {
    const { success } = await deletePOSEntry(key);
    
    if (success) {
      setPosEntries(prev => prev.filter(pos => pos.key !== key));
    }
  }, []);
  
  return {
    posEntries,
    isLoading,
    error,
    addPOS,
    deletePOS
  };
};
