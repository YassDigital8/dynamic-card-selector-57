
import React from 'react';
import { AmenityImage } from '@/models/HotelModel';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface AmenityImageGalleryProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAmenity: string | null;
  displayName: string;
  images: AmenityImage[];
}

const AmenityImageGallery: React.FC<AmenityImageGalleryProps> = ({
  isOpen,
  onOpenChange,
  selectedAmenity,
  displayName,
  images
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {displayName} Images
          </DialogTitle>
        </DialogHeader>
        
        <Carousel className="w-full max-w-lg mx-auto">
          <CarouselContent>
            {images.map((image: AmenityImage, index: number) => (
              <CarouselItem key={index}>
                <div className="p-1 h-64 flex items-center justify-center">
                  <img 
                    src={image.url} 
                    alt={image.description || `${displayName} image ${index + 1}`}
                    className="max-h-full max-w-full object-contain rounded-md"
                  />
                </div>
                <div className="text-center mt-2">
                  <p className="text-sm font-medium">{image.title || `${displayName} Image ${index + 1}`}</p>
                  {image.description && <p className="text-xs text-muted-foreground">{image.description}</p>}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default AmenityImageGallery;
