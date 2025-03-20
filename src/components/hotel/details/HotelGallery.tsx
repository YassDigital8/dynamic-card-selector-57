
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hotel, AmenityImage } from '@/models/HotelModel';
import { staggerContainerVariants, staggerItemVariants } from '../animations/cardAnimations';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { ImageIcon } from 'lucide-react';

interface HotelGalleryProps {
  hotel: Hotel;
}

const HotelGallery: React.FC<HotelGalleryProps> = ({ hotel }) => {
  const isMobile = useIsMobile();
  
  // Extract all amenity images
  const amenityImagesMap = new Map<string, AmenityImage[]>();
  
  // Debug hotel amenities object
  useEffect(() => {
    console.log('Hotel Gallery - Full hotel object:', hotel);
    console.log('Hotel Gallery - Amenities object:', hotel.amenities);
    console.log('Hotel Gallery - Spa images specifically:', hotel.amenities.spaImages);
    
    // Check all possible image arrays
    const imageArrays = [
      { name: 'Spa', arr: hotel.amenities.spaImages },
      { name: 'Bar', arr: hotel.amenities.barImages },
      { name: 'Gym', arr: hotel.amenities.gymImages },
      { name: 'Restaurant', arr: hotel.amenities.restaurantImages },
      { name: 'Breakfast', arr: hotel.amenities.breakfastImages },
      { name: 'Swimming Pool', arr: hotel.amenities.swimmingPoolImages }
    ];
    
    imageArrays.forEach(({ name, arr }) => {
      console.log(`${name} images:`, arr);
      if (arr && arr.length > 0) {
        console.log(`${name} has ${arr.length} images. First image:`, arr[0]);
      }
    });
  }, [hotel]);
  
  // Function to safely add images to our map
  const addImagesToMap = (key: string, displayName: string, images?: AmenityImage[]) => {
    if (images && Array.isArray(images) && images.length > 0) {
      console.log(`Adding ${images.length} images for ${displayName}:`, images);
      amenityImagesMap.set(displayName, images);
    } else {
      console.log(`No images found for ${displayName}`);
    }
  };
  
  // Check if amenity is enabled before adding images
  const addEnabledAmenityImages = (key: AmenityKey, displayName: string) => {
    if (hotel.amenities[key]) {
      const imagesKey = `${key}Images` as const;
      addImagesToMap(key, displayName, hotel.amenities[imagesKey]);
    } else {
      console.log(`Amenity ${key} is disabled, not showing images`);
    }
  };
  
  // Define amenity keys type
  type AmenityKey = 'bar' | 'gym' | 'spa' | 'restaurant' | 'breakfast' | 'swimmingPool';
  
  // Add enabled amenity images
  addEnabledAmenityImages('bar', 'Bar');
  addEnabledAmenityImages('gym', 'Gym');
  addEnabledAmenityImages('spa', 'Spa');
  addEnabledAmenityImages('restaurant', 'Restaurant');
  addEnabledAmenityImages('breakfast', 'Breakfast');
  addEnabledAmenityImages('swimmingPool', 'Swimming Pool');
  
  // Also add room type images
  const roomTypeImages: AmenityImage[] = [];
  hotel.roomTypes.forEach(roomType => {
    if (roomType.imageUrl) {
      roomTypeImages.push({
        url: roomType.imageUrl,
        title: roomType.name,
        description: `Main image for ${roomType.name}`
      });
    }
    
    if (roomType.images && roomType.images.length > 0) {
      roomType.images.forEach(imgUrl => {
        roomTypeImages.push({
          url: imgUrl,
          title: roomType.name,
          description: `Image for ${roomType.name}`
        });
      });
    }
  });
  
  if (roomTypeImages.length > 0) {
    amenityImagesMap.set('Room Types', roomTypeImages);
  }
  
  // Convert amenity images map to array for rendering
  const amenityCategories = Array.from(amenityImagesMap.entries());
  
  // Debug output to help diagnose issues
  console.log('Gallery categories:', amenityCategories);
  console.log('Total categories with images:', amenityCategories.length);
  
  if (amenityCategories.length === 0) {
    return (
      <div className="text-center p-6">
        <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Hotel Gallery</h3>
        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl">
          <ImageIcon className="h-12 w-12 mx-auto text-indigo-300 dark:text-indigo-600 mb-3" />
          <p className="text-muted-foreground">No images available for this hotel.</p>
          <p className="text-sm text-muted-foreground mt-2">Add images to amenities or room types to see them here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 text-center">Hotel Gallery</h3>
      
      <Tabs defaultValue={amenityCategories[0][0]}>
        <TabsList className="w-full h-auto flex flex-wrap justify-center mb-4">
          {amenityCategories.map(([category]) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="px-4 py-2 m-1 data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/40"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {amenityCategories.map(([category, images]) => (
          <TabsContent key={category} value={category} className="mt-4">
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <motion.div 
                        variants={staggerItemVariants}
                        className="p-1 flex items-center justify-center"
                      >
                        <Card className="w-full overflow-hidden">
                          <div className="h-64 md:h-80 w-full relative overflow-hidden border border-indigo-100 dark:border-indigo-900">
                            <img 
                              src={image.url} 
                              alt={image.description || `${category} image ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4 space-y-2">
                            {image.title && (
                              <h4 className="font-medium text-indigo-700 dark:text-indigo-300">
                                {image.title}
                              </h4>
                            )}
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {image.description || `${category} image ${index + 1}`}
                            </p>
                            {image.caption && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                                {image.caption}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className={`left-2 ${isMobile ? '-translate-y-1/2' : '-translate-y-1/3'}`} />
                <CarouselNext className={`right-2 ${isMobile ? '-translate-y-1/2' : '-translate-y-1/3'}`} />
              </Carousel>
              
              <div className="text-center mt-4 text-sm text-muted-foreground">
                {images.length} image{images.length !== 1 ? 's' : ''} in {category}
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HotelGallery;
