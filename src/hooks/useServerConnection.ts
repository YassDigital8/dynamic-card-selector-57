
import { useState, useEffect } from 'react';
import { fetchWithCorsHandling } from '@/services/corsProxyService';

export const useServerConnection = () => {
  const [isNetworkTested, setIsNetworkTested] = useState(false);
  const [canReachServer, setCanReachServer] = useState(false);
  
  // Function to test network connectivity to the auth server with enhanced CORS handling
  const testServerConnection = async () => {
    setIsNetworkTested(false);
    try {
      console.log('Testing server connection with enhanced CORS handling...');
      
      // Try to reach the server with our enhanced CORS handling
      const response = await fetchWithCorsHandling('http://92.112.184.210:7189/', {
        method: 'HEAD',
        // The fetchWithCorsHandling function will take care of CORS handling
      });
      
      // If we get here, we could establish a connection
      setCanReachServer(true);
      console.log('Authentication server is reachable!');
    } catch (error) {
      setCanReachServer(false);
      console.log('Authentication server is NOT reachable:', error);
    } finally {
      setIsNetworkTested(true);
    }
  };

  // Test connection when component mounts
  useEffect(() => {
    testServerConnection();
  }, []);

  return {
    isNetworkTested,
    canReachServer,
    testServerConnection
  };
};

export default useServerConnection;
