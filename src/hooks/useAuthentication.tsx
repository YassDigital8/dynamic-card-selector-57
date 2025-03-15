
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

const useAuthentication = () => {
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
        // We could check token validity with the server here if needed
        // For now, we'll just set it as valid
        
        setAuthToken(storedToken);
        
        // Extract user info from the token or fetch it from the server
        // This is a mock implementation
        const mockUserInfo = {
          firstName: "User",
          email: "user@example.com"
        };
        
        setUserInfo(mockUserInfo);
        console.log("Authentication successful with stored token");
        
      } catch (error) {
        console.error('Authentication validation error:', error);
        
        // Clear invalid token
        localStorage.removeItem('authToken');
        
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

  const logout = () => {
    localStorage.removeItem('authToken');
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
    logout 
  };
};

export default useAuthentication;
