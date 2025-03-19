
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import useAuthentication from '@/hooks/useAuthentication';
import AuthErrorAlert from '@/components/pages/index/AuthErrorAlert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { enableDemoMode } from '@/services/authService';

const Login = () => {
  const { authToken, authLoading, authError, demoMode } = useAuthentication();
  const navigate = useNavigate();

  // Helper to check if the error is related to SSL certificates
  const isCertificateError = (error: string | null): boolean => {
    if (!error) return false;
    return error.includes('SSL Certificate Error') || 
           error.includes('certificate') || 
           error.includes('Failed to fetch');
  };

  // Use effect to handle redirection when auth state changes
  useEffect(() => {
    if (authToken && !authLoading) {
      console.log("Auth token detected in Login component, redirecting to home page");
      navigate('/', { replace: true });
    }
  }, [authToken, authLoading, navigate]);

  // If authenticated, also try immediate redirect
  if (authToken && !authLoading) {
    console.log("Authenticated, immediate redirect attempted to home page");
    return <Navigate to="/" replace />;
  }

  // Handle entering demo mode
  const handleEnterDemoMode = async () => {
    enableDemoMode();
    try {
      await (async () => {
        // Call login with empty credentials to trigger demo mode
        await useAuthentication().login({ email: 'demo@example.com', password: 'demo' });
        navigate('/', { replace: true });
      })();
    } catch (error) {
      console.error('Error entering demo mode:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cham Wings Admin Portal</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Log in to access the admin portal</p>
        </div>
        
        {authError && !isCertificateError(authError) && (
          <AuthErrorAlert error={authError} title="Authentication Error" />
        )}
        
        {authError && isCertificateError(authError) && (
          <Alert variant="warning" className="mb-6">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>SSL Certificate Issue</AlertTitle>
            <AlertDescription>
              {authError}
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                  onClick={handleEnterDemoMode}
                >
                  Enter Demo Mode
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            {authLoading ? (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Authenticating...</span>
              </div>
            ) : (
              <>
                <LoginForm />
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">
                    Having trouble connecting?
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleEnterDemoMode}
                  >
                    Enter Demo Mode
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
