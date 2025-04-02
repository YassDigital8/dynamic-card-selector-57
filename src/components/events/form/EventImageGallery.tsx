
import React from 'react';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { EventImage } from '@/models/EventModel';
import { Image, Trash2, Plus } from 'lucide-react';

interface EventImageGalleryProps {
  images: EventImage[];
  mainImageUrl: string;
  onAddImages: () => void;
  onRemoveImage: (index: number) => void;
  onSetMainImage: (url: string) => void;
}

const EventImageGallery: React.FC<EventImageGalleryProps> = ({
  images,
  mainImageUrl,
  onAddImages,
  onRemoveImage,
  onSetMainImage
}) => {
  return (
    <div className="space-y-2">
      <FormLabel>Event Images</FormLabel>
      <div className="flex flex-wrap gap-4 mt-2">
        {images.map((image, index) => (
          <div 
            key={image.id || index} 
            className={`relative group overflow-hidden rounded-md border border-gray-200 bg-gray-50 ${mainImageUrl === image.url ? 'ring-2 ring-primary' : ''}`}
          >
            <div className="relative w-24 h-24 md:w-28 md:h-28">
              <img 
                src={image.url} 
                alt={image.metadata?.altText || `Event image ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              {mainImageUrl === image.url && (
                <div className="absolute top-0 left-0 bg-primary/80 text-white text-xs px-2 py-1 rounded-br-md">
                  Main
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-1 transition-opacity">
              {mainImageUrl !== image.url && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-white h-8 w-8 p-0"
                  onClick={() => onSetMainImage(image.url)}
                >
                  <Image className="h-4 w-4" />
                </Button>
              )}
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="text-white h-8 w-8 p-0"
                onClick={() => onRemoveImage(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          className="w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center border-dashed"
          onClick={onAddImages}
        >
          <Plus className="h-5 w-5 mb-1" />
          <span className="text-sm">Add Images</span>
        </Button>
      </div>
    </div>
  );
};

export default EventImageGallery;
