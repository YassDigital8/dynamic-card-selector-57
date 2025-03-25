
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AmenityListItem } from './AmenityListItem';
import { FormField } from '@/components/ui/form';
import { amenitiesList, amenitiesWithImages } from './constants';
import { FormValues } from '../formSchema';

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
        const amenityName = `amenities.${amenity.key}`;
        const imagesFieldName = `amenities.${amenity.key}Images`;
        const supportsImages = amenity.key in amenitiesWithImages;
        
        return (
          <FormField
            key={amenity.key}
            control={form.control}
            name={amenityName}
            render={({ field }) => (
              <AmenityListItem
                name={amenityName}
                label={amenity.label}
                isImageSupported={supportsImages}
                images={form.watch(imagesFieldName) || []}
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
            )}
          />
        );
      })}
    </div>
  );
};

export default AmenityList;
