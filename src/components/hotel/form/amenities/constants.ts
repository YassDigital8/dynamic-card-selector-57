
import { AirVent, Utensils, Coffee, Wifi, PawPrint, HotelIcon, Bath, BedDouble, Waves, Dumbbell, GlassWater, Bus } from 'lucide-react';

// Amenities that can have images
export const amenitiesWithImages = {
  bar: 'Bar',
  gym: 'Gym',
  spa: 'Spa',
  restaurant: 'Restaurant',
  breakfast: 'Breakfast',
  swimmingPool: 'Swimming Pool'
};

// Array of amenities for easier mapping
export const amenitiesList = [
  { name: "amenities.airConditioning", label: "Air Conditioning", icon: AirVent },
  { name: "amenities.bar", label: "Bar", icon: GlassWater },
  { name: "amenities.gym", label: "Gym", icon: Dumbbell },
  { name: "amenities.parking", label: "Parking", icon: HotelIcon },
  { name: "amenities.spa", label: "Spa", icon: Bath },
  { name: "amenities.restaurant", label: "Restaurant", icon: Utensils },
  { name: "amenities.breakfast", label: "Breakfast", icon: Coffee },
  { name: "amenities.wifi", label: "WiFi", icon: Wifi },
  { name: "amenities.swimmingPool", label: "Swimming Pool", icon: Waves },
  { name: "amenities.petsAllowed", label: "Pets Allowed", icon: PawPrint },
  { name: "amenities.shuttleBus", label: "Shuttle Bus Service", icon: Bus },
  { name: "amenities.extraBed", label: "Extra Bed", icon: BedDouble }
];
