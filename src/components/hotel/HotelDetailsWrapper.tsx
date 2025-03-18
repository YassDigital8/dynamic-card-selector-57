
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
  // Enhanced spring animation configurations
  const springConfig = {
    type: "spring",
    stiffness: 350,
    damping: 30,
    mass: 1
  };

  // Staggered content animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: springConfig
    }
  };

  // Card animation
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        ...springConfig,
        delay: 0.05
      }
    }
  };

  return (
    <motion.div
      key="details"
      layoutId={`hotel-card-container-${hotel.id}`}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 10, transition: springConfig }}
      variants={cardVariants}
      className="w-full h-full"
    >
      <Card className="p-6 border-indigo-100 dark:border-indigo-900 shadow-lg rounded-xl overflow-hidden bg-white dark:bg-slate-900 backdrop-blur-sm">
        <Carousel className="w-full relative">
          <CarouselContent>
            <CarouselItem>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <HotelDetails hotel={hotel} onEdit={onEdit} onBack={onBack} />
              </motion.div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-full flex items-center justify-center p-6">
                <motion.div
                  variants={itemVariants}
                  className="space-y-4 text-center"
                >
                  <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Room Availability</h3>
                  <motion.div 
                    className="bg-indigo-50 dark:bg-indigo-900/30 p-8 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, ...springConfig }}
                  >
                    <p className="text-muted-foreground">Room availability information will be displayed here in future updates.</p>
                  </motion.div>
                </motion.div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-full flex items-center justify-center p-6">
                <motion.div
                  variants={itemVariants}
                  className="space-y-4 text-center"
                >
                  <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Hotel Gallery</h3>
                  <motion.div 
                    className="bg-indigo-50 dark:bg-indigo-900/30 p-8 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, ...springConfig }}
                  >
                    <p className="text-muted-foreground">Photo gallery will be displayed here in future updates.</p>
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
