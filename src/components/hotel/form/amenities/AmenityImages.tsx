
import React from 'react';
import { Image, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AmenityImagesProps {
  images: any[];
  amenityKey: string;
  onRemove?: (amenityKey: string, index: number) => void;
}

const AmenityImages: React.FC<AmenityImagesProps> = ({
  images,
  amenityKey,
  onRemove
}) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((image, index) => (
        <div 
          key={image.id || index} 
          className="relative group rounded-md overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <img 
            src={image.url} 
            alt={image.description || `Amenity image ${index + 1}`}
            className="w-full h-24 object-cover"
          />
          
          {onRemove && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className={cn(
                "absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity",
                "bg-red-500/80 hover:bg-red-600"
              )}
              onClick={() => onRemove(amenityKey, index)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AmenityImages;
