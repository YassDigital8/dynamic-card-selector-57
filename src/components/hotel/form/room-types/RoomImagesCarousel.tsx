
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
    <Carousel className={cn("w-full relative", className)}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <div className="relative w-full">
              <img 
                src={image} 
                alt={`Room image ${index + 1}`} 
                className="w-full h-48 object-cover"
              />
              {onDeleteImage && (
                <div className="absolute top-2 right-2">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="h-7 w-7 p-0 rounded-full opacity-90 hover:opacity-100" 
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
      
      {images.length > 1 && (
        <>
          <CarouselPrevious className="h-8 w-8 -left-3 sm:left-1 bg-white/80 border-gray-200 hover:bg-white"/>
          <CarouselNext className="h-8 w-8 -right-3 sm:right-1 bg-white/80 border-gray-200 hover:bg-white"/>
          <div className="absolute bottom-1 left-0 right-0">
            <CarouselIndicators className="gap-1" />
          </div>
        </>
      )}
    </Carousel>
  );
};

export default RoomImagesCarousel;
