
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { AmenityImage } from '@/models/HotelModel';
import { Button } from '@/components/ui/button';
import { Trash2, PlusCircle, ChevronLeft, ChevronRight, Image } from 'lucide-react';
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
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no images, show only add button
  if (!images || !Array.isArray(images) || images.length === 0) {
    return (
      <div className="mt-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={onAddImage}
          className="w-full border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 group transition-colors"
        >
          <Image className="h-4 w-4 mr-2 group-hover:text-indigo-500" />
          Add Images
        </Button>
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="mt-2 space-y-2">
      <div className="relative h-32 rounded-md overflow-hidden border border-gray-200 group">
        <img 
          src={images[currentIndex].url} 
          alt={images[currentIndex].description || `Amenity image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-200"
        />
        
        {/* Overlay for hovering */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"></div>
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-white/80 
                        hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200
                        shadow-sm"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-white/80 
                        hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200
                        shadow-sm"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {/* Delete button */}
        {onRemoveImage && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className={cn(
              "absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              "bg-red-500/90 hover:bg-red-600 rounded-full shadow-sm"
            )}
            onClick={() => onRemoveImage(amenityKey, currentIndex)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Image counter and slider */}
      {images.length > 1 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 min-w-[36px]">
            {currentIndex + 1}/{images.length}
          </span>
          <Slider
            value={[currentIndex]}
            max={images.length - 1}
            step={1}
            className="flex-1"
            onValueChange={(val) => setCurrentIndex(val[0])}
          />
        </div>
      )}
      
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={onAddImage}
        className="w-full border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 group transition-colors"
      >
        <PlusCircle className="h-4 w-4 mr-2 group-hover:text-indigo-500" />
        Add More Images
      </Button>
    </div>
  );
};

export default AmenityImagesCarousel;
