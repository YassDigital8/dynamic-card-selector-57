
import React from 'react';
import { AlertCircle, ShieldAlert, ExternalLink } from 'lucide-react';
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
  
  const isCorsProxyActivationError = loginError.includes('CORS Proxy Activation Required');
  
  return (
    <Alert 
      variant={isNetworkError || isCorsProxyActivationError ? "warning" : "destructive"} 
      className="mb-4"
    >
      {isNetworkError || isCorsProxyActivationError ? 
        <ShieldAlert className="h-4 w-4" /> : 
        <AlertCircle className="h-4 w-4" />
      }
      <AlertTitle>
        {isCorsProxyActivationError 
          ? "CORS Proxy Activation Required" 
          : (isNetworkError ? "Connection Issue" : "Login failed")}
      </AlertTitle>
      <AlertDescription>
        {isCorsProxyActivationError 
          ? (
            <div className="space-y-2">
              <p>You need to enable the CORS Anywhere service before using it:</p>
              <ol className="list-decimal pl-5 text-sm space-y-1 mb-3">
                <li>Click the link below to open the CORS Anywhere demo page</li>
                <li>Click the button that says "Request temporary access to the demo server"</li>
                <li>Return to this page and try again</li>
              </ol>
              <a 
                href="https://cors-anywhere.herokuapp.com/corsdemo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800 hover:underline font-medium mt-1"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Enable CORS Anywhere Service
              </a>
            </div>
          ) 
          : loginError
        }
      </AlertDescription>
      
      {(isNetworkError || isCorsProxyActivationError) && (
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
