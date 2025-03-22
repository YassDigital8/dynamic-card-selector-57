
import { useState, useEffect } from 'react';

interface UseHotelLoadingStateProps {
  isInitialized: boolean;
  isLoading: boolean;
}

export const useHotelLoadingState = ({ isInitialized, isLoading }: UseHotelLoadingStateProps) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  
  // Mark data as loaded once hotels are initialized and not loading
  useEffect(() => {
    if (isInitialized && !isLoading) {
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
