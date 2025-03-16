import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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

export const useAuthentication = () => {
  const [authToken, setAuthToken] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { toast } = useToast();
  
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
        
        setAuthToken(storedToken);
        console.log("Authentication successful with stored token");
        
      } catch (error) {
        console.error('Authentication validation error:', error);
        
        // Clear invalid token and user info
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');
        
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
  }, []);

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
        
        // Update state
        setAuthToken(authData.token);
        setUserInfo(userInfoToStore);
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${authData.firstName || authData.email}`,
        });
        
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
    setAuthToken('');
    setUserInfo(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Redirect to login page
    window.location.href = '/login';
  };

  return { 
    authToken, 
    authLoading, 
    authError, 
    userInfo,
    isAuthenticated: !!authToken,
    login,
    logout 
  };
};

export default useAuthentication;
