
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { amenitiesList } from './constants';
import { AmenityListItem } from './AmenityListItem';

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
        <AmenityListItem
          key={amenity.name}
          amenity={amenity}
          form={form}
          onAddImage={onAddImage}
          onRemoveImage={onRemoveImage}
        />
      ))}
    </div>
  );
};

export default AmenityList;
