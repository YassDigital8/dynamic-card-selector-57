
import { useState, useEffect } from 'react';
import { FilterOptions } from '@/components/hotel/HotelFilters';
import { Hotel } from '@/models/HotelModel';

export const useHotelFilters = (hotels: Hotel[]) => {
  const [filters, setFilters] = useState<FilterOptions>({
    amenities: {
      wifi: false,
      restaurant: false,
      gym: false,
      swimmingPool: false
    },
    showOnlyNewest: false,
    countryFilter: null
  });
  
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(hotels);
  
  // Apply filters to hotels
  useEffect(() => {
    let result = [...hotels];
    
    // Apply amenities filters
    if (Object.values(filters.amenities).some(Boolean)) {
      result = result.filter(hotel => {
        return (
          (!filters.amenities.wifi || hotel.amenities.wifi) &&
          (!filters.amenities.restaurant || hotel.amenities.restaurant) &&
          (!filters.amenities.gym || hotel.amenities.gym) &&
          (!filters.amenities.swimmingPool || hotel.amenities.swimmingPool)
        );
      });
    }
    
    // Apply newest filter
    if (filters.showOnlyNewest) {
      result = result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    // Apply country filter
    if (filters.countryFilter) {
      result = result.filter(hotel => hotel.country === filters.countryFilter);
    }
    
    setFilteredHotels(result);
  }, [hotels, filters]);

  return {
    filters,
    setFilters,
    filteredHotels
  };
};

export default useHotelFilters;
