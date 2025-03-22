
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useApiStatus = () => {
  const [isApiLive, setIsApiLive] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const { toast } = useToast();

  const checkApiStatus = useCallback(async () => {
    setIsChecking(true);
    try {
      // Try to fetch from the POS endpoint to check if API is working
      const response = await fetch('https://staging.sa3d.online:7036/POS', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Include auth token if available
          ...(localStorage.getItem('authToken') ? {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          } : {})
        }
      });
      
      if (response.ok) {
        setIsApiLive(true);
        console.log('POS API is live and responding');
      } else {
        // If API returns an error status, set to demo mode
        setIsApiLive(false);
        console.log(`POS API returned status: ${response.status}`);
        
        // Only show toast for non-403 errors (403 is expected for unauthorized access)
        if (response.status !== 403) {
          toast({
            title: "API Connection Issue",
            description: "Running in demo mode due to API status: " + response.status,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Error checking POS API status:', error);
      setIsApiLive(false);
      
      // Show toast for API connection errors
      toast({
        title: "API Connection Issue",
        description: "Running in demo mode due to API connection issues",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  }, [toast]);

  useEffect(() => {
    // Initial check
    checkApiStatus();
    
    // Check API status every 2 minutes
    const interval = setInterval(() => {
      checkApiStatus();
    }, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [checkApiStatus]);

  return { isApiLive, isChecking, checkApiStatus };
};

export default useApiStatus;
