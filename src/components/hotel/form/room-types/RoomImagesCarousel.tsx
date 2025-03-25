
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface RoomImagesCarouselProps {
  images: string[];
  onDeleteImage?: (imageUrl: string) => void;
  className?: string; // Add className prop to fix build error
}

const RoomImagesCarousel: React.FC<RoomImagesCarouselProps> = ({ 
  images, 
  onDeleteImage,
  className 
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={className || "relative"}>
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-full lg:basis-full">
              <div className="relative aspect-video overflow-hidden rounded-md group">
                <img 
                  src={image} 
                  alt={`Room view ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {onDeleteImage && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteImage(image);
                      }}
                      className="bg-red-600/80 hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>
                )}
                
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {index + 1} / {images.length}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default RoomImagesCarousel;
