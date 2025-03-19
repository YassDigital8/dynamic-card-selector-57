
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from '@/types/auth.types';

export const useAuthState = () => {
  const [authToken, setAuthToken] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const setAuthData = (token: string, user: UserInfo | null) => {
    setAuthToken(token);
    setUserInfo(user);
    
    // Store the token and user info in localStorage
    if (token) {
      localStorage.setItem('authToken', token);
    }
    
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
    }
  };

  const clearAuthData = () => {
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

  const setLoading = (isLoading: boolean) => {
    setAuthLoading(isLoading);
  };

  const setError = (error: string | null) => {
    setAuthError(error);
  };

  return {
    // State
    authToken,
    authLoading,
    authError,
    userInfo,
    isAuthenticated: !!authToken,
    
    // Methods
    setAuthData,
    clearAuthData,
    setLoading,
    setError
  };
};
