
import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';
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
  
  return (
    <Alert 
      variant={isNetworkError ? "warning" : "destructive"} 
      className="mb-4"
    >
      {isNetworkError ? 
        <ShieldAlert className="h-4 w-4" /> : 
        <AlertCircle className="h-4 w-4" />
      }
      <AlertTitle>{isNetworkError ? "Connection Issue" : "Login failed"}</AlertTitle>
      <AlertDescription>{loginError}</AlertDescription>
      
      {isNetworkError && (
        <Button 
          variant="outline" 
          className="mt-2 bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
          onClick={onDemoModeClick}
          type="button"
        >
          Enter Demo Mode
        </Button>
      )}
    </Alert>
  );
};

export default LoginErrorAlert;
