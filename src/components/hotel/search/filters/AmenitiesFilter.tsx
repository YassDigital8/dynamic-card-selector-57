
import React from 'react';
import { Wifi } from 'lucide-react';
import FilterButton from '../FilterButton';
import FilterGroup from '../FilterGroup';
import CheckboxFilter from '../CheckboxFilter';

interface AmenitiesProps {
  wifi: boolean;
  restaurant: boolean;
  gym: boolean;
  swimmingPool: boolean;
}

interface AmenitiesFilterProps {
  amenities: AmenitiesProps;
  onAmenityChange: (amenity: string, value: boolean) => void;
  disabled?: boolean;
}

const AmenitiesFilter: React.FC<AmenitiesFilterProps> = ({
  amenities,
  onAmenityChange,
  disabled = false
}) => {
  const activeAmenityCount = Object.values(amenities).filter(Boolean).length;
  
  return (
    <FilterButton 
      icon={<Wifi className="h-3.5 w-3.5 text-indigo-500" />}
      label="Amenities"
      activeValue={activeAmenityCount > 0 ? 'active' : null}
      badgeContent={activeAmenityCount > 0 ? activeAmenityCount : undefined}
      disabled={disabled}
    >
      <FilterGroup title="Amenities">
        <CheckboxFilter
          id="amenity-wifi"
          label="WiFi"
          checked={amenities.wifi}
          onCheckedChange={(checked) => onAmenityChange('wifi', checked)}
        />
        <CheckboxFilter
          id="amenity-restaurant"
          label="Restaurant"
          checked={amenities.restaurant}
          onCheckedChange={(checked) => onAmenityChange('restaurant', checked)}
        />
        <CheckboxFilter
          id="amenity-gym"
          label="Gym"
          checked={amenities.gym}
          onCheckedChange={(checked) => onAmenityChange('gym', checked)}
        />
        <CheckboxFilter
          id="amenity-pool"
          label="Swimming Pool"
          checked={amenities.swimmingPool}
          onCheckedChange={(checked) => onAmenityChange('swimmingPool', checked)}
        />
      </FilterGroup>
    </FilterButton>
  );
};

export default AmenitiesFilter;
