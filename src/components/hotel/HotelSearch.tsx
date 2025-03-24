
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, Star, MapPin, Wifi, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { usePageSelectionViewModel } from '@/viewmodels/PageSelectionViewModel';

interface HotelSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    pos: string | null;
    country: string | null;
    amenities: {
      wifi: boolean;
      restaurant: boolean;
      gym: boolean;
      swimmingPool: boolean;
    };
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
    onFilterChange({
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
  };
  
  const activeFilterCount = 
    (filters.pos ? 1 : 0) + 
    (filters.country ? 1 : 0) + 
    (filters.stars ? 1 : 0) +
    Object.values(filters.amenities).filter(Boolean).length;
  
  return (
    <div className="flex flex-col gap-2 w-full bg-white dark:bg-slate-950">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search hotels..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 border border-gray-200 dark:border-gray-700 focus-visible:ring-1 focus-visible:ring-indigo-500 rounded-md"
          disabled={disabled}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {/* POS Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-1 border-gray-200 dark:border-gray-700"
              disabled={disabled}
            >
              <Building className="h-3.5 w-3.5 text-indigo-500" />
              POS
              {filters.pos && <Badge variant="secondary" className="ml-1 px-1 py-0 h-5">{filters.pos}</Badge>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <div className="font-medium text-sm">Point of Sale</div>
              <Separator />
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {posOptions.map((pos) => (
                  <div key={pos.key} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`pos-${pos.key}`} 
                      checked={filters.pos === pos.key}
                      onCheckedChange={() => handlePosChange(filters.pos === pos.key ? null : pos.key)}
                      className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                    />
                    <label 
                      htmlFor={`pos-${pos.key}`} 
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {pos.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Country Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-1 border-gray-200 dark:border-gray-700"
              disabled={disabled}
            >
              <MapPin className="h-3.5 w-3.5 text-indigo-500" />
              Country
              {filters.country && <Badge variant="secondary" className="ml-1 px-1 py-0 h-5">{filters.country}</Badge>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <div className="font-medium text-sm">Countries</div>
              <Separator />
              <div className="space-y-1">
                {countries.map((country) => (
                  <div key={country} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`country-${country}`} 
                      checked={filters.country === country}
                      onCheckedChange={() => handleCountryChange(filters.country === country ? null : country)}
                      className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                    />
                    <label 
                      htmlFor={`country-${country}`} 
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {country}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Amenities Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-1 border-gray-200 dark:border-gray-700"
              disabled={disabled}
            >
              <Wifi className="h-3.5 w-3.5 text-indigo-500" />
              Amenities
              {Object.values(filters.amenities).some(Boolean) && (
                <Badge variant="secondary" className="ml-1 px-1 py-0 h-5">
                  {Object.values(filters.amenities).filter(Boolean).length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <div className="font-medium text-sm">Amenities</div>
              <Separator />
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="amenity-wifi" 
                    checked={filters.amenities.wifi}
                    onCheckedChange={(checked) => handleAmenityChange('wifi', checked === true)}
                    className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                  />
                  <label htmlFor="amenity-wifi" className="text-sm leading-none">WiFi</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="amenity-restaurant" 
                    checked={filters.amenities.restaurant}
                    onCheckedChange={(checked) => handleAmenityChange('restaurant', checked === true)}
                    className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                  />
                  <label htmlFor="amenity-restaurant" className="text-sm leading-none">Restaurant</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="amenity-gym" 
                    checked={filters.amenities.gym}
                    onCheckedChange={(checked) => handleAmenityChange('gym', checked === true)}
                    className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                  />
                  <label htmlFor="amenity-gym" className="text-sm leading-none">Gym</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="amenity-pool" 
                    checked={filters.amenities.swimmingPool}
                    onCheckedChange={(checked) => handleAmenityChange('swimmingPool', checked === true)}
                    className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                  />
                  <label htmlFor="amenity-pool" className="text-sm leading-none">Swimming Pool</label>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Star Rating Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-1 border-gray-200 dark:border-gray-700"
              disabled={disabled}
            >
              <Star className="h-3.5 w-3.5 text-indigo-500" />
              Stars
              {filters.stars && <Badge variant="secondary" className="ml-1 px-1 py-0 h-5">{filters.stars}★</Badge>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <div className="font-medium text-sm">Star Rating</div>
              <Separator />
              <div className="space-y-1">
                {starRatings.map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`star-${rating}`} 
                      checked={filters.stars === rating}
                      onCheckedChange={() => handleStarChange(filters.stars === rating ? null : rating)}
                      className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                    />
                    <label 
                      htmlFor={`star-${rating}`} 
                      className="text-sm leading-none flex items-center"
                    >
                      {rating} {Array(rating).fill(0).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400 inline ml-0.5" />
                      ))}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Clear Filters Button - only show when filters are active */}
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="h-8 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            disabled={disabled}
          >
            Clear filters ({activeFilterCount})
          </Button>
        )}
      </div>
    </div>
  );
};

export default HotelSearch;
