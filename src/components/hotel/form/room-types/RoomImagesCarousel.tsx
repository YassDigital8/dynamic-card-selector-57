
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface RoomImagesCarouselProps {
  images: string[];
  className?: string;
  onDeleteImage?: (imageUrl: string) => void;
}

const RoomImagesCarousel: React.FC<RoomImagesCarouselProps> = ({ 
  images,
  className,
  onDeleteImage
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Carousel className={cn("w-full", className)}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1 relative">
              <img 
                src={image} 
                alt={`Room image ${index + 1}`} 
                className="w-full h-48 object-cover rounded-md"
              />
              {onDeleteImage && (
                <div className="absolute top-2 right-2">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="h-7 w-7 p-0 rounded-full" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteImage(image);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  );
};

export default RoomImagesCarousel;
