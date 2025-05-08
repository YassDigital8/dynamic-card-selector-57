
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useApiStatus = () => {
  const [isApiLive, setIsApiLive] = useState<boolean | null>(false);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const checkApiStatus = useCallback(async () => {
    // Always set to false - we're forcing demo mode
    setIsApiLive(false);
    setIsChecking(false);
    
    console.log('API connectivity disabled - running in demo mode');
    
    // Show a toast to inform the user
    toast({
      title: "Demo Mode",
      description: "API connectivity has been disabled. Running in demo mode.",
      variant: "default"
    });
  }, [toast]);

  useEffect(() => {
    // Immediate check when component mounts
    checkApiStatus();
  }, [checkApiStatus]);

  return { 
    isApiLive: false, // Always return false to force demo mode
    isChecking: false,
    checkApiStatus 
  };
};

export default useApiStatus;
