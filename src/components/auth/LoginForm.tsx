
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, AlertCircle, ShieldAlert, Info, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import useAuthentication from '@/hooks/useAuthentication';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { enableDemoMode } from '@/services/authService';

// Define the schema for the login form
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [responseLog, setResponseLog] = useState<string | null>(null);
  const [isNetworkTested, setIsNetworkTested] = useState(false);
  const [canReachServer, setCanReachServer] = useState(false);
  const { toast } = useToast();
  const { login, demoMode } = useAuthentication();
  const navigate = useNavigate();
  
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

  // Function to test network connectivity to the auth server
  const testServerConnection = async () => {
    setIsNetworkTested(false);
    try {
      // Use HEAD method just to check connectivity without transferring much data
      const response = await fetch('http://92.112.184.210:7189/', {
        method: 'HEAD',
        mode: 'no-cors', // This allows us to at least attempt the connection
      });
      
      // If we get here, we could at least establish a connection
      setCanReachServer(true);
      console.log('Authentication server is reachable!');
    } catch (error) {
      setCanReachServer(false);
      console.log('Authentication server is NOT reachable:', error);
    } finally {
      setIsNetworkTested(true);
    }
  };

  // Test connection when component mounts
  useEffect(() => {
    testServerConnection();
  }, []);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {isNetworkTested && (
        <Alert 
          variant={canReachServer ? "info" : "warning"} 
          className="mb-4"
        >
          {canReachServer ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
          <AlertTitle>{canReachServer ? "Server Reachable" : "Server Unreachable"}</AlertTitle>
          <AlertDescription>
            {canReachServer 
              ? "The authentication server is reachable, but you may still experience CORS issues in the browser. If login fails, try Demo Mode." 
              : "The authentication server cannot be reached. This might be due to network issues or CORS restrictions."}
            {!canReachServer && (
              <Button 
                variant="outline" 
                className="mt-2 bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                onClick={testServerConnection}
                type="button"
              >
                Retry Connection
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}
      
      {loginError && (
        <Alert 
          variant={isNetworkError(loginError) ? "warning" : "destructive"} 
          className="mb-4"
        >
          {isNetworkError(loginError) ? 
            <ShieldAlert className="h-4 w-4" /> : 
            <AlertCircle className="h-4 w-4" />
          }
          <AlertTitle>{isNetworkError(loginError) ? "Connection Issue" : "Login failed"}</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
          
          {isNetworkError(loginError) && (
            <Button 
              variant="outline" 
              className="mt-2 bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
              onClick={handleEnterDemoMode}
              type="button"
            >
              Enter Demo Mode
            </Button>
          )}
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          className={errors.email ? "border-red-500" : ""}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className={errors.password ? "border-red-500" : ""}
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          'Log in'
        )}
      </Button>
      
      <div className="mt-4 text-center">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleEnterDemoMode}
        >
          Enter Demo Mode
        </Button>
      </div>

      {responseLog && (
        <Alert variant="info" className="mt-4">
          <Info className="h-4 w-4" />
          <AlertTitle>Authentication Response</AlertTitle>
          <AlertDescription>
            <pre className="text-xs mt-2 bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto max-h-60">
              {responseLog}
            </pre>
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default LoginForm;
