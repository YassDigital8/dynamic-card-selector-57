
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { LoginCredentials } from '@/types/auth.types';
import { loginUser, isInDemoMode, disableDemoMode } from '@/services/authService';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useAuthState } from '@/hooks/useAuthState';
import { useDemoMode } from '@/hooks/useDemoMode';

export const useAuthentication = () => {
  const { toast } = useToast();
  const authState = useAuthState();
  const demoModeState = useDemoMode();
  
  // Define logout function here to pass to useAuthSession
  const logout = () => {
    demoModeState.resetDemoMode();
    authState.clearAuthData();
  };
  
  // Use the session management hook
  const { 
    remainingTime, 
    startSessionTimer, 
    resetSessionTimer 
  } = useAuthSession({ 
    authToken: authState.authToken, 
    logout 
  });
  
  useEffect(() => {
    const checkAuthentication = async () => {
      authState.setLoading(true);
      authState.setError(null);
      
      try {
        // Check if we have a token in localStorage
        const storedToken = localStorage.getItem('authToken');
        
        if (!storedToken) {
          console.log("No authentication token found");
          authState.setLoading(false);
          return;
        }
        
        console.log("Validating stored authentication token...");
        
        // Get stored user info if available
        const storedUserInfo = localStorage.getItem('userInfo');
        let userInfo = null;
        
        if (storedUserInfo) {
          userInfo = JSON.parse(storedUserInfo);
          // Set auth data but don't activate demo mode unless it's a demo token
          authState.setAuthData(storedToken, userInfo);
        }
        
        // Check if demo mode is active - ONLY if token is the demo token
        if (storedToken === 'demo-mode-token') {
          console.log('Demo mode token detected, activating demo mode');
          demoModeState.activateDemoMode();
        } else {
          // If we have a real token, make sure demo mode is off
          console.log('Real token detected, ensuring demo mode is off');
          demoModeState.resetDemoMode();
          // Also ensure the service knows we're not in demo mode
          disableDemoMode();
        }
        
        console.log("Authentication successful with stored token");
      } catch (error) {
        console.error('Authentication validation error:', error);
        
        // Clear invalid token and user info
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('sessionExpiresAt');
        
        let errorMessage = '';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          errorMessage = 'Unknown error occurred during authentication validation';
        }
        
        authState.setError(errorMessage);
      } finally {
        authState.setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    authState.setLoading(true);
    authState.setError(null);
    
    try {
      console.log('Login attempt with:', credentials.email);
      const authData = await loginUser(credentials);
      
      console.log('Login response received:', authData);
      
      // Only activate demo mode if we get a demo-mode-token specifically
      if (authData.token === 'demo-mode-token') {
        console.log('Demo mode token detected, activating demo mode');
        demoModeState.activateDemoMode();
      } else {
        // If we have a real token, make sure demo mode is off
        console.log('Real token received, ensuring demo mode is off');
        demoModeState.resetDemoMode();
      }
      
      // Store the token and user info (including role if available)
      const userInfoToStore = {
        firstName: authData.firstName || 'User',
        email: authData.email,
        role: authData.role || (authData.roles && authData.roles.length > 0 ? authData.roles[0] : 'User')
      };
      
      // Update auth state
      authState.setAuthData(authData.token, userInfoToStore);
      
      // Start session timer
      startSessionTimer();
      
      authState.setLoading(false); // Set loading to false immediately
      
      toast({
        title: demoModeState.demoMode ? "Demo Login successful" : "Login successful",
        description: `Welcome${demoModeState.demoMode ? " to demo mode" : ""}, ${authData.firstName || authData.email}`,
      });
      
      console.log("Authentication successful, token set");
      return authData;
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Unknown error occurred during authentication';
      }
      
      authState.setError(errorMessage);
      throw error;
    } finally {
      authState.setLoading(false);
    }
  };

  return { 
    // Forward auth state
    authToken: authState.authToken, 
    authLoading: authState.authLoading, 
    authError: authState.authError, 
    userInfo: authState.userInfo,
    isAuthenticated: authState.isAuthenticated,
    
    // Forward demo mode state
    demoMode: demoModeState.demoMode,
    
    // Forward session management
    remainingTime,
    resetSessionTimer,
    
    // Methods
    login,
    logout 
  };
};

export default useAuthentication;
