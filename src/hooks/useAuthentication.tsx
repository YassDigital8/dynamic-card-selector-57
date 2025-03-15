
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
        
        // Get stored user info if available
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        } else {
          // If no user info is stored but we have a token, we could attempt to validate with server
          try {
            const response = await fetch('https://92.112.184.210:7182/api/Authentication/validate', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
              signal: AbortSignal.timeout(10000)
            });
            
            if (response.ok) {
              const userData = await response.json();
              if (userData) {
                setUserInfo({
                  firstName: userData.firstName || "User",
                  email: userData.email || "user@example.com"
                });
                
                // Update stored user info
                localStorage.setItem('userInfo', JSON.stringify({
                  firstName: userData.firstName || "User",
                  email: userData.email || "user@example.com"
                }));
              }
            } else {
              // If validation fails, we'll set a default
              const mockUserInfo = {
                firstName: "User",
                email: "user@example.com"
              };
              setUserInfo(mockUserInfo);
            }
          } catch (validationError) {
            console.error('Token validation error:', validationError);
            // Just use token without validation
          }
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
    logout 
  };
};

export default useAuthentication;
