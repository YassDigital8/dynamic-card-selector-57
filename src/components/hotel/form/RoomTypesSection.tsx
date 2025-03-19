
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
  const [isMultiGalleryOpen, setIsMultiGalleryOpen] = useState(false);
  const [currentRoomTypeIndex, setCurrentRoomTypeIndex] = useState(0);
  const { galleryFiles } = useGalleryFiles();

  const handleSelectSingleImage = (files: FileInfo[]) => {
    if (files.length > 0) {
      form.setValue(`roomTypes.${currentRoomTypeIndex}.imageUrl`, files[0].url);
      setIsGalleryOpen(false);
    }
  };

  const handleSelectMultipleImages = (files: FileInfo[]) => {
    if (files.length > 0) {
      const imageUrls = files.map(file => file.url);
      
      // Get existing images (if any)
      const existingImages = form.getValues(`roomTypes.${currentRoomTypeIndex}.images`) || [];
      
      // Set images array without duplicates
      const uniqueUrls = [...new Set([...existingImages, ...imageUrls])];
      form.setValue(`roomTypes.${currentRoomTypeIndex}.images`, uniqueUrls);
      
      // If this is the first image and no main image is set, set the first as main
      if (!form.getValues(`roomTypes.${currentRoomTypeIndex}.imageUrl`)) {
        form.setValue(`roomTypes.${currentRoomTypeIndex}.imageUrl`, imageUrls[0]);
      }
      
      setIsMultiGalleryOpen(false);
    }
  };

  const openGallery = (index: number) => {
    setCurrentRoomTypeIndex(index);
    setIsGalleryOpen(true);
  };

  const openMultiGallery = (index: number) => {
    setCurrentRoomTypeIndex(index);
    setIsMultiGalleryOpen(true);
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
          onOpenMultiGallery={() => openMultiGallery(index)}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          const currentRoomTypes = form.getValues('roomTypes');
          form.setValue('roomTypes', [
            ...currentRoomTypes,
            { name: '', maxAdults: 1, maxChildren: 0, images: [] }
          ]);
        }}
      >
        Add Room Type
      </Button>

      <RoomGalleryDialog 
        isOpen={isGalleryOpen}
        onOpenChange={setIsGalleryOpen}
        galleryFiles={galleryFiles}
        onSelectImages={handleSelectSingleImage}
        multiSelect={false}
      />

      <RoomGalleryDialog 
        isOpen={isMultiGalleryOpen}
        onOpenChange={setIsMultiGalleryOpen}
        galleryFiles={galleryFiles}
        onSelectImages={handleSelectMultipleImages}
        multiSelect={true}
      />
    </div>
  );
};

export default RoomTypesSection;
