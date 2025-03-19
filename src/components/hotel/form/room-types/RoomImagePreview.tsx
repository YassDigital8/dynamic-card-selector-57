
import React from 'react';
import { Image, Plus } from 'lucide-react';
import { FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import RoomImagesCarousel from './RoomImagesCarousel';

interface RoomImagePreviewProps {
  imageUrl?: string;
  images?: string[];
  onClick: () => void;
  onAddMore?: () => void;
  readOnly?: boolean;
}

const RoomImagePreview: React.FC<RoomImagePreviewProps> = ({ 
  imageUrl, 
  images = [], 
  onClick, 
  onAddMore,
  readOnly = false 
}) => {
  // Combine legacy imageUrl with images array for backward compatibility
  const allImages = imageUrl ? [imageUrl, ...images.filter(img => img !== imageUrl)] : images;
  const hasImages = allImages.length > 0;

  return (
    <div className={readOnly ? "" : "mb-4"}>
      {!readOnly && (
        <div className="flex justify-between items-center">
          <FormLabel>Room Images</FormLabel>
          {hasImages && onAddMore && (
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={onAddMore}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add More
            </Button>
          )}
        </div>
      )}
      
      {hasImages ? (
        <div className="space-y-2 w-full mt-2">
          {allImages.length > 1 ? (
            <RoomImagesCarousel images={allImages} />
          ) : (
            <img 
              src={allImages[0]} 
              alt="Room preview" 
              className="w-full h-48 object-cover rounded-md"
            />
          )}
          
          {!readOnly && (
            <div 
              className="text-center text-sm text-gray-500 cursor-pointer hover:underline"
              onClick={onClick}
            >
              Click to {hasImages ? 'change' : 'add'} images
            </div>
          )}
        </div>
      ) : (
        <div 
          className={`mt-2 ${!readOnly ? "border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" : ""} flex flex-col items-center justify-center`}
          onClick={readOnly ? undefined : onClick}
        >
          <div className="flex flex-col items-center justify-center py-6">
            <Image className="h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              {readOnly ? "No images available" : "Click to select room images"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomImagePreview;
