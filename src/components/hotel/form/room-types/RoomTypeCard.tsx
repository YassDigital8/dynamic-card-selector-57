
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../formSchema';
import RoomTypeForm from './RoomTypeForm';
import RoomImagePreview from './RoomImagePreview';
import { toast } from '@/hooks/use-toast';
import { Bed, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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
      <CardHeader className="p-4 pb-3 border-b border-indigo-100 dark:border-indigo-900/50 flex flex-row items-center justify-between cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
            <Bed className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h4 className="font-medium text-indigo-700 dark:text-indigo-400">
              {roomName || `Room Type ${index + 1}`}
            </h4>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Max Occupancy: {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}{maxChildren > 0 ? `, ${maxChildren} ${maxChildren === 1 ? 'child' : 'children'}` : ''}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {index > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded();
            }}
            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'}</span>
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="p-4 pt-4">
          <RoomImagePreview 
            imageUrl={imageUrl}
            images={images}
            onClick={onOpenGallery}
            onDeleteImage={handleDeleteImage}
          />
          
          <div className="mt-4">
            <RoomTypeForm form={form} index={index} />
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default RoomTypeCard;
