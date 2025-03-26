
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, AlertCircle, ShieldAlert, Info } from 'lucide-react';
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
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
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

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);
    setResponseLog(null);
    setApiErrorMessage(null);
    
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
        errorMessage = 'Network error: The authentication server is not accessible. This might be due to an SSL certificate issue.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
        
        // Set the API error message specifically
        setApiErrorMessage(error.message);
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
      {loginError && (
        <Alert 
          variant={isCertificateError(loginError) ? "warning" : "destructive"} 
          className="mb-4"
        >
          {isCertificateError(loginError) ? 
            <ShieldAlert className="h-4 w-4" /> : 
            <AlertCircle className="h-4 w-4" />
          }
          <AlertTitle>{isCertificateError(loginError) ? "SSL Certificate Issue" : "Login failed"}</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
          
          {isCertificateError(loginError) && (
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
      
      {apiErrorMessage && (
        <Alert variant="error" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>API Response</AlertTitle>
          <AlertDescription className="font-medium">
            {apiErrorMessage}
          </AlertDescription>
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
