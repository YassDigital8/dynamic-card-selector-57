
import React from 'react';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';
import { HotelAmenities } from '@/models/HotelModel';
import {
  SearchInput,
  POSFilter,
  CountryFilter,
  AmenitiesFilter,
  StarRatingFilter,
  ClearFiltersButton
} from './search';

interface HotelSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    pos: string | null;
    country: string | null;
    amenities: { [K in keyof HotelAmenities]: boolean };
    stars: number | null;
  };
  onFilterChange: (filters: any) => void;
  disabled?: boolean;
}

const HotelSearch: React.FC<HotelSearchProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  disabled = false
}) => {
  const { posOptions } = usePageSelectionViewModel();
  
  const countries = ['UAE', 'Saudi Arabia', 'Bahrain', 'Qatar'];
  const starRatings = [1, 2, 3, 4, 5];
  
  const handlePosChange = (pos: string | null) => {
    onFilterChange({ ...filters, pos });
  };
  
  const handleCountryChange = (country: string | null) => {
    onFilterChange({ ...filters, country });
  };
  
  const handleAmenityChange = (amenity: string, value: boolean) => {
    onFilterChange({
      ...filters,
      amenities: {
        ...filters.amenities,
        [amenity]: value
      }
    });
  };
  
  const handleStarChange = (stars: number | null) => {
    onFilterChange({ ...filters, stars });
  };
  
  const clearFilters = () => {
    // Create a new amenities object with all values set to false
    const resetAmenities: { [K in keyof HotelAmenities]: boolean } = {} as any;
    
    // Set all amenities to false
    Object.keys(filters.amenities).forEach(key => {
      resetAmenities[key as keyof HotelAmenities] = false;
    });
    
    onFilterChange({
      pos: null,
      country: null,
      amenities: resetAmenities,
      stars: null
    });
  };
  
  const activeFilterCount = 
    (filters.pos ? 1 : 0) + 
    (filters.country ? 1 : 0) + 
    (filters.stars ? 1 : 0) +
    Object.values(filters.amenities).filter(Boolean).length;
  
  return (
    <div className="flex flex-col gap-2 w-full bg-white dark:bg-slate-950">
      <SearchInput 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        disabled={disabled}
      />
      
      <div className="flex flex-wrap gap-2">
        <POSFilter 
          posOptions={posOptions}
          selectedPos={filters.pos}
          onPosChange={handlePosChange}
          disabled={disabled}
        />
        
        <CountryFilter 
          countries={countries}
          selectedCountry={filters.country}
          onCountryChange={handleCountryChange}
          disabled={disabled}
        />
        
        <AmenitiesFilter 
          amenities={filters.amenities}
          onAmenityChange={handleAmenityChange}
          disabled={disabled}
        />
        
        <StarRatingFilter 
          starRatings={starRatings}
          selectedStars={filters.stars}
          onStarChange={handleStarChange}
          disabled={disabled}
        />
        
        <ClearFiltersButton 
          activeFilterCount={activeFilterCount}
          onClearFilters={clearFilters}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default HotelSearch;
