
import React, { memo, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Hotel } from '@/models/HotelModel';
import { useIsMobile, useScreenSize } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  CarouselIndicators 
} from '@/components/ui/carousel';
import {
  CarouselItemDetail,
  CarouselItemGallery,
  CarouselItemCommercial,
  CarouselItemAvailability
} from './details/carousel';

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

  // Generate a unique key for the motion div that safely handles different updatedAt types
  const detailsKey = `hotel-card-container-${hotel.id}-${typeof hotel.updatedAt === 'object' && hotel.updatedAt instanceof Date 
    ? hotel.updatedAt.getTime() 
    : String(hotel.updatedAt)}`;

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
              <CarouselItemDetail 
                hotel={hotel}
                onEdit={onEdit}
                onBack={onBack}
                onLogoChange={handleLogoChange}
                isEditing={isEditing}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
              />
            </CarouselItem>
            
            <CarouselItem>
              <CarouselItemGallery 
                hotel={hotel}
                itemVariants={itemVariants}
              />
            </CarouselItem>
            
            {/* Commercial Deals View (Contract Documents) */}
            <CarouselItem>
              <CarouselItemCommercial 
                contractDocuments={hotel.contractDocuments}
                itemVariants={itemVariants}
              />
            </CarouselItem>
            
            <CarouselItem>
              <CarouselItemAvailability 
                itemVariants={itemVariants}
                springConfig={springConfig}
              />
            </CarouselItem>
          </CarouselContent>
          
          <div className="absolute -bottom-10 w-full flex justify-center">
            <CarouselIndicators className="gap-2" />
          </div>
          
          <CarouselPrevious className="transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50" />
          <CarouselNext className="transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50" />
        </Carousel>
      </Card>
    </motion.div>
  );
});

HotelDetailsWrapper.displayName = 'HotelDetailsWrapper';

export default HotelDetailsWrapper;
