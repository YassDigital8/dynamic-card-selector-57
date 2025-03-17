
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  AirVent, 
  Utensils, 
  Coffee, 
  Wifi, 
  PawPrint,
  HotelIcon,
  Bath,
  BedDouble,
  Waves,
  Dumbbell,
  GlassWater
} from 'lucide-react';
import { FormValues } from './formSchema';

interface AmenitiesSectionProps {
  form: UseFormReturn<FormValues>;
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ form }) => {
  // Array of amenities for easier mapping
  const amenities = [
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
    { name: "amenities.extraBed", label: "Extra Bed", icon: BedDouble }
  ];

  return (
    <div className="space-y-6 col-span-2">
      <h3 className="text-lg font-medium text-foreground">Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <FormField
            key={amenity.name}
            control={form.control}
            name={amenity.name as any}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="flex items-center space-x-2">
                  <amenity.icon className="h-4 w-4 text-muted-foreground" />
                  <FormLabel className="m-0">{amenity.label}</FormLabel>
                </div>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default AmenitiesSection;
