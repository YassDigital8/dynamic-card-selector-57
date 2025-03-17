
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HotelDetails from './HotelDetails';
import { Hotel } from '@/models/HotelModel';

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
  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.8
      }}
      className="w-full h-full"
    >
      <Card className="p-6 border-indigo-100 dark:border-indigo-900 shadow-lg rounded-xl overflow-hidden bg-white dark:bg-slate-900 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.12, 
            ease: "easeOut" 
          }}
        >
          <HotelDetails hotel={hotel} onEdit={onEdit} onBack={onBack} />
        </motion.div>
      </Card>
    </motion.div>
  );
});

HotelDetailsWrapper.displayName = 'HotelDetailsWrapper';

export default HotelDetailsWrapper;
