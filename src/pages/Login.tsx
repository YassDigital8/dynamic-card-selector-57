
import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import useAuthentication from '@/hooks/useAuthentication';
import AuthErrorAlert from '@/components/pages/index/AuthErrorAlert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Login = () => {
  const { authToken, authLoading, authError } = useAuthentication();

  // Helper to check if the error is related to SSL certificates
  const isCertificateError = (error: string | null): boolean => {
    if (!error) return false;
    return error.includes('SSL Certificate Error') || 
           error.includes('certificate') || 
           error.includes('Failed to fetch');
  };

  // If authenticated, redirect to the homepage
  if (authToken && !authLoading) {
    return <Navigate to="/" replace />;
  }

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
              <LoginForm />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
