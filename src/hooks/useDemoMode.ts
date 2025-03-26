
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { isInDemoMode, enableDemoMode } from '@/services/authService';

export const useDemoMode = () => {
  const [demoMode, setDemoMode] = useState<boolean>(isInDemoMode());
  const { toast } = useToast();

  const activateDemoMode = () => {
    enableDemoMode();
    setDemoMode(true);
    
    toast({
      title: "Demo Mode Activated",
      description: "Due to connection issues, you're now in demo mode with limited functionality",
      variant: "destructive"
    });
  };

  const checkForDemoMode = (token: string) => {
    const isDemoModeActive = token === 'demo-mode-token' || isInDemoMode();
    
    if (isDemoModeActive && !demoMode) {
      setDemoMode(true);
      
      toast({
        title: "Demo Mode Active",
        description: "You are using the application in demo mode due to connection issues",
        variant: "destructive"
      });
    }
    
    return isDemoModeActive;
  };

  const resetDemoMode = () => {
    setDemoMode(false);
  };

  return {
    demoMode,
    activateDemoMode,
    checkForDemoMode,
    resetDemoMode
  };
};
