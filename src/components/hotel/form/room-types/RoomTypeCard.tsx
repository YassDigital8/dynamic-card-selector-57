
import React from 'react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import RoomTypeForm from './RoomTypeForm';
import RoomImagePreview from './RoomImagePreview';
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface RoomTypeCardProps {
  index: number;
  form: UseFormReturn<FormValues>;
  onRemove: () => void;
  onOpenGallery: () => void;
  onOpenMultiGallery?: () => void; // Add this optional prop
}

const RoomTypeCard: React.FC<RoomTypeCardProps> = ({ 
  index, 
  form, 
  onRemove, 
  onOpenGallery
}) => {
  const imageUrl = form.watch(`roomTypes.${index}.imageUrl`);
  const images = form.watch(`roomTypes.${index}.images`) || [];

  const handleDeleteImage = (imageToDelete: string) => {
    // Remove from images array
    const updatedImages = images.filter(img => img !== imageToDelete);
    form.setValue(`roomTypes.${index}.images`, updatedImages);

    // If we're deleting the main image, set a new one if available
    if (imageUrl === imageToDelete) {
      form.setValue(`roomTypes.${index}.imageUrl`, updatedImages.length > 0 ? updatedImages[0] : '');
    }

    toast({
      title: "Image removed",
      description: "The image has been removed from this room type",
    });
  };

  return (
    <div className="p-4 border rounded-md space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Room Type {index + 1}</h4>
        {index > 0 && (
          <Button 
            variant="destructive" 
            size="sm" 
            type="button"
            onClick={onRemove}
          >
            Remove
          </Button>
        )}
      </div>
      
      <RoomImagePreview 
        imageUrl={imageUrl}
        images={images}
        onClick={onOpenGallery}
        onDeleteImage={handleDeleteImage}
      />
      
      <RoomTypeForm form={form} index={index} />
    </div>
  );
};

export default RoomTypeCard;
