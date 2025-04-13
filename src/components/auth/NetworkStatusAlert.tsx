
import React from 'react';
import { Wifi, WifiOff, Shield, ExternalLink, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface NetworkStatusAlertProps {
  isNetworkTested: boolean;
  canReachServer: boolean;
  testServerConnection: () => void;
}

const NetworkStatusAlert: React.FC<NetworkStatusAlertProps> = () => {
  // Always return null to completely remove the alert
  return null;
};

export default NetworkStatusAlert;
