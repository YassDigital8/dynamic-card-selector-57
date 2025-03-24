
import React, { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { FormValues } from '../formSchema';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { DollarSign } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import AmenityImages from './AmenityImages';

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
  const amenityValue = useWatch({
    control: form.control,
    name: `amenities.${name}`
  });
  
  const extraBedPrice = useWatch({
    control: form.control,
    name: 'extraBedPolicy.pricePerNight',
    defaultValue: 0
  });

  // Get the images array if this amenity has images
  const images = hasImages && imageField
    ? useWatch({ 
        control: form.control, 
        name: `amenities.${imageField}` 
      }) || []
    : [];

  // Check if the current amenity is extra bed
  const isExtraBed = name === 'extraBed';

  useEffect(() => {
    // If this is the extraBed amenity and it has just been enabled,
    // ensure we have a default extraBedPolicy
    if (isExtraBed && amenityValue && !form.getValues('extraBedPolicy')) {
      form.setValue('extraBedPolicy', {
        pricePerNight: 0,
        availableForRoomTypes: [],
        maxExtraBedsPerRoom: 1,
        notes: ''
      }, { shouldValidate: true });
    }
  }, [isExtraBed, amenityValue, form]);

  return (
    <div className={cn(
      "space-y-3 rounded-lg border p-4",
      amenityValue 
        ? "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/10" 
        : "border-gray-200 dark:border-gray-800"
    )}>
      <FormField
        control={form.control}
        name={`amenities.${name}`}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center space-x-2">
              <Icon className={cn(
                "h-5 w-5",
                field.value ? "text-blue-500" : "text-gray-400"
              )} />
              <FormLabel className="font-medium cursor-pointer">{label}</FormLabel>
              
              {/* Display extra bed price if this is the extra bed amenity and it's enabled */}
              {isExtraBed && field.value && (
                <div className="text-sm text-blue-600 dark:text-blue-400 flex items-center ml-2">
                  <DollarSign className="h-3.5 w-3.5 mr-0.5" />
                  {extraBedPrice}
                </div>
              )}
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Show image management if this amenity has images and is enabled */}
      {hasImages && amenityValue && (
        <div className="border-t border-gray-200 dark:border-gray-800 pt-3 mt-3">
          <div className="flex items-center justify-between mb-2">
            <FormDescription className="text-xs mt-0">
              Add images for this amenity
            </FormDescription>
            {onAddImage && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={() => onAddImage(name)}
              >
                <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
                Add
              </Button>
            )}
          </div>
          
          {/* Display uploaded images */}
          {imageField && images.length > 0 ? (
            <AmenityImages 
              images={images} 
              amenityKey={imageField} 
              onRemove={onRemoveImage} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4 text-gray-500 dark:text-gray-400">
              <Image className="h-8 w-8 mb-2 text-gray-300 dark:text-gray-600" />
              <p className="text-xs text-center">No images added yet</p>
              {onAddImage && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs mt-2"
                  onClick={() => onAddImage(name)}
                >
                  <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
                  Add Image
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AmenityItem;
