
import { AirVent, Utensils, Coffee, Wifi, PawPrint, HotelIcon, Bath, BedDouble, Waves, Dumbbell, GlassWater } from 'lucide-react';

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
  { name: "amenities.bar", label: "Bar", icon: GlassWater, hasImages: true, imageField: "amenities.barImages" },
  { name: "amenities.gym", label: "Gym", icon: Dumbbell, hasImages: true, imageField: "amenities.gymImages" },
  { name: "amenities.parking", label: "Parking", icon: HotelIcon },
  { name: "amenities.spa", label: "Spa", icon: Bath, hasImages: true, imageField: "amenities.spaImages" },
  { name: "amenities.restaurant", label: "Restaurant", icon: Utensils, hasImages: true, imageField: "amenities.restaurantImages" },
  { name: "amenities.breakfast", label: "Breakfast", icon: Coffee, hasImages: true, imageField: "amenities.breakfastImages" },
  { name: "amenities.wifi", label: "WiFi", icon: Wifi },
  { name: "amenities.swimmingPool", label: "Swimming Pool", icon: Waves, hasImages: true, imageField: "amenities.swimmingPoolImages" },
  { name: "amenities.petsAllowed", label: "Pets Allowed", icon: PawPrint },
  { name: "amenities.extraBed", label: "Extra Bed", icon: BedDouble }
];
