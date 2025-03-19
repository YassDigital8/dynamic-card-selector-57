
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

interface RoomImagesCarouselProps {
  images: string[];
  className?: string;
}

const RoomImagesCarousel: React.FC<RoomImagesCarouselProps> = ({ 
  images,
  className
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Carousel className={cn("w-full", className)}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img 
                src={image} 
                alt={`Room image ${index + 1}`} 
                className="w-full h-48 object-cover rounded-md"
              />
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
