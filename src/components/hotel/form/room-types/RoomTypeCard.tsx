
import React from 'react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import RoomTypeForm from './RoomTypeForm';
import RoomImagePreview from './RoomImagePreview';

interface RoomTypeCardProps {
  index: number;
  form: UseFormReturn<FormValues>;
  onRemove: () => void;
  onOpenGallery: () => void;
}

const RoomTypeCard: React.FC<RoomTypeCardProps> = ({ 
  index, 
  form, 
  onRemove, 
  onOpenGallery 
}) => {
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
        imageUrl={form.watch(`roomTypes.${index}.imageUrl`)}
        onClick={onOpenGallery}
      />
      
      <RoomTypeForm form={form} index={index} />
    </div>
  );
};

export default RoomTypeCard;
