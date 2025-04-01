
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { isInDemoMode, enableDemoMode, disableDemoMode } from '@/services/authService';

export const useDemoMode = () => {
  const [demoMode, setDemoMode] = useState<boolean>(false);
  const { toast } = useToast();

  // Check if we're in demo mode on initial load
  useEffect(() => {
    const isDemoActive = isInDemoMode();
    setDemoMode(isDemoActive);
    
    // If we're not in demo mode but it's set, reset it
    if (!isDemoActive && demoMode) {
      setDemoMode(false);
    }
  }, []);

  const activateDemoMode = () => {
    enableDemoMode();
    setDemoMode(true);
    
    toast({
      title: "Demo Mode Activated",
      description: "You're now in demo mode with limited functionality",
      variant: "default"
    });
  };

  const checkForDemoMode = (token: string) => {
    // Only consider demo mode active if the token is specifically 'demo-mode-token'
    const isDemoModeActive = token === 'demo-mode-token' || isInDemoMode();
    
    if (isDemoModeActive && !demoMode) {
      setDemoMode(true);
      
      toast({
        title: "Demo Mode Active",
        description: "You are using the application in demo mode",
        variant: "default"
      });
    } else if (!isDemoModeActive && demoMode) {
      // If we have a real token but demo mode is on, turn it off
      setDemoMode(false);
    }
    
    return isDemoModeActive;
  };

  const resetDemoMode = () => {
    setDemoMode(false);
    disableDemoMode(); // Also make sure to update the service
  };

  return {
    demoMode,
    activateDemoMode,
    checkForDemoMode,
    resetDemoMode
  };
};
