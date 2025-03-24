
import React from 'react';
import { Wifi } from 'lucide-react';
import FilterButton from '../FilterButton';
import FilterGroup from '../FilterGroup';
import CheckboxFilter from '../CheckboxFilter';
import { amenitiesList } from '@/components/hotel/form/amenities/constants';
import { HotelAmenities } from '@/models/HotelModel';

type AmenitiesFilterProps = {
  amenities: { [K in keyof HotelAmenities]: boolean };
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
        <div className="max-h-60 overflow-y-auto pr-2">
          {amenitiesList.map((amenity) => {
            const amenityKey = amenity.name.split('.')[1] as keyof typeof amenities;
            
            return (
              <CheckboxFilter
                key={amenity.name}
                id={`amenity-${amenityKey}`}
                label={
                  <div className="flex items-center gap-1.5">
                    <amenity.icon className="h-3.5 w-3.5 text-indigo-500" />
                    <span>{amenity.label}</span>
                  </div>
                }
                checked={amenities[amenityKey] || false}
                onCheckedChange={(checked) => onAmenityChange(amenityKey, checked)}
              />
            );
          })}
        </div>
      </FilterGroup>
    </FilterButton>
  );
};

export default AmenitiesFilter;
