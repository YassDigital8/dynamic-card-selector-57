
import React, { memo, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HotelDetails from './HotelDetails';
import { Hotel } from '@/models/HotelModel';
import { useIsMobile, useScreenSize } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import HotelGallery from './details/HotelGallery';

interface HotelDetailsWrapperProps {
  hotel: Hotel;
  onEdit: () => void;
  onBack?: () => void;
  onUpdateHotel?: (id: string, data: Partial<Hotel>) => void;
  isEditing?: boolean;
}

const HotelDetailsWrapper: React.FC<HotelDetailsWrapperProps> = memo(({
  hotel,
  onEdit,
  onBack,
  onUpdateHotel,
  isEditing = false
}) => {
  const isMobile = useIsMobile();
  const { width } = useScreenSize();
  
  // Log when hotel data updates for debugging
  useEffect(() => {
    console.log('HotelDetailsWrapper received updated hotel data:', hotel.id);
    console.log('Hotel amenities:', Object.keys(hotel.amenities).filter(k => k.includes('Images')));
    
    // Log image counts for better debugging
    Object.entries(hotel.amenities).forEach(([key, value]) => {
      if (key.includes('Images') && Array.isArray(value)) {
        console.log(`${key} has ${value.length} images`);
      }
    });
  }, [hotel]);
  
  const handleLogoChange = useCallback((hotelId: string, logo: string | null) => {
    if (onUpdateHotel) {
      onUpdateHotel(hotelId, { logoUrl: logo || undefined });
    }
  }, [onUpdateHotel]);
  
  const springConfig = useMemo(() => ({
    type: "spring",
    stiffness: 280,
    damping: 25,
    mass: 0.9
  }), []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: springConfig
    }
  }), [springConfig]);

  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0.95,
      scale: 0.995,
      y: 2
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        ...springConfig,
        duration: 0.25
      }
    }
  }), [springConfig]);

  // Generate a unique key for the motion div to force re-render on hotel updates
  const detailsKey = `hotel-card-container-${hotel.id}-${hotel.updatedAt.getTime()}`;

  return (
    <motion.div
      key={detailsKey}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="w-full h-full"
    >
      <Card className="p-4 sm:p-6 border-indigo-100 dark:border-indigo-900 shadow-lg rounded-xl overflow-hidden bg-white dark:bg-slate-900">
        <Carousel className="w-full relative">
          <CarouselContent>
            <CarouselItem>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-0.5 sm:px-2"
              >
                <HotelDetails 
                  hotel={hotel} 
                  onEdit={onEdit} 
                  onBack={onBack} 
                  onLogoChange={handleLogoChange}
                  isEditing={isEditing}
                />
              </motion.div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-full flex items-center justify-center p-3 sm:p-6">
                <motion.div
                  variants={itemVariants}
                  className="space-y-4 w-full"
                >
                  <HotelGallery 
                    key={`gallery-${hotel.id}-${hotel.updatedAt.getTime()}`} 
                    hotel={hotel} 
                  />
                </motion.div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-full flex items-center justify-center p-3 sm:p-6">
                <motion.div
                  variants={itemVariants}
                  className="space-y-4 text-center"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">Room Availability</h3>
                  <motion.div 
                    className="bg-indigo-50 dark:bg-indigo-900/30 p-4 sm:p-8 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, ...springConfig }}
                  >
                    <p className="text-sm sm:text-base text-muted-foreground">Room availability information will be displayed here in future updates.</p>
                  </motion.div>
                </motion.div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50" />
          <CarouselNext className="transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50" />
        </Carousel>
      </Card>
    </motion.div>
  );
});

HotelDetailsWrapper.displayName = 'HotelDetailsWrapper';

export default HotelDetailsWrapper;
