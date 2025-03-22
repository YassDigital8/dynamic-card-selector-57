
import { useState, useEffect } from 'react';

interface UseHotelLoadingStateProps {
  isInitialized: boolean;
  isLoading: boolean;
}

export const useHotelLoadingState = ({ isInitialized, isLoading }: UseHotelLoadingStateProps) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  
  // Track loading state changes for debugging
  useEffect(() => {
    console.log('Hotel loading state changed:', { isInitialized, isLoading, dataLoaded });
  }, [isInitialized, isLoading, dataLoaded]);
  
  // Mark data as loaded once hotels are initialized and not loading
  useEffect(() => {
    if (isInitialized && !isLoading) {
      console.log('Setting hotel data as loaded');
      // Add a small delay to ensure the hotels data is fully processed
      const timer = setTimeout(() => {
        setDataLoaded(true);
      }, 500); // Slightly longer delay to ensure smooth transition
      
      return () => clearTimeout(timer);
    }
  }, [isInitialized, isLoading]);

  // Reset loading state when component unmounts
  useEffect(() => {
    return () => {
      setDataLoaded(false);
    };
  }, []);

  return { dataLoaded };
};

export default useHotelLoadingState;
