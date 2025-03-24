
import { useState, useCallback, useMemo } from 'react';
import { Hotel } from '@/models/HotelModel';

interface FilterState {
  pos: string | null;
  country: string | null;
  amenities: {
    wifi: boolean;
    restaurant: boolean;
    gym: boolean;
    swimmingPool: boolean;
  };
  stars: number | null;
}

export const useHotelFiltering = (hotels: Hotel[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    pos: null,
    country: null,
    amenities: {
      wifi: false,
      restaurant: false,
      gym: false,
      swimmingPool: false
    },
    stars: null
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      // Text search filter
      const matchesSearch = 
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.governorate.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      // POS filter
      if (filters.pos && hotel.posKey !== filters.pos) return false;
      
      // Country filter
      if (filters.country && hotel.country !== filters.country) return false;
      
      // Amenities filter
      if (filters.amenities.wifi && !hotel.amenities.wifi) return false;
      if (filters.amenities.restaurant && !hotel.amenities.restaurant) return false;
      if (filters.amenities.gym && !hotel.amenities.gym) return false;
      if (filters.amenities.swimmingPool && !hotel.amenities.swimmingPool) return false;
      
      // Star rating filter
      if (filters.stars !== null && hotel.rating !== filters.stars) return false;
      
      return true;
    });
  }, [hotels, searchTerm, filters]);

  return {
    searchTerm,
    filters,
    filteredHotels,
    handleSearchChange,
    handleFilterChange
  };
};

export default useHotelFiltering;
