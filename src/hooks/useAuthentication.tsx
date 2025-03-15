
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
  const [authToken, setAuthToken] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const authenticate = async () => {
      setAuthLoading(true);
      setAuthError(null);
      try {
        console.log("Attempting authentication...");
        
        const authResponse = await fetch('https://92.112.184.210:7182/api/Authentication/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: "tarek3.doe@example.com",
            password: "Hi@2025"
          }),
          signal: AbortSignal.timeout(10000)
        });

        if (!authResponse.ok) {
          throw new Error(`Authentication failed with status: ${authResponse.status}`);
        }
        
        const authData: AuthResponse = await authResponse.json();
        console.log("Auth data received:", authData);
        
        if (!authData.isAuthenticated) {
          throw new Error('Authentication failed: ' + authData.message);
        }
        
        setAuthToken(authData.token);
        localStorage.setItem('authToken', authData.token);
        
        setUserInfo({
          firstName: authData.firstName,
          email: authData.email
        });
        
        console.log("Authentication successful!");
        toast({
          title: "Authentication successful",
          description: `Welcome, ${authData.firstName || authData.email}`,
        });
      } catch (error) {
        console.error('Authentication error:', error);
        
        let errorMessage = '';
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          errorMessage = 'Network error: Unable to connect to authentication server. ' +
                        'This may be due to a certificate issue with the server or network connectivity problem.';
        } else {
          errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        }
        
        setAuthError(`Authentication error: ${errorMessage}`);
        
        const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0YXJlazMuZG9lQGV4YW1wbGUuY29tIiwibmFtZSI6IlRhcmVrIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.mock_token";
        setAuthToken(mockToken);
        localStorage.setItem('authToken', mockToken);
        
        toast({
          variant: "destructive",
          title: "Authentication issue",
          description: "Using simulated data for development\n\nError: " + errorMessage.substring(0, 150),
        });
      } finally {
        setAuthLoading(false);
      }
    };

    authenticate();
  }, []);

  return { authToken, authLoading, authError, userInfo };
};

export default useAuthentication;
