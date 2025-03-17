
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
}

export const formatAmenityName = (amenity: keyof HotelAmenities): string => {
  return amenity
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

export const AmenityIcon: React.FC<AmenityIconProps> = ({ 
  amenity, 
  value 
}) => {
  if (!value) return null;
  
  const iconMap = {
    airConditioning: <AirVent className="h-4 w-4 text-blue-500" />,
    bar: <GlassWater className="h-4 w-4 text-purple-500" />,
    gym: <Dumbbell className="h-4 w-4 text-green-500" />,
    parking: <HotelIcon className="h-4 w-4 text-gray-500" />,
    spa: <Bath className="h-4 w-4 text-pink-500" />,
    restaurant: <Utensils className="h-4 w-4 text-amber-500" />,
    breakfast: <Coffee className="h-4 w-4 text-brown-500" />,
    wifi: <Wifi className="h-4 w-4 text-indigo-500" />,
    swimmingPool: <Waves className="h-4 w-4 text-cyan-500" />,
    petsAllowed: <PawPrint className="h-4 w-4 text-orange-500" />,
    extraBed: <BedDouble className="h-4 w-4 text-violet-500" />
  };

  return (
    <div className="tooltip" data-tip={formatAmenityName(amenity)}>
      {iconMap[amenity]}
    </div>
  );
};

export default AmenityIcon;
