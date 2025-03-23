
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, AlertCircle, ShieldAlert, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import useAuthentication from '@/hooks/useAuthentication';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { enableDemoMode, checkApiConnectivity } from '@/services/authService';

// Define the schema for the login form
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');
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

  // Check API connectivity on load
  useEffect(() => {
    const checkConnection = async () => {
      setApiStatus('checking');
      const isConnected = await checkApiConnectivity();
      setApiStatus(isConnected ? 'available' : 'unavailable');
    };
    checkConnection();
  }, []);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      console.log('Attempting to authenticate with:', data.email);
      
      const authResult = await login({
        email: data.email,
        password: data.password
      });
      
      console.log('Login successful, navigating to home page');
      
      // Force navigation after successful login
      navigate('/', { replace: true });
      
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = '';
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = 'Network error: The authentication server is not accessible. This might be due to an SSL certificate issue or server unavailability.';
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

  // Helper to check if the error is related to SSL certificates
  const isCertificateError = (error: string | null): boolean => {
    if (!error) return false;
    return error.includes('SSL Certificate Error') || 
           error.includes('certificate') || 
           error.includes('Failed to fetch');
  };
  
  // Handle entering demo mode
  const handleEnterDemoMode = () => {
    enableDemoMode();
    onSubmit({ email: 'demo@example.com', password: 'demo123456' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* API Status Indicator */}
      <div className="mb-4">
        <Alert variant={apiStatus === 'checking' ? 'default' : apiStatus === 'available' ? 'default' : 'warning'} className="mb-4">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>API Connection Status</AlertTitle>
          <AlertDescription>
            {apiStatus === 'checking' && 'Checking connection to authentication server...'}
            {apiStatus === 'available' && 'Connected to authentication server. You can log in with your credentials.'}
            {apiStatus === 'unavailable' && 'Unable to connect to authentication server. The server may be down or there might be network issues. You can still use demo mode.'}
          </AlertDescription>
        </Alert>
      </div>

      {loginError && (
        <Alert 
          variant={isCertificateError(loginError) ? "warning" : "destructive"} 
          className="mb-4"
        >
          {isCertificateError(loginError) ? 
            <ShieldAlert className="h-4 w-4" /> : 
            <AlertCircle className="h-4 w-4" />
          }
          <AlertTitle>{isCertificateError(loginError) ? "Connection Issue" : "Login failed"}</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
          
          {isCertificateError(loginError) && (
            <Button 
              variant="outline" 
              className="mt-2 bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
              onClick={handleEnterDemoMode}
            >
              Enter Demo Mode
            </Button>
          )}
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email" required>Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          error={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" required>Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          error={!!errors.password}
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
      
      {(isCertificateError(loginError) || apiStatus === 'unavailable') && (
        <div className="mt-4 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
          <p className="font-medium mb-1">Connection Issues</p>
          <p className="mb-2">There are connectivity issues with the authentication server. This could be due to:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Server might be down or unreachable</li>
            <li>SSL certificate issues with the staging environment</li>
            <li>Network restrictions or firewall settings blocking the connection</li>
          </ul>
          <p className="mt-2">You can try:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Visit <a href="https://staging.sa3d.online:7182" target="_blank" rel="noopener noreferrer" className="underline font-medium">https://staging.sa3d.online:7182</a> directly in your browser to check the connection</li>
            <li>Use the "Enter Demo Mode" button to continue with limited functionality</li>
            <li>Contact your system administrator to check server status</li>
          </ul>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
