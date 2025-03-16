
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { UserInfo, LoginCredentials } from '@/types/auth.types';
import { loginUser } from '@/services/authService';
import { useAuthSession } from '@/hooks/useAuthSession';

export const useAuthentication = () => {
  const [authToken, setAuthToken] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Define logout function here to pass to useAuthSession
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('sessionExpiresAt');
    setAuthToken('');
    setUserInfo(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Redirect to login page after logout
    navigate('/login', { replace: true });
  };
  
  // Use the session management hook
  const { 
    remainingTime, 
    startSessionTimer, 
    resetSessionTimer 
  } = useAuthSession({ 
    authToken, 
    logout 
  });
  
  useEffect(() => {
    const checkAuthentication = async () => {
      setAuthLoading(true);
      setAuthError(null);
      
      // Check if we have a token in localStorage
      const storedToken = localStorage.getItem('authToken');
      
      if (!storedToken) {
        console.log("No authentication token found");
        setAuthLoading(false);
        return;
      }
      
      try {
        console.log("Validating stored authentication token...");
        
        // Get stored user info if available
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
        
        // Check for existing session timer
        const storedExpiryTime = localStorage.getItem('sessionExpiresAt');
        if (storedExpiryTime) {
          const expiryTime = parseInt(storedExpiryTime, 10);
          const now = Date.now();
          
          if (now > expiryTime) {
            // Session expired
            throw new Error('Session expired');
          } else {
            // Valid session, continue with remaining time
            // setSessionExpiresAt handled in useAuthSession
          }
        } else {
          // No session timer found, start a new one
          startSessionTimer();
        }
        
        setAuthToken(storedToken);
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
        
        setAuthError(errorMessage);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuthentication();
  }, [startSessionTimer]);

  const login = async (credentials: LoginCredentials) => {
    setAuthLoading(true);
    setAuthError(null);
    
    try {
      const authData = await loginUser(credentials);
      
      // Store the token and user info
      localStorage.setItem('authToken', authData.token);
      
      const userInfoToStore = {
        firstName: authData.firstName,
        email: authData.email
      };
      
      localStorage.setItem('userInfo', JSON.stringify(userInfoToStore));
      
      // Start session timer
      startSessionTimer();
      
      // Update state
      setAuthToken(authData.token);
      setUserInfo(userInfoToStore);
      setAuthLoading(false); // Set loading to false immediately
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${authData.firstName || authData.email}`,
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
        }
      } else {
        errorMessage = 'Unknown error occurred during authentication';
      }
      
      setAuthError(errorMessage);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  return { 
    authToken, 
    authLoading, 
    authError, 
    userInfo,
    isAuthenticated: !!authToken,
    remainingTime,
    resetSessionTimer,
    login,
    logout 
  };
};

export default useAuthentication;
