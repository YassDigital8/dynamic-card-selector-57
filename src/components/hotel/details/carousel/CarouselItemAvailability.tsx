
import React from 'react';
import { motion } from 'framer-motion';

interface CarouselItemAvailabilityProps {
  itemVariants: any;
  springConfig: any;
}

const CarouselItemAvailability: React.FC<CarouselItemAvailabilityProps> = ({
  itemVariants,
  springConfig
}) => {
  return (
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
  );
};

export default CarouselItemAvailability;
