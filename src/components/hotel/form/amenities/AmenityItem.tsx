
import React, { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { FormValues } from '../formSchema';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { DollarSign } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import AmenityImagesSection from './AmenityImagesSection';
import ExtraBedPrice from './ExtraBedPrice';

interface AmenityItemProps {
  name: string;
  label: string;
  icon: LucideIcon;
  hasImages?: boolean;
  imageField?: string;
  form: UseFormReturn<FormValues>;
  onAddImage?: (amenityName: string) => void;
  onRemoveImage?: (amenityKey: string, index: number) => void;
}

const AmenityItem: React.FC<AmenityItemProps> = ({
  name,
  label,
  icon: Icon,
  hasImages = false,
  imageField,
  form,
  onAddImage,
  onRemoveImage
}) => {
  // Watch the amenity value to determine if it's enabled
  const amenityEnabled = useWatch({
    control: form.control,
    name: `amenities.${name}` as any
  });
  
  // For the Extra Bed amenity, also watch the price
  const extraBedPrice = useWatch({
    control: form.control,
    name: 'extraBedPolicy.pricePerNight',
    defaultValue: 0
  });

  // Get the images array if this amenity has images
  const images = hasImages && imageField
    ? useWatch({ 
        control: form.control, 
        name: `amenities.${imageField}` as any
      }) 
    : [];

  // Check if the current amenity is extra bed
  const isExtraBed = name === 'extraBed';

  // Trigger validation when amenity is toggled
  const handleToggleChange = (checked: boolean) => {
    console.log(`Setting amenity ${name} to:`, checked);
    
    // Update the form value
    form.setValue(`amenities.${name}` as any, checked, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
    // For extraBed, also set up the policy
    if (isExtraBed && checked && !form.getValues('extraBedPolicy')) {
      form.setValue('extraBedPolicy', {
        pricePerNight: 0,
        availableForRoomTypes: [],
        maxExtraBedsPerRoom: 1,
        notes: ''
      }, { shouldValidate: true });
    }
    
    // Force validation immediately after state changes
    setTimeout(() => {
      // Explicitly trigger validation for amenities step
      form.trigger();
      
      // For debugging, log the amenities values after the state change
      const amenities = form.getValues('amenities');
      console.log("Form amenities after toggle:", amenities);
      
      // Log a count of enabled amenities for validation debugging
      const enabledCount = Object.entries(amenities)
        .filter(([key, value]) => typeof value === 'boolean' && value === true)
        .length;
      console.log(`Enabled amenities count: ${enabledCount}`);
    }, 10);
  };

  useEffect(() => {
    // If this is the extraBed amenity and it has just been enabled,
    // ensure we have a default extraBedPolicy
    if (isExtraBed && amenityEnabled && !form.getValues('extraBedPolicy')) {
      form.setValue('extraBedPolicy', {
        pricePerNight: 0,
        availableForRoomTypes: [],
        maxExtraBedsPerRoom: 1,
        notes: ''
      }, { shouldValidate: true });
    }
  }, [isExtraBed, amenityEnabled, form]);

  return (
    <div className={cn(
      "space-y-3 rounded-lg border p-4",
      isExtraBed 
        ? "border-blue-200 bg-blue-50/70 dark:border-blue-900 dark:bg-blue-950/20" 
        : amenityEnabled 
          ? "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/10" 
          : "border-gray-200 dark:border-gray-800"
    )}>
      {/* Main amenity toggle switch */}
      <div className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center space-x-2">
          <Icon className={cn(
            "h-5 w-5",
            amenityEnabled ? "text-blue-500" : "text-gray-400"
          )} />
          <FormLabel className="font-medium cursor-pointer">{label}</FormLabel>
          
          {/* Display extra bed price if this is the extra bed amenity and it's enabled */}
          {isExtraBed && amenityEnabled && (
            <ExtraBedPrice price={extraBedPrice} />
          )}
        </div>
        
        <FormField
          control={form.control}
          name={`amenities.${name}` as any}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-y-0 m-0">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={handleToggleChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* Images section (only shows if this amenity has images and is enabled) */}
      <AmenityImagesSection 
        hasImages={hasImages}
        amenityValue={Boolean(amenityEnabled)}
        imageField={imageField}
        images={Array.isArray(images) ? images : []}
        name={name}
        onAddImage={onAddImage}
        onRemoveImage={onRemoveImage}
      />
    </div>
  );
};

export default AmenityItem;
