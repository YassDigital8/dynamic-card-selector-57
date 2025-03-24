import { useState, useMemo } from 'react';
import { Hotel } from '@/models/HotelModel';
import { HotelAmenities } from '@/models/HotelModel';
import { useDebounce } from '@/hooks/useDebounce';

type AmenitiesFilter = HotelAmenities;

export const useHotelFiltering = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState<string[]>([]);
  const [amenityFilter, setAmenityFilter] = useState<AmenitiesFilter>({
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
    shuttleBus: false,
    extraBed: false,
    // Image fields should be included but won't be used for filtering
    barImages: [],
    gymImages: [],
    spaImages: [],
    restaurantImages: [],
    breakfastImages: [],
    swimmingPoolImages: []
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const updateAmenityFilter = (amenity: keyof AmenitiesFilter, value: boolean) => {
    setAmenityFilter(prev => ({
      ...prev,
      [amenity]: value
    }));
  };

  const filterHotels = (hotels: Hotel[]): Hotel[] => {
    return hotels.filter(hotel => {
      const searchRegex = new RegExp(debouncedSearchTerm, 'i');
      const matchesSearchTerm = searchRegex.test(hotel.name) || searchRegex.test(hotel.streetAddress) || searchRegex.test(hotel.governorate);

      const matchesCountry = countryFilter.length === 0 || countryFilter.includes(hotel.country);

      const matchesAmenities = Object.keys(amenityFilter).every(key => {
        const amenityKey = key as keyof AmenitiesFilter;
        if (typeof amenityFilter[amenityKey] === 'boolean' && amenityFilter[amenityKey]) {
          return hotel.amenities[amenityKey] === amenityFilter[amenityKey];
        }
        return true;
      });

      return matchesSearchTerm && matchesCountry && matchesAmenities;
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    countryFilter,
    setCountryFilter,
    amenityFilter,
    setAmenityFilter,
    updateAmenityFilter,
    filterHotels
  };
};
