
import React from 'react';
import { 
  AirVent, 
  Utensils, 
  Coffee, 
  Wifi, 
  PawPrint, 
  BedDouble,
  Dumbbell,
  GlassWater,
  HotelIcon,
  Bath,
  Waves
} from 'lucide-react';
import { HotelAmenities } from '@/models/HotelModel';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AmenityDisplayProps { 
  amenities: HotelAmenities;
}

const AmenityDisplay: React.FC<AmenityDisplayProps> = ({ amenities }) => {
  const amenityItems = [
    { key: 'airConditioning', label: 'Air Conditioning', icon: AirVent, color: 'text-blue-500' },
    { key: 'bar', label: 'Bar', icon: GlassWater, color: 'text-purple-500' },
    { key: 'gym', label: 'Gym', icon: Dumbbell, color: 'text-green-500' },
    { key: 'parking', label: 'Parking', icon: HotelIcon, color: 'text-gray-500' },
    { key: 'spa', label: 'Spa', icon: Bath, color: 'text-pink-500' },
    { key: 'restaurant', label: 'Restaurant', icon: Utensils, color: 'text-amber-500' },
    { key: 'breakfast', label: 'Breakfast', icon: Coffee, color: 'text-yellow-700' },
    { key: 'wifi', label: 'WiFi', icon: Wifi, color: 'text-indigo-500' },
    { key: 'swimmingPool', label: 'Swimming Pool', icon: Waves, color: 'text-cyan-500' },
    { key: 'petsAllowed', label: 'Pets Allowed', icon: PawPrint, color: 'text-orange-500' },
    { key: 'extraBed', label: 'Extra Bed', icon: BedDouble, color: 'text-violet-500' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {amenityItems.map(({ key, label, icon: Icon, color }) => {
        const isAvailable = amenities[key as keyof HotelAmenities];
        return (
          <TooltipProvider key={key}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`flex items-center gap-2 p-3 rounded-md ${
                  isAvailable 
                  ? `bg-white dark:bg-slate-800 shadow-sm border border-blue-100 dark:border-blue-900 ${color}` 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                }`}>
                  <Icon className="h-5 w-5" />
                  <span className={`text-sm truncate ${isAvailable ? 'font-medium' : ''}`}>{label}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isAvailable ? `${label} available` : `${label} not available`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default AmenityDisplay;
