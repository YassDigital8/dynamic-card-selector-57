
import React from 'react';
import { Wifi, Coffee, Dumbbell, Waves } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { FilterOptions } from '../HotelFilters';

interface AmenityFiltersProps {
  amenities: FilterOptions['amenities'];
  onAmenityChange: (amenity: keyof FilterOptions['amenities']) => void;
}

const AmenityFilters: React.FC<AmenityFiltersProps> = ({
  amenities,
  onAmenityChange
}) => {
  return (
    <>
      <DropdownMenuLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Amenities
      </DropdownMenuLabel>
      
      <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
        <div className="flex items-center gap-2">
          <Wifi className="h-4 w-4 text-indigo-500" />
          <span>WiFi</span>
        </div>
        <Checkbox 
          checked={amenities.wifi}
          onCheckedChange={() => onAmenityChange('wifi')}
          className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
        />
      </DropdownMenuItem>
      
      <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
        <div className="flex items-center gap-2">
          <Coffee className="h-4 w-4 text-indigo-500" />
          <span>Restaurant</span>
        </div>
        <Checkbox 
          checked={amenities.restaurant}
          onCheckedChange={() => onAmenityChange('restaurant')} 
          className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
        />
      </DropdownMenuItem>
      
      <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
        <div className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-indigo-500" />
          <span>Gym</span>
        </div>
        <Checkbox 
          checked={amenities.gym}
          onCheckedChange={() => onAmenityChange('gym')} 
          className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
        />
      </DropdownMenuItem>
      
      <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
        <div className="flex items-center gap-2">
          <Waves className="h-4 w-4 text-indigo-500" />
          <span>Swimming Pool</span>
        </div>
        <Checkbox 
          checked={amenities.swimmingPool}
          onCheckedChange={() => onAmenityChange('swimmingPool')} 
          className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
        />
      </DropdownMenuItem>
    </>
  );
};

export default AmenityFilters;
