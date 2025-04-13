import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useApiStatus = () => {
  const [isApiLive, setIsApiLive] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const { toast } = useToast();

  const checkApiStatus = useCallback(async () => {
    setIsChecking(true);
    try {
      // Check for authentication token
      const authToken = localStorage.getItem('authToken');
      
      // If we have a token and it's not the demo token, consider the API as live
      if (authToken && authToken !== 'demo-mode-token') {
        setIsApiLive(true);
        console.log('API is considered live based on valid authentication token');
        setIsChecking(false);
        return;
      }
      
      // Try to fetch from the users endpoint to check if API is working
      const response = await fetch('https://reports.chamwings.com:7182/api/Authentication/get-all-users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Include auth token if available
          ...(authToken ? {
            'Authorization': `Bearer ${authToken}`
          } : {})
        }
      });
      
      if (response.ok) {
        setIsApiLive(true);
        console.log('API is live and responding');
      } else {
        // If API returns an error status but it's a 401/403, that's still considered "live"
        // since those are authorization errors, not connectivity issues
        if (response.status === 401 || response.status === 403) {
          setIsApiLive(true);
          console.log(`API returned auth error: ${response.status}, but connection is working`);
        } else {
          // Other error statuses indicate API issues
          setIsApiLive(false);
          console.log(`API returned error status: ${response.status}`);
          
          toast({
            title: "API Connection Issue",
            description: "Running in demo mode due to API status: " + response.status,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      // Only show toast for network errors if we don't have a valid token
      // This prevents the message from appearing when we're actually authenticated
      const authToken = localStorage.getItem('authToken');
      if (!authToken || authToken === 'demo-mode-token') {
        console.error('Error checking API status:', error);
        setIsApiLive(false);
        
        toast({
          title: "API Connection Issue",
          description: "Running in demo mode due to API connection issues",
          variant: "destructive"
        });
      } else {
        // If we have a valid token but still get an error, don't show the toast
        // Just log it and consider API as live
        console.log('Network error occurred but we have a valid token:', error);
        setIsApiLive(true);
      }
    } finally {
      setIsChecking(false);
    }
  }, [toast]);

  useEffect(() => {
    // Immediate check when component mounts
    checkApiStatus();
    
    // Check API status every 5 minutes instead of 2 minutes (to reduce noise)
    const interval = setInterval(() => {
      checkApiStatus();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [checkApiStatus]);

  return { isApiLive, isChecking, checkApiStatus };
};

export default useApiStatus;
