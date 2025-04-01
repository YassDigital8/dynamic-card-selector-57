
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import useAuthentication from '@/hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';
import { enableDemoMode } from '@/services/authService';
import useServerConnection from '@/hooks/useServerConnection';
import NetworkStatusAlert from './NetworkStatusAlert';
import LoginErrorAlert from './LoginErrorAlert';
import ResponseLogAlert from './ResponseLogAlert';
import LoginFormFields, { LoginFormValues } from './LoginFormFields';
import LoginButtons from './LoginButtons';

// Define the schema for the login form
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [responseLog, setResponseLog] = useState<string | null>(null);
  const { toast } = useToast();
  const { login } = useAuthentication();
  const navigate = useNavigate();
  
  const { isNetworkTested, canReachServer, testServerConnection } = useServerConnection();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  // Helper to check if the error is related to SSL certificates or network
  const isNetworkError = (error: string | null): boolean => {
    if (!error) return false;
    return error.includes('Failed to fetch') || 
           error.includes('Network error') || 
           error.includes('certificate') ||
           error.includes('CORS');
  };
  
  // Handle entering demo mode
  const handleEnterDemoMode = () => {
    enableDemoMode();
    onSubmit({ email: 'demo@example.com', password: 'demo123456' });
  };

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);
    setResponseLog(null);
    
    try {
      console.log('Attempting to authenticate with:', data.email);
      
      const authResult = await login({
        email: data.email,
        password: data.password
      });
      
      // Log the response
      setResponseLog(JSON.stringify(authResult, null, 2));
      
      console.log('Login successful, navigating to home page');
      
      // Force navigation after successful login
      navigate('/', { replace: true });
      
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = '';
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = 'Network error: The authentication server is not accessible. This may be due to CORS restrictions. Try using Demo Mode or check your network connection.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Unknown error occurred during login';
      }
      
      setLoginError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <NetworkStatusAlert 
        isNetworkTested={isNetworkTested}
        canReachServer={canReachServer}
        testServerConnection={testServerConnection}
      />
      
      <LoginErrorAlert 
        loginError={loginError}
        isNetworkError={isNetworkError(loginError)}
        onDemoModeClick={handleEnterDemoMode}
      />
      
      <LoginFormFields register={register} errors={errors} />
      
      <LoginButtons isLoading={isLoading} onDemoModeClick={handleEnterDemoMode} />

      <ResponseLogAlert responseLog={responseLog} />
    </form>
  );
};

export default LoginForm;
