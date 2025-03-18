
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HotelDetails from './HotelDetails';
import { Hotel } from '@/models/HotelModel';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

interface HotelDetailsWrapperProps {
  hotel: Hotel;
  onEdit: () => void;
  onBack?: () => void;
}

const HotelDetailsWrapper: React.FC<HotelDetailsWrapperProps> = memo(({
  hotel,
  onEdit,
  onBack
}) => {
  // Spring animation configurations for natural movement
  const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1
  };

  return (
    <motion.div
      key="details"
      layoutId={`hotel-card-container-${hotel.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 10 }}
      transition={springConfig}
      className="w-full h-full"
    >
      <Card className="p-6 border-indigo-100 dark:border-indigo-900 shadow-lg rounded-xl overflow-hidden bg-white dark:bg-slate-900 backdrop-blur-sm">
        <Carousel className="w-full relative">
          <CarouselContent>
            <CarouselItem>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: 0.1,
                  ...springConfig
                }}
              >
                <HotelDetails hotel={hotel} onEdit={onEdit} onBack={onBack} />
              </motion.div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-full flex items-center justify-center p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, ...springConfig }}
                  className="space-y-4 text-center"
                >
                  <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Room Availability</h3>
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-8 rounded-xl">
                    <p className="text-muted-foreground">Room availability information will be displayed here in future updates.</p>
                  </div>
                </motion.div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-full flex items-center justify-center p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, ...springConfig }}
                  className="space-y-4 text-center"
                >
                  <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Hotel Gallery</h3>
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-8 rounded-xl">
                    <p className="text-muted-foreground">Photo gallery will be displayed here in future updates.</p>
                  </div>
                </motion.div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Card>
    </motion.div>
  );
});

HotelDetailsWrapper.displayName = 'HotelDetailsWrapper';

export default HotelDetailsWrapper;
