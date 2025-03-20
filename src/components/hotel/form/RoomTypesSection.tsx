
import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormValues } from './formSchema';
import { FileInfo } from '@/models/FileModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { 
  RoomTypeCard, 
  RoomTypeImageUploadDialog,
  useGalleryFiles
} from './room-types';

interface RoomTypesSectionProps {
  form: UseFormReturn<FormValues>;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({ form }) => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isMultiImageDialogOpen, setIsMultiImageDialogOpen] = useState(false);
  const [currentRoomTypeIndex, setCurrentRoomTypeIndex] = useState(0);
  const { galleryFiles } = useGalleryFiles();

  const getCurrentRoomName = () => {
    const name = form.getValues(`roomTypes.${currentRoomTypeIndex}.name`);
    return name || `Room Type ${currentRoomTypeIndex + 1}`;
  };

  const handleSelectSingleImage = (imageUrl: string, metadata?: FileMetadataValues) => {
    if (imageUrl) {
      form.setValue(`roomTypes.${currentRoomTypeIndex}.imageUrl`, imageUrl);
      
      // Make sure this image isn't duplicated in the additional images array
      const existingImages = form.getValues(`roomTypes.${currentRoomTypeIndex}.images`) || [];
      const filteredImages = existingImages.filter(img => img !== imageUrl);
      form.setValue(`roomTypes.${currentRoomTypeIndex}.images`, filteredImages);
      
      setIsImageDialogOpen(false);
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
      
      setIsMultiImageDialogOpen(false);
    }
  };

  const openImageDialog = (index: number) => {
    setCurrentRoomTypeIndex(index);
    setIsImageDialogOpen(true);
  };

  const openMultiImageDialog = (index: number) => {
    setCurrentRoomTypeIndex(index);
    setIsMultiImageDialogOpen(true);
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
          onOpenGallery={() => openImageDialog(index)}
          onOpenMultiGallery={() => openMultiImageDialog(index)}
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

      {/* Single Image Upload Dialog */}
      <RoomTypeImageUploadDialog 
        isOpen={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
        onAddImage={handleSelectSingleImage}
        roomTypeName={getCurrentRoomName()}
        multiSelect={false}
      />

      {/* Multiple Images Upload Dialog */}
      <RoomTypeImageUploadDialog 
        isOpen={isMultiImageDialogOpen}
        onClose={() => setIsMultiImageDialogOpen(false)}
        onAddImage={() => {}} // Not used in multi-select mode
        roomTypeName={getCurrentRoomName()}
        multiSelect={true}
        onSelectMultiple={handleSelectMultipleImages}
      />
    </div>
  );
};

export default RoomTypesSection;
