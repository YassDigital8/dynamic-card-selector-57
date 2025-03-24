
import { useState, useCallback, useMemo } from 'react';
import { Hotel, HotelAmenities } from '@/models/HotelModel';

// Create a type that has all amenities as booleans
type AmenitiesFilter = {
  [K in keyof HotelAmenities]: boolean;
};

// Initialize with all amenities set to false
const createEmptyAmenitiesFilter = (): AmenitiesFilter => {
  return {
    airConditioning: false,
    bar: false,
    gym: false,
    parking: false,
    spa: false,
    restaurant: false,
    breakfast: false,
    wifi: false,
    swimmingPool: false,
    petsAllowed: false,
    extraBed: false
  };
};

interface FilterState {
  pos: string | null;
  country: string | null;
  amenities: AmenitiesFilter;
  stars: number | null;
  extendedFeatures: {
    bankTransfer: boolean;
  };
}

export const useHotelFiltering = (hotels: Hotel[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    pos: null,
    country: null,
    amenities: createEmptyAmenitiesFilter(),
    stars: null,
    extendedFeatures: {
      bankTransfer: false
    }
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
      const amenityKeys = Object.keys(filters.amenities) as Array<keyof HotelAmenities>;
      for (const key of amenityKeys) {
        if (filters.amenities[key] && !hotel.amenities[key]) {
          return false;
        }
      }
      
      // Star rating filter
      if (filters.stars !== null && hotel.rating !== filters.stars) return false;
      
      // Payment method filter
      if (filters.extendedFeatures.bankTransfer && 
          (!hotel.paymentMethods || !hotel.paymentMethods.some(method => 
            method.id === 'bank-transfer' && method.enabled))) {
        return false;
      }
      
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
