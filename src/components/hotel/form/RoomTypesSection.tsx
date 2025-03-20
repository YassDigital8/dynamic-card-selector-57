
import React, { useState } from 'react';
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
  const [currentRoomTypeIndex, setCurrentRoomTypeIndex] = useState(0);
  const { galleryFiles } = useGalleryFiles();

  const getCurrentRoomName = () => {
    const name = form.getValues(`roomTypes.${currentRoomTypeIndex}.name`);
    return name || `Room Type ${currentRoomTypeIndex + 1}`;
  };

  const handleSelectImages = (files: FileInfo[]) => {
    if (files.length > 0) {
      const imageUrls = files.map(file => file.url);
      
      const mainImageUrl = form.getValues(`roomTypes.${currentRoomTypeIndex}.imageUrl`);
      
      if (!mainImageUrl && imageUrls.length > 0) {
        form.setValue(`roomTypes.${currentRoomTypeIndex}.imageUrl`, imageUrls[0]);
        const additionalImages = imageUrls.slice(1);
        form.setValue(`roomTypes.${currentRoomTypeIndex}.images`, additionalImages);
      } else {
        const currentImages = form.getValues(`roomTypes.${currentRoomTypeIndex}.images`) || [];
        
        const newImages = imageUrls.filter(url => !currentImages.includes(url) && url !== mainImageUrl);
        
        form.setValue(`roomTypes.${currentRoomTypeIndex}.images`, [...currentImages, ...newImages]);
      }
      
      setIsImageDialogOpen(false);
    }
  };

  const handleSelectSingleImage = (imageUrl: string, metadata?: FileMetadataValues) => {
    if (imageUrl) {
      const mainImageUrl = form.getValues(`roomTypes.${currentRoomTypeIndex}.imageUrl`);
      
      if (!mainImageUrl) {
        form.setValue(`roomTypes.${currentRoomTypeIndex}.imageUrl`, imageUrl);
      } else {
        const currentImages = form.getValues(`roomTypes.${currentRoomTypeIndex}.images`) || [];
        
        if (!currentImages.includes(imageUrl) && imageUrl !== mainImageUrl) {
          form.setValue(`roomTypes.${currentRoomTypeIndex}.images`, [...currentImages, imageUrl]);
        }
      }
      
      setIsImageDialogOpen(false);
    }
  };

  const openImageDialog = (index: number) => {
    setCurrentRoomTypeIndex(index);
    setIsImageDialogOpen(true);
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

      {/* Universal Image Upload Dialog for Room Types */}
      <RoomTypeImageUploadDialog 
        isOpen={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
        onAddImage={handleSelectSingleImage}
        roomTypeName={getCurrentRoomName()}
        multiSelect={true}
        onSelectMultiple={handleSelectImages}
      />
    </div>
  );
};

export default RoomTypesSection;
