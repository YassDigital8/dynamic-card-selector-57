
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import RoomTypeCardHeader from './components/RoomTypeCardHeader';
import RoomTypeCardContent from './components/RoomTypeCardContent';

interface RoomTypeCardProps {
  index: number;
  form: UseFormReturn<FormValues>;
  onRemove: () => void;
  onOpenGallery: () => void;
  className?: string;
}

const RoomTypeCard: React.FC<RoomTypeCardProps> = ({ 
  index, 
  form, 
  onRemove, 
  onOpenGallery,
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const imageUrl = form.watch(`roomTypes.${index}.imageUrl`);
  const images = form.watch(`roomTypes.${index}.images`) || [];
  const roomName = form.watch(`roomTypes.${index}.name`) || `Room Type ${index + 1}`;
  const maxAdults = form.watch(`roomTypes.${index}.maxAdults`) || 0;
  const maxChildren = form.watch(`roomTypes.${index}.maxChildren`) || 0;

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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className={cn(
      "border border-indigo-100 dark:border-indigo-900/50 shadow-sm overflow-hidden transition-all duration-200", 
      isExpanded ? "ring-1 ring-indigo-200 dark:ring-indigo-800/30" : "",
      className
    )}>
      <RoomTypeCardHeader 
        roomName={roomName}
        maxAdults={maxAdults}
        maxChildren={maxChildren}
        index={index}
        isExpanded={isExpanded}
        onToggleExpand={toggleExpanded}
        onRemove={onRemove}
      />
      
      {isExpanded && (
        <RoomTypeCardContent 
          form={form}
          index={index}
          imageUrl={imageUrl}
          images={images}
          onOpenGallery={onOpenGallery}
          onDeleteImage={handleDeleteImage}
        />
      )}
    </Card>
  );
};

export default RoomTypeCard;
