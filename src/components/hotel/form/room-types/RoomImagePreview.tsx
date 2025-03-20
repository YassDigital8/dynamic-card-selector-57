import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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
  const hasImages = images && images.length > 0;
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Room Images</span>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={onClick}
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Add Image{hasImages ? 's' : ''}
        </Button>
      </div>
      
      {hasImages ? (
        <RoomImagesCarousel 
          images={images} 
          onDeleteImage={onDeleteImage}
        />
      ) : (
        <div 
          className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={onClick}
        >
          <div className="w-full aspect-video flex items-center justify-center">
            <div className="text-center">
              <Plus className="h-8 w-8 mx-auto text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Add room images</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomImagePreview;
