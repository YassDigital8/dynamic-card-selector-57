
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
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
  
  return (
    <Alert 
      variant={canReachServer ? "info" : "warning"} 
      className="mb-4"
    >
      {canReachServer ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
      <AlertTitle>{canReachServer ? "Server Reachable" : "Server Unreachable"}</AlertTitle>
      <AlertDescription>
        {canReachServer 
          ? "The authentication server is reachable, but you may still experience CORS issues in the browser. If login fails, try Demo Mode." 
          : "The authentication server cannot be reached. This might be due to network issues or CORS restrictions."}
        {!canReachServer && (
          <Button 
            variant="outline" 
            className="mt-2 bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
            onClick={testServerConnection}
            type="button"
          >
            Retry Connection
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default NetworkStatusAlert;
