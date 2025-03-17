
import React from 'react';
import { Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import AmenityFilters from './filters/AmenityFilters';
import DateFilters from './filters/DateFilters';
import CountryFilters from './filters/CountryFilters';
import FilterBadge from './filters/FilterBadge';

export interface FilterOptions {
  amenities: {
    wifi: boolean;
    restaurant: boolean;
    gym: boolean;
    swimmingPool: boolean;
  };
  showOnlyNewest: boolean;
  countryFilter: string | null;
}

interface HotelFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  activeFilterCount: number;
}

const HotelFilters: React.FC<HotelFiltersProps> = ({
  filters,
  onFilterChange,
  activeFilterCount
}) => {
  const handleAmenityChange = (amenity: keyof FilterOptions['amenities']) => {
    onFilterChange({
      ...filters,
      amenities: {
        ...filters.amenities,
        [amenity]: !filters.amenities[amenity]
      }
    });
  };

  const handleNewestToggle = () => {
    onFilterChange({
      ...filters,
      showOnlyNewest: !filters.showOnlyNewest
    });
  };

  const handleCountryChange = (country: string | null) => {
    onFilterChange({
      ...filters,
      countryFilter: country
    });
  };

  const clearFilters = () => {
    onFilterChange({
      amenities: {
        wifi: false,
        restaurant: false,
        gym: false,
        swimmingPool: false
      },
      showOnlyNewest: false,
      countryFilter: null
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-800 shadow-sm">
          <Filter className="h-4 w-4 text-indigo-500" />
          <span>Filters</span>
          <FilterBadge count={activeFilterCount} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-800 shadow-lg">
        <DropdownMenuLabel className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300">
          <Filter className="h-4 w-4" />
          Filter Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <AmenityFilters 
            amenities={filters.amenities} 
            onAmenityChange={handleAmenityChange} 
          />
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DateFilters 
            showOnlyNewest={filters.showOnlyNewest} 
            onNewestToggle={handleNewestToggle} 
          />
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <CountryFilters 
            countryFilter={filters.countryFilter} 
            onCountryChange={handleCountryChange} 
          />
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <Button 
            variant="outline" 
            className="w-full text-xs border-indigo-200 hover:border-indigo-300 dark:border-indigo-800 dark:hover:border-indigo-700"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HotelFilters;
