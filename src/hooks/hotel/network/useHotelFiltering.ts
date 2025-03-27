
import { useState, useEffect } from 'react';
import { Hotel } from '@/models/HotelModel';

/**
 * Hook to handle hotel filtering by POS
 */
export const useHotelFiltering = (hotels: Hotel[], selectedPOS: string = '') => {
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Filter hotels by POS
  useEffect(() => {
    try {
      // Ensure we have hotels data before filtering
      if (!hotels || hotels.length === 0) {
        // If there are no hotels, we're still initialized but with empty data
        if (!isInitialized) {
          setIsInitialized(true);
        }
        setFilteredHotels([]);
        return;
      }
      
      if (selectedPOS && selectedPOS !== 'all') {
        const filtered = hotels.filter(hotel => 
          hotel.posKey.toLowerCase() === selectedPOS.toLowerCase()
        );
        setFilteredHotels(filtered);
      } else {
        // Show all hotels when no POS is selected or 'all' is selected
        setFilteredHotels([...hotels]);
      }
      
      // Mark as initialized once we've processed the hotels
      if (!isInitialized) {
        console.log('Hotel filtering initialized with', hotels.length, 'hotels');
        setIsInitialized(true);
      }
    } catch (error) {
      console.error('Error filtering hotels:', error);
      // Ensure we still mark as initialized even if there's an error
      if (!isInitialized) {
        setIsInitialized(true);
      }
      // Fallback to empty array on error
      setFilteredHotels([]);
    }
  }, [selectedPOS, hotels, isInitialized]);

  return {
    filteredHotels,
    isInitialized
  };
};

export default useHotelFiltering;
