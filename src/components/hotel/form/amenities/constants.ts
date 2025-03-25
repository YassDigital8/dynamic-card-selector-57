
import { 
  Wifi, 
  Utensils, 
  Dumbbell, 
  Bath, 
  AirVent, 
  GlassWater, 
  Coffee, 
  Waves, 
  PawPrint, 
  BedDouble, 
  Bus, 
  ParkingCircle
} from 'lucide-react';
import { AmenityListItemType } from './types';
import { AmenityWithImages } from './types';

// List of amenities that support image uploads
export const amenitiesWithImages: Record<string, boolean> = {
  bar: true,
  gym: true,
  spa: true,
  restaurant: true,
  breakfast: true,
  swimmingPool: true
};

// Complete list of amenities with labels and icons
export const amenitiesList: AmenityListItemType[] = [
  {
    name: 'amenities.wifi',
    label: 'WiFi',
    icon: Wifi,
    hasImages: false
  },
  {
    name: 'amenities.airConditioning',
    label: 'Air Conditioning',
    icon: AirVent,
    hasImages: false
  },
  {
    name: 'amenities.bar',
    label: 'Bar',
    icon: GlassWater,
    hasImages: true
  },
  {
    name: 'amenities.breakfast',
    label: 'Breakfast',
    icon: Coffee,
    hasImages: true
  },
  {
    name: 'amenities.gym',
    label: 'Gym',
    icon: Dumbbell,
    hasImages: true
  },
  {
    name: 'amenities.parking',
    label: 'Parking',
    icon: ParkingCircle,
    hasImages: false
  },
  {
    name: 'amenities.restaurant',
    label: 'Restaurant',
    icon: Utensils,
    hasImages: true
  },
  {
    name: 'amenities.spa',
    label: 'Spa',
    icon: Bath,
    hasImages: true
  },
  {
    name: 'amenities.swimmingPool',
    label: 'Swimming Pool',
    icon: Waves,
    hasImages: true
  },
  {
    name: 'amenities.petsAllowed',
    label: 'Pets Allowed',
    icon: PawPrint,
    hasImages: false
  },
  {
    name: 'amenities.shuttleBus',
    label: 'Shuttle Bus',
    icon: Bus,
    hasImages: false
  },
  {
    name: 'amenities.extraBed',
    label: 'Extra Bed',
    icon: BedDouble,
    hasImages: false
  }
];
