
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import AmenityItem from './AmenityItem';
import { AmenityListItemType } from './types';

interface AmenityListItemProps {
  amenity: AmenityListItemType;
  form: UseFormReturn<FormValues>;
  onAddImage: (amenityName: string) => void;
  onRemoveImage: (amenityKey: string, index: number) => void;
}

export const AmenityListItem: React.FC<AmenityListItemProps> = ({
  amenity,
  form,
  onAddImage,
  onRemoveImage
}) => {
  return (
    <AmenityItem
      name={amenity.name}
      label={amenity.label}
      icon={amenity.icon}
      hasImages={amenity.hasImages}
      imageField={amenity.imageField}
      form={form}
      onAddImage={onAddImage}
      onRemoveImage={onRemoveImage}
    />
  );
};
