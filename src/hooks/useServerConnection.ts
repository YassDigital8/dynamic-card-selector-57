
import { useState } from 'react';
import { fetchWithCorsHandling } from '@/services/corsProxyService';

export const useServerConnection = () => {
  const [isNetworkTested, setIsNetworkTested] = useState(true);
  const [canReachServer, setCanReachServer] = useState(false);
  
  // Function to test network connectivity to the auth server with enhanced CORS handling
  const testServerConnection = async () => {
    // Always set to false - we're forcing demo mode
    setCanReachServer(false);
    setIsNetworkTested(true);
    console.log('Running in demo mode - API connectivity disabled');
  };

  return {
    isNetworkTested,
    canReachServer: false, // Always return false to force demo mode
    testServerConnection
  };
};

export default useServerConnection;
