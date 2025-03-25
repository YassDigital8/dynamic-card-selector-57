
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '@/components/ui/form';
import { amenitiesList, amenitiesWithImages } from './constants';
import { FormValues } from '../formSchema';
import { AmenityImage } from '@/models/HotelModel';
import AmenityItem from './AmenityItem';

interface AmenityListProps {
  form: UseFormReturn<FormValues>;
  onAddImage?: (name: string) => void;
  onRemoveImage?: (amenityKey: string, index: number) => void;
}

const AmenityList: React.FC<AmenityListProps> = ({ 
  form, 
  onAddImage,
  onRemoveImage
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {amenitiesList.map((amenity) => {
        // Get the key from the name (e.g., "amenities.bar" -> "bar")
        const amenityKey = amenity.name.split('.')[1];
        const amenityName = `amenities.${amenityKey}`;
        const imagesFieldName = `amenities.${amenityKey}Images`;
        const supportsImages = Object.keys(amenitiesWithImages).includes(amenityKey);
        
        return (
          <FormField
            key={amenityKey}
            control={form.control}
            name={amenityName as any}
            render={({ field }) => {
              // Safely handle images field
              const images = form.watch(imagesFieldName as any) || [];
              
              return (
                <AmenityItem
                  name={amenityKey}
                  label={amenity.label}
                  icon={amenity.icon}
                  hasImages={supportsImages}
                  imageField={supportsImages ? `${amenityKey}Images` : undefined}
                  form={form}
                  onAddImage={supportsImages ? () => onAddImage?.(amenityName) : undefined}
                  onRemoveImage={supportsImages ? onRemoveImage : undefined}
                />
              );
            }}
          />
        );
      })}
    </div>
  );
};

export default AmenityList;
