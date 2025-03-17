
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HotelDetails from './HotelDetails';
import { Hotel } from '@/models/HotelModel';

interface HotelDetailsWrapperProps {
  hotel: Hotel;
  onEdit: () => void;
}

const HotelDetailsWrapper: React.FC<HotelDetailsWrapperProps> = ({
  hotel,
  onEdit
}) => {
  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 border-blue-100 dark:border-blue-900 shadow-lg">
        <HotelDetails hotel={hotel} onEdit={onEdit} />
      </Card>
    </motion.div>
  );
};

export default HotelDetailsWrapper;
