
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
  
  const isCorsProxyActivationError = loginError.includes('CORS Proxy Activation Required');
  const isApiResponseError = loginError.includes('API response:') || loginError.includes('API error:');
  
  const getErrorIcon = () => {
    if (isNetworkError || isCorsProxyActivationError) return <ShieldAlert className="h-4 w-4" />;
    if (isApiResponseError) return <Server className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };
  
  const getErrorTitle = () => {
    if (isCorsProxyActivationError) return "CORS Proxy Activation Required";
    if (isNetworkError) return "Connection Issue";
    if (isApiResponseError) return "Authentication Failed";
    return "Login failed";
  };
  
  const formatApiErrorMessage = (message: string) => {
    if (!isApiResponseError) return message;
    
    // Extract the relevant part from the API error message
    if (message.includes('API response:')) {
      return (
        <div className="space-y-2">
          <p className="font-medium">The server returned:</p>
          <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800 text-sm">
            {message.split('API response:')[1].trim()}
          </div>
          <p className="text-sm italic">Please check your credentials and try again.</p>
        </div>
      );
    } else if (message.includes('API error:')) {
      return (
        <div className="space-y-2">
          <p className="font-medium">The API returned an error:</p>
          <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800 text-sm">
            {message.split('API error:')[1].trim()}
          </div>
          <p className="text-sm italic">Please check your credentials or contact support if this persists.</p>
        </div>
      );
    }
    
    return message;
  };
  
  return (
    <Alert 
      variant={isNetworkError || isCorsProxyActivationError ? "warning" : (isApiResponseError ? "error" : "destructive")} 
      className="mb-4"
    >
      {getErrorIcon()}
      <AlertTitle>{getErrorTitle()}</AlertTitle>
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
          : formatApiErrorMessage(loginError)
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
