
import { useState, useEffect } from 'react';

export const useServerConnection = () => {
  const [isNetworkTested, setIsNetworkTested] = useState(false);
  const [canReachServer, setCanReachServer] = useState(false);
  
  // Function to test network connectivity to the auth server
  const testServerConnection = async () => {
    setIsNetworkTested(false);
    try {
      // Use HEAD method just to check connectivity without transferring much data
      const response = await fetch('http://92.112.184.210:7189/', {
        method: 'HEAD',
        mode: 'no-cors', // This allows us to at least attempt the connection
      });
      
      // If we get here, we could at least establish a connection
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
