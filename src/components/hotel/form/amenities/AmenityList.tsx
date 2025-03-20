
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { AmenityItem } from './';
import { amenitiesList } from './constants';

interface AmenityListProps {
  form: UseFormReturn<FormValues>;
  onAddImage: (amenityName: string) => void;
  onRemoveImage: (amenityKey: string, index: number) => void;
}

const AmenityList: React.FC<AmenityListProps> = ({
  form,
  onAddImage,
  onRemoveImage
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {amenitiesList.map((amenity) => (
        <AmenityItem
          key={amenity.name}
          name={amenity.name}
          label={amenity.label}
          icon={amenity.icon}
          hasImages={amenity.hasImages}
          imageField={amenity.imageField}
          form={form}
          onAddImage={onAddImage}
          onRemoveImage={onRemoveImage}
        />
      ))}
    </div>
  );
};

export default AmenityList;
