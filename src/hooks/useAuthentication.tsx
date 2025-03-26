
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { LoginCredentials } from '@/types/auth.types';
import { loginUser } from '@/services/authService';
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
      
      // Check if we have a token in localStorage
      const storedToken = localStorage.getItem('authToken');
      
      if (!storedToken) {
        console.log("No authentication token found");
        authState.setLoading(false);
        return;
      }
      
      try {
        console.log("Validating stored authentication token...");
        
        // Get stored user info if available
        const storedUserInfo = localStorage.getItem('userInfo');
        let userInfo = null;
        
        if (storedUserInfo) {
          userInfo = JSON.parse(storedUserInfo);
          authState.setAuthData(storedToken, userInfo);
        }
        
        // Check if demo mode is active
        demoModeState.checkForDemoMode(storedToken);
        
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
  }, [toast, authState, demoModeState]);

  const login = async (credentials: LoginCredentials) => {
    authState.setLoading(true);
    authState.setError(null);
    
    try {
      const authData = await loginUser(credentials);
      
      // Check if we're in demo mode
      if (authData.token === 'demo-mode-token') {
        demoModeState.activateDemoMode();
      }
      
      // Store the token and user info (including role if available)
      const userInfoToStore = {
        firstName: authData.firstName,
        email: authData.email,
        role: authData.role // Include role in user info
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
        
        // Add more specific guidance for SSL certificate errors
        if (errorMessage.includes('SSL Certificate Error')) {
          errorMessage += '\n\nThis is typically caused by a self-signed or invalid SSL certificate on the server.';
          
          // Offer to enable demo mode for certificate errors
          if (window.confirm('Would you like to enter demo mode due to SSL certificate issues?')) {
            demoModeState.activateDemoMode();
            return login(credentials);
          }
        }
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
