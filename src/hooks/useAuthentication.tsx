import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthResponse {
  message: string;
  isAuthenticated: boolean;
  email: string;
  firstName: string;
  lastName: string | null;
  token: string;
  expiresOn: string;
}

interface UserInfo {
  firstName: string;
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// Session duration in milliseconds (1 hour)
const SESSION_DURATION = 60 * 60 * 1000;

export const useAuthentication = () => {
  const [authToken, setAuthToken] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Start session timer
  const startSessionTimer = useCallback(() => {
    const expiryTime = Date.now() + SESSION_DURATION;
    setSessionExpiresAt(expiryTime);
    
    // Store session expiry in localStorage
    localStorage.setItem('sessionExpiresAt', expiryTime.toString());
    
    console.log(`Session started, will expire at ${new Date(expiryTime).toLocaleTimeString()}`);
  }, []);
  
  // Reset session timer (e.g., on user activity)
  const resetSessionTimer = useCallback(() => {
    if (authToken) {
      startSessionTimer();
      console.log('Session timer reset due to user activity');
    }
  }, [authToken, startSessionTimer]);
  
  // Handle checking session expiration
  useEffect(() => {
    if (!authToken || !sessionExpiresAt) return;
    
    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = sessionExpiresAt - now;
      
      if (timeLeft <= 0) {
        clearInterval(interval);
        logout();
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
        });
      } else {
        setRemainingTime(timeLeft);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [authToken, sessionExpiresAt, toast]);
  
  // User activity listener
  useEffect(() => {
    if (!authToken) return;
    
    const activityEvents = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    const handleUserActivity = () => resetSessionTimer();
    
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });
    
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [authToken, resetSessionTimer]);
  
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
            setSessionExpiresAt(expiryTime);
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
      console.log('Attempting to authenticate with:', credentials.email);
      
      // First try the staging URL
      const authEndpoint = 'https://staging.sa3d.online:7182/api/Authentication/login';
      console.log('Using authentication endpoint:', authEndpoint);
      
      try {
        const response = await fetch(authEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Authentication failed: ${response.status}`);
        }
        
        const authData: AuthResponse = await response.json();
        
        if (!authData.token) {
          throw new Error('Invalid authentication response: no token received');
        }
        
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
      } catch (fetchError) {
        // Convert the fetch error to a more specific error
        if (fetchError instanceof TypeError && fetchError.message.includes('Failed to fetch')) {
          // This is likely a CORS or certificate issue
          throw new Error('SSL Certificate Error: The server uses an invalid SSL certificate. If you trust this server, please add an exception in your browser or contact your administrator.');
        }
        throw fetchError;
      }
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

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('sessionExpiresAt');
    setAuthToken('');
    setUserInfo(null);
    setSessionExpiresAt(null);
    setRemainingTime(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Redirect to login page after logout
    navigate('/login', { replace: true });
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
