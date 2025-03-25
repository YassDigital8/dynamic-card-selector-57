
import React from 'react';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { amenitiesWithImages } from './constants';
import AmenityImagesCarousel from './AmenityImagesCarousel';
import { AmenityImage } from '@/models/HotelModel';

interface AmenityListItemProps {
  name: string;
  label: string;
  isImageSupported?: boolean;
  images?: AmenityImage[];
  onAddImage?: (name: string) => void;
  onRemoveImage?: (amenityKey: string, index: number) => void;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const AmenityListItem: React.FC<AmenityListItemProps> = ({
  name,
  label,
  isImageSupported = false,
  images = [],
  onAddImage,
  onRemoveImage,
  checked,
  onChange
}) => {
  const amenityKey = name.split('.')[1]; // Extract "bar" from "amenities.bar"
  const hasImages = images && images.length > 0;

  const handleCheckboxChange = (checked: boolean) => {
    onChange(checked);
  };

  const handleAddImage = () => {
    if (onAddImage) {
      onAddImage(name);
    }
  };

  return (
    <FormItem className="flex flex-col space-y-0">
      <div className="flex items-start space-x-2">
        <FormControl>
          <Checkbox 
            checked={checked} 
            onCheckedChange={handleCheckboxChange} 
            className="mt-1"
          />
        </FormControl>
        <div className="flex-1 space-y-1">
          <FormLabel className="text-base font-medium cursor-pointer" onClick={() => handleCheckboxChange(!checked)}>
            {label}
          </FormLabel>
          
          {checked && isImageSupported && !hasImages && (
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddImage}
              className="mt-1 border-dashed"
            >
              <Camera className="h-3.5 w-3.5 mr-1.5" /> Add Images
            </Button>
          )}
          
          {checked && isImageSupported && (
            <AmenityImagesCarousel
              images={images}
              amenityKey={amenityKey}
              onAddImage={handleAddImage}
              onRemoveImage={onRemoveImage}
            />
          )}
        </div>
      </div>
    </FormItem>
  );
};
