
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, AlertCircle, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import useAuthentication from '@/hooks/useAuthentication';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Define the schema for the login form
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { toast } = useToast();
  const { login } = useAuthentication();
  
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
    
    try {
      console.log('Attempting to authenticate with:', data.email);
      
      await login({
        email: data.email,
        password: data.password
      });
      
      console.log('Login successful, should redirect soon');
      
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = '';
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = 'Network error: The authentication server is not accessible. This might be due to an SSL certificate issue.';
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
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
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
      
      {isCertificateError(loginError) && (
        <div className="mt-4 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
          <p className="font-medium mb-1">SSL Certificate Warning</p>
          <p className="mb-2">The server is using a self-signed or invalid SSL certificate. This is common in development or staging environments.</p>
          <p>Options to resolve this:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Visit <a href="https://staging.sa3d.online:7182" target="_blank" rel="noopener noreferrer" className="underline font-medium">https://staging.sa3d.online:7182</a> directly in your browser and accept the certificate</li>
            <li>Contact your system administrator to fix the certificate issue</li>
            <li>Use a production server with a valid SSL certificate</li>
          </ul>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
