
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormValues } from './formSchema';
import { FileInfo } from '@/models/FileModel';
import { FileMetadataValues } from '@/hooks/upload/useFileMetadata';
import { PlusCircle, Hotel } from 'lucide-react';
import { 
  RoomTypeCard, 
  RoomTypeImageUploadDialog,
  useGalleryFiles
} from './room-types';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RoomTypesSectionProps {
  form: UseFormReturn<FormValues>;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({ form }) => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [currentRoomTypeIndex, setCurrentRoomTypeIndex] = useState(0);
  const { galleryFiles } = useGalleryFiles();
  const roomTypes = form.watch('roomTypes') || [];

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

  // Initialize new room type with empty extra bed values
  const addNewRoomType = () => {
    const currentRoomTypes = form.getValues('roomTypes');
    form.setValue('roomTypes', [
      ...currentRoomTypes,
      { 
        name: '', 
        maxAdults: 2, 
        maxChildren: 0, 
        images: [],
        allowExtraBed: false,
        maxExtraBeds: 1,
        extraBedPrice: 0
      }
    ]);
    
    // Scroll to the new room type after a short delay
    setTimeout(() => {
      const roomCards = document.querySelectorAll('.room-type-card');
      if (roomCards.length > 0) {
        const lastCard = roomCards[roomCards.length - 1];
        lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="space-y-6 col-span-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-foreground">Room Types</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addNewRoomType}
          className="flex items-center gap-1 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
        >
          <PlusCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          Add Room Type
        </Button>
      </div>
      
      {roomTypes.length === 0 ? (
        <Alert className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900">
          <Hotel className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription>
            Add your first room type to get started. Each room type can have different occupancy, pricing, and extra bed options.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          {roomTypes.map((roomType, index) => (
            <RoomTypeCard 
              key={index}
              index={index}
              form={form}
              onRemove={() => {
                const currentRoomTypes = form.getValues('roomTypes');
                form.setValue('roomTypes', currentRoomTypes.filter((_, i) => i !== index));
              }}
              onOpenGallery={() => openImageDialog(index)}
              className="room-type-card"
            />
          ))}
        </div>
      )}
      
      <div className="flex justify-center mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={addNewRoomType}
          className="flex items-center gap-2 border-dashed border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 w-full justify-center py-6"
        >
          <PlusCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Add Another Room Type
        </Button>
      </div>

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
