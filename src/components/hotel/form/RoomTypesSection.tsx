
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormValues } from './formSchema';
import { FileInfo } from '@/models/FileModel';
import { 
  RoomTypeCard, 
  RoomGalleryDialog,
  useGalleryFiles
} from './room-types';

interface RoomTypesSectionProps {
  form: UseFormReturn<FormValues>;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({ form }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentRoomTypeIndex, setCurrentRoomTypeIndex] = useState(0);
  const { galleryFiles } = useGalleryFiles();

  const handleSelectImage = (file: FileInfo) => {
    form.setValue(`roomTypes.${currentRoomTypeIndex}.imageUrl`, file.url);
    setIsGalleryOpen(false);
  };

  const openGallery = (index: number) => {
    setCurrentRoomTypeIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <div className="space-y-6 col-span-2">
      <h3 className="text-lg font-medium text-foreground">Room Types</h3>
      {form.watch('roomTypes').map((roomType, index) => (
        <RoomTypeCard 
          key={index}
          index={index}
          form={form}
          onRemove={() => {
            const currentRoomTypes = form.getValues('roomTypes');
            form.setValue('roomTypes', currentRoomTypes.filter((_, i) => i !== index));
          }}
          onOpenGallery={() => openGallery(index)}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          const currentRoomTypes = form.getValues('roomTypes');
          form.setValue('roomTypes', [
            ...currentRoomTypes,
            { name: '', maxAdults: 1, maxChildren: 0 }
          ]);
        }}
      >
        Add Room Type
      </Button>

      <RoomGalleryDialog 
        isOpen={isGalleryOpen}
        onOpenChange={setIsGalleryOpen}
        galleryFiles={galleryFiles}
        onSelectImage={handleSelectImage}
      />
    </div>
  );
};

export default RoomTypesSection;
