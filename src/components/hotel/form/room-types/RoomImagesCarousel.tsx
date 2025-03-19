
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
          <CarouselItem key={index}>
            <div className="relative">
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
      <CarouselPrevious className="h-8 w-8 -left-3 bg-white/80 border-gray-200 hover:bg-white"/>
      <CarouselNext className="h-8 w-8 -right-3 bg-white/80 border-gray-200 hover:bg-white"/>
      
      {images.length > 1 && (
        <div className="flex justify-center mt-2">
          <CarouselIndicators className="gap-1" />
        </div>
      )}
    </Carousel>
  );
};

export default RoomImagesCarousel;
