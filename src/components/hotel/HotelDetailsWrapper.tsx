
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full h-full"
    >
      <Card className="p-6 border-indigo-100 dark:border-indigo-900 shadow-lg rounded-xl overflow-hidden bg-white dark:bg-slate-900 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <HotelDetails hotel={hotel} onEdit={onEdit} onBack={onBack} />
        </motion.div>
      </Card>
    </motion.div>
  );
});

HotelDetailsWrapper.displayName = 'HotelDetailsWrapper';

export default HotelDetailsWrapper;
