
import React from 'react';
import { motion } from 'framer-motion';
import { AmenityImage } from '@/models/HotelModel';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { staggerItemVariants } from '../../animations/cardAnimations';

interface GalleryCarouselProps {
  images: AmenityImage[];
  category: string;
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images, category }) => {
  const isMobile = useIsMobile();

  return (
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
      
      <div className="text-center mt-4 text-sm text-muted-foreground">
        {images.length} image{images.length !== 1 ? 's' : ''} in {category}
      </div>
    </Carousel>
  );
};

export default GalleryCarousel;
