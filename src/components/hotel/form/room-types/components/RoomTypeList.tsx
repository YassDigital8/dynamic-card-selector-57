
import React from 'react';
import { RoomTypeCard } from '..';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../formSchema';

interface RoomTypeListProps {
  roomTypes: any[];
  form: UseFormReturn<FormValues>;
  onRemoveRoomType: (index: number) => void;
  onOpenGallery: (index: number) => void;
}

const RoomTypeList: React.FC<RoomTypeListProps> = ({ 
  roomTypes, 
  form, 
  onRemoveRoomType, 
  onOpenGallery 
}) => {
  return (
    <div className="space-y-6">
      {roomTypes.map((roomType, index) => (
        <RoomTypeCard 
          key={index}
          index={index}
          form={form}
          onRemove={() => onRemoveRoomType(index)}
          onOpenGallery={() => onOpenGallery(index)}
          className="room-type-card"
        />
      ))}
    </div>
  );
};

export default RoomTypeList;
