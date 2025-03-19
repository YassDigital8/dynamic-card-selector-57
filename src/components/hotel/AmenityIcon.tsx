
import React from 'react';
import { 
  AirVent, 
  GlassWater,
  Dumbbell,
  HotelIcon,
  Bath,
  Utensils,
  Coffee,
  Wifi,
  Waves,
  PawPrint,
  BedDouble
} from 'lucide-react';
import { HotelAmenities } from '@/models/HotelModel';

interface AmenityIconProps { 
  amenity: keyof HotelAmenities; 
  value: boolean;
  compact?: boolean; // Added compact prop to the interface
}

export const formatAmenityName = (amenity: keyof HotelAmenities): string => {
  return amenity
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

export const AmenityIcon: React.FC<AmenityIconProps> = ({ 
  amenity, 
  value,
  compact = false // Default value for compact
}) => {
  if (!value) return null;
  
  // Adjust icon size based on compact mode
  const iconSize = compact ? 'h-3.5 w-3.5' : 'h-4 w-4';
  
  const iconMap = {
    airConditioning: <AirVent className={`${iconSize} text-blue-500`} />,
    bar: <GlassWater className={`${iconSize} text-purple-500`} />,
    gym: <Dumbbell className={`${iconSize} text-green-500`} />,
    parking: <HotelIcon className={`${iconSize} text-gray-500`} />,
    spa: <Bath className={`${iconSize} text-pink-500`} />,
    restaurant: <Utensils className={`${iconSize} text-amber-500`} />,
    breakfast: <Coffee className={`${iconSize} text-brown-500`} />,
    wifi: <Wifi className={`${iconSize} text-indigo-500`} />,
    swimmingPool: <Waves className={`${iconSize} text-cyan-500`} />,
    petsAllowed: <PawPrint className={`${iconSize} text-orange-500`} />,
    extraBed: <BedDouble className={`${iconSize} text-violet-500`} />
  };

  return (
    <div className="tooltip" data-tip={formatAmenityName(amenity)}>
      {iconMap[amenity]}
    </div>
  );
};

export default AmenityIcon;
