
import React from 'react';
import { AlertCircle, ShieldAlert, ExternalLink, Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface LoginErrorAlertProps {
  loginError: string | null;
  isNetworkError: boolean;
  onDemoModeClick: () => void;
}

const LoginErrorAlert: React.FC<LoginErrorAlertProps> = ({
  loginError,
  isNetworkError,
  onDemoModeClick
}) => {
  if (!loginError) return null;
  
  // Simplified error handling to focus on API errors
  const isApiResponseError = loginError.includes('API response:') || loginError.includes('API error:');
  
  const formatApiErrorMessage = (message: string) => {
    if (!isApiResponseError) return message;
    
    return (
      <div className="space-y-2">
        <p className="font-medium">Authentication Error:</p>
        <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800 text-sm">
          {message.split(/API response:|API error:/)[1].trim()}
        </div>
        <p className="text-sm italic">Please check your credentials and try again.</p>
      </div>
    );
  };
  
  return (
    <Alert 
      variant={isApiResponseError ? "error" : "destructive"} 
      className="mb-4"
    >
      <Server className="h-4 w-4" />
      <AlertTitle>Authentication Failed</AlertTitle>
      <AlertDescription>
        {formatApiErrorMessage(loginError)}
      </AlertDescription>
    </Alert>
  );
};

export default LoginErrorAlert;

