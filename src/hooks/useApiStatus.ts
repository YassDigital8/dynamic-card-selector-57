
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useApiStatus = () => {
  const [isApiLive, setIsApiLive] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const { toast } = useToast();

  const checkApiStatus = async () => {
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
        setIsApiLive(false);
        console.log(`POS API returned status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error checking POS API status:', error);
      setIsApiLive(false);
      
      // Show toast for API status
      toast({
        title: "API Connection Issue",
        description: "Running in demo mode due to API connection issues",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkApiStatus();
    
    // Check API status every 2 minutes
    const interval = setInterval(() => {
      checkApiStatus();
    }, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { isApiLive, isChecking, checkApiStatus };
};

export default useApiStatus;
