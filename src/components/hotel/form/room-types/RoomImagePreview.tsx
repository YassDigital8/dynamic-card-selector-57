
import React from 'react';
import { Image, Plus, Trash2 } from 'lucide-react';
import { FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import RoomImagesCarousel from './RoomImagesCarousel';

interface RoomImagePreviewProps {
  imageUrl?: string;
  images?: string[];
  onClick: () => void;
  onAddMore?: () => void;
  readOnly?: boolean;
  onDeleteImage?: (imageUrl: string) => void; // Add ability to delete images
}

const RoomImagePreview: React.FC<RoomImagePreviewProps> = ({ 
  imageUrl, 
  images = [], 
  onClick, 
  onAddMore,
  readOnly = false,
  onDeleteImage
}) => {
  // Combine legacy imageUrl with images array for backward compatibility
  const allImages = imageUrl 
    ? [imageUrl, ...images.filter(img => img !== imageUrl)] 
    : images;
  
  const hasImages = allImages.length > 0;

  return (
    <div className={readOnly ? "" : "mb-4"}>
      {!readOnly && (
        <div className="flex justify-between items-center">
          <FormLabel>Room Images</FormLabel>
          <div className="flex gap-2">
            {hasImages && (
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={onClick}
                className="flex items-center gap-1"
              >
                Manage Images
              </Button>
            )}
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
        </div>
      )}
      
      {hasImages ? (
        <div className="space-y-2 w-full mt-2">
          {allImages.length > 1 ? (
            <RoomImagesCarousel 
              images={allImages} 
              onDeleteImage={!readOnly ? onDeleteImage : undefined} 
            />
          ) : (
            <div className="relative">
              <img 
                src={allImages[0]} 
                alt="Room preview" 
                className="w-full h-48 object-cover rounded-md"
              />
              {!readOnly && onDeleteImage && (
                <div className="absolute top-2 right-2">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="h-7 w-7 p-0 rounded-full" 
                    onClick={() => onDeleteImage(allImages[0])}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
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
