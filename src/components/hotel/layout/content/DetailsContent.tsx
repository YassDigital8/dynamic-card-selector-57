
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import HotelDetailsWrapper from '../../HotelDetailsWrapper';
import { Hotel } from '@/models/HotelModel';

interface DetailsContentProps {
  hotel: Hotel;
  onStartEdit: () => void;
  onBackToList: () => void;
  onUpdateHotel?: (id: string, data: Partial<Hotel>) => void;
  isEditing: boolean;
  contentVariants: any;
}

const DetailsContent: React.FC<DetailsContentProps> = ({
  hotel,
  onStartEdit,
  onBackToList,
  onUpdateHotel,
  isEditing,
  contentVariants
}) => {
  // Generate a stable key that doesn't cause re-renders with each updatedAt change
  const hotelDetailsKey = useMemo(() => 
    `hotel-details-${hotel.id}`,
  [hotel.id]);
  
  return (
    <motion.div
      key={hotelDetailsKey}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={contentVariants}
      className="flex-1"
    >
      <HotelDetailsWrapper 
        hotel={hotel} 
        onEdit={onStartEdit} 
        onBack={onBackToList}
        onUpdateHotel={onUpdateHotel}
        isEditing={isEditing}
      />
    </motion.div>
  );
};

export default DetailsContent;
