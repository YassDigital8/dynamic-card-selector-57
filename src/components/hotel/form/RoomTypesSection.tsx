
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
import { addNewRoomType } from './room-types/hooks/useRoomTypeForm';
import { toast } from '@/hooks/use-toast';

interface RoomTypesSectionProps {
  form: UseFormReturn<FormValues>;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({ form }) => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [currentRoomTypeIndex, setCurrentRoomTypeIndex] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0); // Add this for forcing re-renders
  const { galleryFiles } = useGalleryFiles();
  const roomTypes = form.watch('roomTypes') || [];

  // Ensure room types are initialized
  useEffect(() => {
    console.log('RoomTypesSection rendered, roomTypes:', roomTypes);
    
    const currentRoomTypes = form.getValues('roomTypes');
    if (!currentRoomTypes || !Array.isArray(currentRoomTypes)) {
      console.log('No room types found in form, initializing empty array');
      form.setValue('roomTypes', [], { 
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false
      });
    }
  }, [form, forceUpdate]); // Added forceUpdate dependency

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
  const handleAddNewRoomType = () => {
    console.log('Adding new room type...');
    const newRoomType = addNewRoomType(form);
    console.log('New room type added:', newRoomType);
    
    // Force a re-render to update the UI
    setForceUpdate(prev => prev + 1);
    
    // Show a toast notification
    toast({
      title: "Room Type Added",
      description: `A new room type has been added.`
    });
    
    // Trigger form validation to update the form state
    form.trigger('roomTypes');
    
    // Set focus to the new room type after a short delay
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
    const updatedRoomTypes = currentRoomTypes.filter((_, i) => i !== index);
    form.setValue('roomTypes', updatedRoomTypes, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    console.log('Removed room type at index', index, 'new roomTypes:', updatedRoomTypes);
    
    // Force a re-render
    setForceUpdate(prev => prev + 1);
  };

  return (
    <div className="space-y-6 col-span-2">
      <RoomTypeHeader onAddRoomType={handleAddNewRoomType} />
      
      {(!roomTypes || roomTypes.length === 0) ? (
        <EmptyRoomTypeState onAddRoomType={handleAddNewRoomType} form={form} />
      ) : (
        <RoomTypeList 
          roomTypes={roomTypes}
          form={form}
          onRemoveRoomType={handleRemoveRoomType}
          onOpenGallery={openImageDialog}
        />
      )}
      
      {roomTypes && roomTypes.length > 0 && (
        <AddRoomTypeButton onAddRoomType={handleAddNewRoomType} />
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
