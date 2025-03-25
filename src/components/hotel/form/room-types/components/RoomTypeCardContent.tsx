
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../../formSchema';
import RoomTypeForm from '../RoomTypeForm';
import RoomImagePreview from '../RoomImagePreview';

interface RoomTypeCardContentProps {
  form: UseFormReturn<FormValues>;
  index: number;
  imageUrl: string | undefined;
  images: string[];
  onOpenGallery: () => void;
  onDeleteImage: (imageUrl: string) => void;
}

const RoomTypeCardContent: React.FC<RoomTypeCardContentProps> = ({
  form,
  index,
  imageUrl,
  images,
  onOpenGallery,
  onDeleteImage
}) => {
  return (
    <CardContent className="p-4 pt-4">
      <RoomImagePreview 
        imageUrl={imageUrl}
        images={images}
        onClick={onOpenGallery}
        onDeleteImage={onDeleteImage}
      />
      
      <div className="mt-4">
        <RoomTypeForm form={form} index={index} />
      </div>
    </CardContent>
  );
};

export default RoomTypeCardContent;
