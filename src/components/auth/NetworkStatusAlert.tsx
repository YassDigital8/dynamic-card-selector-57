
import React from 'react';
import { Wifi, WifiOff, Shield, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface NetworkStatusAlertProps {
  isNetworkTested: boolean;
  canReachServer: boolean;
  testServerConnection: () => void;
}

const NetworkStatusAlert: React.FC<NetworkStatusAlertProps> = ({
  isNetworkTested,
  canReachServer,
  testServerConnection
}) => {
  if (!isNetworkTested) return null;
  
  // Function to open the security tutorial in a new tab
  const openCorsSecurityGuide = () => {
    window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank', 'noopener,noreferrer');
  };
  
  return (
    <Alert 
      variant={canReachServer ? "info" : "warning"} 
      className="mb-4"
    >
      {canReachServer ? <Wifi className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
      <AlertTitle>{canReachServer ? "Server Reachable" : "CORS Issue Detected"}</AlertTitle>
      <AlertDescription>
        {canReachServer 
          ? "The authentication server is reachable. Multiple CORS bypass methods are enabled." 
          : "The system is attempting to bypass CORS restrictions using multiple proxy methods. If login fails, try Demo Mode."}
        
        {!canReachServer && (
          <div className="mt-2 space-y-2">
            <div className="text-amber-700 text-sm">
              <a 
                href="https://cors-anywhere.herokuapp.com/corsdemo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Enable CORS Anywhere Service
              </a>
            </div>
            <Button 
              variant="outline" 
              className="mt-1 bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
              onClick={testServerConnection}
              type="button"
            >
              Retry Connection
            </Button>
            <div className="text-xs text-gray-500 mt-1">
              Click the link above to enable the CORS proxy service, then click "Retry Connection".
            </div>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default NetworkStatusAlert;
