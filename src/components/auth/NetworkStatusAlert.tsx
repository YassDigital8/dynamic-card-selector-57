
import React from 'react';
import { Wifi, WifiOff, Shield, ExternalLink, AlertTriangle } from 'lucide-react';
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
      {canReachServer ? <Wifi className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
      <AlertTitle>{canReachServer ? "Server Reachable" : "CORS Issue Detected"}</AlertTitle>
      <AlertDescription>
        {canReachServer 
          ? "The authentication server is reachable. Multiple CORS bypass methods are enabled." 
          : "The system is attempting to bypass CORS restrictions using multiple proxy methods. If login fails, try Demo Mode."}
        
        {!canReachServer && (
          <div className="mt-2 space-y-2">
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-2">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Required: Enable CORS Proxy</h4>
                  <p className="text-sm text-amber-700 mb-2">The CORS Anywhere proxy requires manual activation before it can be used:</p>
                  <ol className="list-decimal pl-5 text-sm text-amber-700 space-y-1 mb-3">
                    <li>Click the link below to open the CORS Anywhere demo page</li>
                    <li>Click the button that says "Request temporary access to the demo server"</li>
                    <li>Return to this page and click "Retry Connection"</li>
                  </ol>
                </div>
              </div>
              
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
            
            <Button 
              variant="outline" 
              className="mt-1 bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
              onClick={testServerConnection}
              type="button"
            >
              Retry Connection After Enabling
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default NetworkStatusAlert;
