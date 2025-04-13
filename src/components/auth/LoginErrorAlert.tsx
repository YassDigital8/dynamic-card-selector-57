
import React from 'react';
import { Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface LoginErrorAlertProps {
  loginError: string | null;
  onDemoModeClick: () => void;
}

const LoginErrorAlert: React.FC<LoginErrorAlertProps> = ({
  loginError,
  onDemoModeClick
}) => {
  if (!loginError) return null;
  
  // Only show errors that are specifically from API responses
  const isApiResponseError = loginError.includes('API response:') || loginError.includes('API error:');
  
  if (!isApiResponseError) return null;
  
  const errorMessage = loginError.split(/API response:|API error:/)[1].trim();
  
  return (
    <Alert variant="error" className="mb-4">
      <Server className="h-4 w-4" />
      <AlertTitle>Authentication Failed</AlertTitle>
      <AlertDescription>
        <p className="text-sm">{errorMessage}</p>
      </AlertDescription>
    </Alert>
  );
};

export default LoginErrorAlert;
