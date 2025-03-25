
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators
} from '@/components/ui/carousel';
import { AmenityImage } from '@/models/HotelModel';
import { Button } from '@/components/ui/button';
import { Trash2, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AmenityImagesCarouselProps {
  images: AmenityImage[];
  amenityKey: string;
  onAddImage: () => void;
  onRemoveImage?: (amenityKey: string, index: number) => void;
}

const AmenityImagesCarousel: React.FC<AmenityImagesCarouselProps> = ({
  images,
  amenityKey,
  onAddImage,
  onRemoveImage
}) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return (
      <div className="mt-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={onAddImage}
          className="w-full border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Images
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-2">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image.id || index} className="basis-full">
              <div className="relative h-28 rounded-md overflow-hidden border border-gray-200">
                <img 
                  src={image.url} 
                  alt={image.description || `Amenity image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {onRemoveImage && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className={cn(
                      "absolute top-1 right-1 h-6 w-6 opacity-80 hover:opacity-100",
                      "bg-red-500/80 hover:bg-red-600 rounded-full"
                    )}
                    onClick={() => onRemoveImage(amenityKey, index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {images.length > 1 && (
          <>
            <CarouselPrevious className="h-7 w-7 -left-3" />
            <CarouselNext className="h-7 w-7 -right-3" />
          </>
        )}
      </Carousel>
      
      {images.length > 1 && (
        <CarouselIndicators className="justify-center" />
      )}
      
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={onAddImage}
        className="w-full border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add More Images
      </Button>
    </div>
  );
};

export default AmenityImagesCarousel;
