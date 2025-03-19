import React, { useState, useEffect } from 'react';
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

  const getCurrentRoomImages = () => {
    const mainImage = form.getValues(`roomTypes.${currentRoomTypeIndex}.imageUrl`);
    const additionalImages = form.getValues(`roomTypes.${currentRoomTypeIndex}.images`) || [];
    return [mainImage, ...additionalImages].filter(Boolean);
  };

  const handleSelectSingleImage = (files: FileInfo[]) => {
    if (files.length > 0) {
      form.setValue(`roomTypes.${currentRoomTypeIndex}.imageUrl`, files[0].url);
      const existingImages = form.getValues(`roomTypes.${currentRoomTypeIndex}.images`) || [];
      const filteredImages = existingImages.filter(img => img !== files[0].url);
      form.setValue(`roomTypes.${currentRoomTypeIndex}.images`, filteredImages);
      setIsGalleryOpen(false);
    }
  };

  const handleSelectMultipleImages = (files: FileInfo[]) => {
    if (files.length > 0) {
      const imageUrls = files.map(file => file.url);
      
      const mainImageUrl = form.getValues(`roomTypes.${currentRoomTypeIndex}.imageUrl`);
      
      if (!mainImageUrl && imageUrls.length > 0) {
        form.setValue(`roomTypes.${currentRoomTypeIndex}.imageUrl`, imageUrls[0]);
        const additionalImages = imageUrls.slice(1);
        form.setValue(`roomTypes.${currentRoomTypeIndex}.images`, additionalImages);
      } else {
        const additionalImages = imageUrls.filter(url => url !== mainImageUrl);
        form.setValue(`roomTypes.${currentRoomTypeIndex}.images`, additionalImages);
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
        currentSelectedImages={[form.getValues(`roomTypes.${currentRoomTypeIndex}.imageUrl`)].filter(Boolean)}
      />

      <RoomGalleryDialog 
        isOpen={isMultiGalleryOpen}
        onOpenChange={setIsMultiGalleryOpen}
        galleryFiles={galleryFiles}
        onSelectImages={handleSelectMultipleImages}
        multiSelect={true}
        currentSelectedImages={getCurrentRoomImages()}
      />
    </div>
  );
};

export default RoomTypesSection;
