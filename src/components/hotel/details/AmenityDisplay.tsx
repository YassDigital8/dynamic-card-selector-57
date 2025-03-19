
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Image as ImageIcon } from 'lucide-react';
import { HotelAmenities, AmenityImage } from '@/models/HotelModel';
import { staggerContainerVariants, staggerItemVariants } from '../animations/cardAnimations';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface AmenityDisplayProps {
  amenities: HotelAmenities;
}

// This is our mapping of amenity keys to display names
const amenityDisplayNames: Record<keyof HotelAmenities, string> = {
  airConditioning: 'Air Conditioning',
  bar: 'Bar',
  gym: 'Gym',
  parking: 'Parking',
  spa: 'Spa',
  restaurant: 'Restaurant',
  breakfast: 'Breakfast',
  wifi: 'Wi-Fi',
  swimmingPool: 'Swimming Pool',
  petsAllowed: 'Pets Allowed',
  extraBed: 'Extra Bed',
  barImages: 'Bar Images',
  gymImages: 'Gym Images',
  spaImages: 'Spa Images',
  restaurantImages: 'Restaurant Images',
  breakfastImages: 'Breakfast Images',
  swimmingPoolImages: 'Swimming Pool Images'
};

// Map amenity names to their images array
const amenityImageMapping: Record<string, keyof HotelAmenities> = {
  bar: 'barImages',
  gym: 'gymImages',
  spa: 'spaImages',
  restaurant: 'restaurantImages',
  breakfast: 'breakfastImages',
  swimmingPool: 'swimmingPoolImages'
};

const AmenityDisplay: React.FC<AmenityDisplayProps> = ({ amenities }) => {
  // Extract amenity entries, filtering out the image arrays
  const amenityEntries = Object.entries(amenities)
    .filter(([key]) => !key.includes('Images'))
    .map(([key, value]) => [key, value]) as [keyof HotelAmenities, boolean][];

  const [selectedAmenity, setSelectedAmenity] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleViewImages = (amenity: string) => {
    setSelectedAmenity(amenity);
    setIsGalleryOpen(true);
  };

  return (
    <>
      <motion.div 
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
      >
        {amenityEntries.map(([key, value]) => {
          // Check if this amenity has images
          const hasImages = amenityImageMapping[key as string] && 
            amenities[amenityImageMapping[key as string]]?.length > 0;

          return (
            <motion.div 
              key={key}
              variants={staggerItemVariants}
              whileHover={{ 
                scale: 1.03,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              className={`flex items-center p-2 rounded-md ${
                value 
                  ? 'border border-green-100 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
                  : 'border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/20 text-gray-500 dark:text-gray-400'
              }`}
            >
              <div className="mr-2">
                {value ? (
                  <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                ) : (
                  <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                )}
              </div>
              <span className="text-sm font-medium truncate flex-grow">
                {amenityDisplayNames[key]}
              </span>
              {hasImages && value && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 ml-auto"
                  onClick={() => handleViewImages(key as string)}
                >
                  <ImageIcon className="h-4 w-4 text-blue-500" />
                </Button>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Image Gallery Dialog */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedAmenity && amenityDisplayNames[selectedAmenity as keyof HotelAmenities]} Images
            </DialogTitle>
          </DialogHeader>
          
          {selectedAmenity && (
            <Carousel className="w-full max-w-lg mx-auto">
              <CarouselContent>
                {amenities[amenityImageMapping[selectedAmenity]]?.map((image: AmenityImage, index: number) => (
                  <CarouselItem key={index}>
                    <div className="p-1 h-64 flex items-center justify-center">
                      <img 
                        src={image.url} 
                        alt={image.description || `${selectedAmenity} image ${index + 1}`}
                        className="max-h-full max-w-full object-contain rounded-md"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AmenityDisplay;
