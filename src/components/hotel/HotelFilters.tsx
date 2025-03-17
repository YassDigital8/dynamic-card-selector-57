
import React from 'react';
import { 
  Filter, 
  Star, 
  Wifi, 
  Home, 
  Coffee, 
  Dumbbell, 
  Pool,
  Clock,
  MapPin,
  Building
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

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
          {activeFilterCount > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300 text-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-800 shadow-lg">
        <DropdownMenuLabel className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300">
          <Filter className="h-4 w-4" />
          Filter Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Amenities
          </DropdownMenuLabel>
          
          <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-indigo-500" />
              <span>WiFi</span>
            </div>
            <Checkbox 
              checked={filters.amenities.wifi}
              onCheckedChange={() => handleAmenityChange('wifi')}
              className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
            />
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
            <div className="flex items-center gap-2">
              <Coffee className="h-4 w-4 text-indigo-500" />
              <span>Restaurant</span>
            </div>
            <Checkbox 
              checked={filters.amenities.restaurant}
              onCheckedChange={() => handleAmenityChange('restaurant')} 
              className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
            />
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-indigo-500" />
              <span>Gym</span>
            </div>
            <Checkbox 
              checked={filters.amenities.gym}
              onCheckedChange={() => handleAmenityChange('gym')} 
              className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
            />
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
            <div className="flex items-center gap-2">
              <Pool className="h-4 w-4 text-indigo-500" />
              <span>Swimming Pool</span>
            </div>
            <Checkbox 
              checked={filters.amenities.swimmingPool}
              onCheckedChange={() => handleAmenityChange('swimmingPool')} 
              className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Date
          </DropdownMenuLabel>
          <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-500" />
              <span>Newest First</span>
            </div>
            <Checkbox 
              checked={filters.showOnlyNewest}
              onCheckedChange={handleNewestToggle} 
              className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Country
          </DropdownMenuLabel>
          {['UAE', 'Saudi Arabia', 'Bahrain', 'Qatar'].map(country => (
            <DropdownMenuItem 
              key={country} 
              className="flex items-center gap-2"
              onSelect={() => handleCountryChange(country === filters.countryFilter ? null : country)}
            >
              <MapPin className="h-4 w-4 text-indigo-500" />
              <span>{country}</span>
              {filters.countryFilter === country && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          ))}
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
