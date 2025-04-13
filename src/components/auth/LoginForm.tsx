
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
import { Form } from '@/components/ui/form';

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
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  // Simplified network error check
  const isNetworkError = (error: string | null): boolean => {
    if (!error) return false;
    return error.includes('Failed to fetch') || 
           error.includes('Network error') || 
           error.includes('certificate');
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
      const authResult = await login({
        email: data.email,
        password: data.password
      });
      
      // Log the response, but we'll handle it differently now
      setResponseLog(JSON.stringify(authResult, null, 2));
      
      navigate('/', { replace: true });
      
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = '';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // If it's an API response error, log the full response
        if (errorMessage.includes('API response:') || errorMessage.includes('API error:')) {
          setResponseLog(JSON.stringify({
            error: true,
            message: errorMessage,
            timestamp: new Date().toISOString()
          }, null, 2));
        }
      } else {
        errorMessage = 'Unknown error occurred during login';
      }
      
      setLoginError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage.includes('API response:') 
          ? "Authentication failed. Please check your credentials." 
          : errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Removed NetworkStatusAlert */}
        
        <LoginErrorAlert 
          loginError={loginError}
          onDemoModeClick={handleEnterDemoMode}
        />
        
        <LoginFormFields form={form} />
        
        <LoginButtons isLoading={isLoading} onDemoModeClick={handleEnterDemoMode} />

        <ResponseLogAlert responseLog={responseLog} />
      </form>
    </Form>
  );
};

export default LoginForm;
