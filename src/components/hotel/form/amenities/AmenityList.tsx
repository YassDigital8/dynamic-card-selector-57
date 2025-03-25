
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AmenityListItem } from './AmenityListItem';
import { FormField } from '@/components/ui/form';
import { amenitiesList, amenitiesWithImages } from './constants';
import { FormValues } from '../formSchema';
import { AmenityImage } from '@/models/HotelModel';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {amenitiesList.map((amenity) => {
        // Get the key from the name (e.g., "amenities.bar" -> "bar")
        const amenityKey = amenity.name.split('.')[1];
        const amenityName = `amenities.${amenityKey}`;
        const imagesFieldName = `amenities.${amenityKey}Images`;
        const supportsImages = amenityKey in amenitiesWithImages;
        
        return (
          <FormField
            key={amenityKey}
            control={form.control}
            name={amenityName as any}
            render={({ field }) => {
              // Safely handle images field
              const images = form.watch(imagesFieldName as any) || [];
              
              return (
                <AmenityListItem
                  name={amenityName}
                  label={amenity.label}
                  isImageSupported={supportsImages}
                  images={images as AmenityImage[]}
                  onAddImage={supportsImages ? onAddImage : undefined}
                  onRemoveImage={supportsImages ? onRemoveImage : undefined}
                  checked={field.value || false}
                  onChange={(checked) => {
                    field.onChange(checked);
                    // Trigger validation when an amenity is checked
                    setTimeout(() => {
                      form.trigger('amenities');
                      form.trigger();
                    }, 10);
                  }}
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
