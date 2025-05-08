
import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './schemas/formSchema';
import { FileInfo } from '@/models/FileModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { 
  RoomTypeImageUploadDialog,
  useGalleryFiles
} from './room-types';
import { 
  EmptyRoomTypeState, 
  RoomTypeHeader, 
  RoomTypeList,
  AddRoomTypeButton
} from './room-types/components';

interface RoomTypesSectionProps {
  form: UseFormReturn<FormValues>;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({ form }) => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [currentRoomTypeIndex, setCurrentRoomTypeIndex] = useState(0);
  const { galleryFiles } = useGalleryFiles();
  const roomTypes = form.watch('roomTypes') || [];

  useEffect(() => {
    // Debug to make sure roomTypes are properly initialized
    console.log('RoomTypesSection rendered, roomTypes:', roomTypes);
  }, [roomTypes]);

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

  // Initialize new room type with default values
  const addNewRoomType = () => {
    console.log('Adding new room type...');
    const currentRoomTypes = form.getValues('roomTypes') || [];
    const newIndex = currentRoomTypes.length;
    
    // Create new room type with required fields
    const newRoomType = { 
      id: `temp-${Date.now()}`, // Temporary ID that will be replaced on save
      name: `Room Type ${newIndex + 1}`,
      maxAdults: 2, 
      maxChildren: 0,
      description: '',
      price: 0,
      images: [],
      allowExtraBed: false,
      maxExtraBeds: 1,
      extraBedPrice: 0,
      seasonalPrices: []
    };
    
    console.log('New room type:', newRoomType);
    console.log('Current room types:', currentRoomTypes);
    
    // Use setValue with isDirty flag to mark the field as changed
    form.setValue('roomTypes', [...currentRoomTypes, newRoomType], { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    
    // Set focus to the new room type
    setTimeout(() => {
      const roomCards = document.querySelectorAll('.room-type-card');
      if (roomCards.length > 0) {
        const lastCard = roomCards[roomCards.length - 1];
        lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Try to focus the first input in the new card
        const firstInput = lastCard.querySelector('input');
        if (firstInput) {
          firstInput.focus();
        }
      }
    }, 100);
  };

  const handleRemoveRoomType = (index: number) => {
    const currentRoomTypes = form.getValues('roomTypes') || [];
    form.setValue('roomTypes', currentRoomTypes.filter((_, i) => i !== index), {
      shouldValidate: true
    });
  };

  return (
    <div className="space-y-6 col-span-2">
      <RoomTypeHeader onAddRoomType={addNewRoomType} />
      
      {roomTypes.length === 0 ? (
        <EmptyRoomTypeState onAddRoomType={addNewRoomType} />
      ) : (
        <RoomTypeList 
          roomTypes={roomTypes}
          form={form}
          onRemoveRoomType={handleRemoveRoomType}
          onOpenGallery={openImageDialog}
        />
      )}
      
      {roomTypes.length > 0 && (
        <AddRoomTypeButton onAddRoomType={addNewRoomType} />
      )}

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
