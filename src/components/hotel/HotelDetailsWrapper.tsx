
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HotelDetails from './HotelDetails';
import { Hotel } from '@/models/HotelModel';

interface HotelDetailsWrapperProps {
  hotel: Hotel;
  onEdit: () => void;
  onBack?: () => void;
}

const HotelDetailsWrapper: React.FC<HotelDetailsWrapperProps> = ({
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
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 border-indigo-100 dark:border-indigo-900 shadow-md overflow-hidden bg-white dark:bg-slate-900">
        <HotelDetails hotel={hotel} onEdit={onEdit} onBack={onBack} />
      </Card>
    </motion.div>
  );
};

export default HotelDetailsWrapper;
