
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Image, ImagePlus } from 'lucide-react';
import RoomImagesCarousel from './RoomImagesCarousel';

interface RoomImagePreviewProps {
  imageUrl: string | undefined;
  images: string[];
  onClick: () => void;
  onDeleteImage?: (imageUrl: string) => void;
}

const RoomImagePreview: React.FC<RoomImagePreviewProps> = ({ 
  imageUrl, 
  images, 
  onClick,
  onDeleteImage
}) => {
  const allImages = imageUrl ? [imageUrl, ...images.filter(img => img !== imageUrl)] : images;
  const hasImages = allImages && allImages.length > 0;
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
          <Image className="h-4 w-4" />
          Room Images
        </span>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={onClick}
          className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
        >
          <ImagePlus className="h-3.5 w-3.5 mr-1 text-indigo-600 dark:text-indigo-400" /> 
          Add Images
        </Button>
      </div>
      
      {hasImages ? (
        <RoomImagesCarousel 
          images={allImages} 
          onDeleteImage={onDeleteImage}
        />
      ) : (
        <div 
          className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-colors"
          onClick={onClick}
        >
          <div className="w-full aspect-video flex items-center justify-center">
            <div className="text-center">
              <ImagePlus className="h-12 w-12 mx-auto text-indigo-300 dark:text-indigo-700" />
              <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-2 font-medium">Add room images</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Upload images to showcase your room</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomImagePreview;
