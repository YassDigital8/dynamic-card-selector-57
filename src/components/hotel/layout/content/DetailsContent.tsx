
import React from 'react';
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
  // Generate a unique key that doesn't rely on getTime()
  const hotelDetailsKey = `hotel-details-${hotel.id}-${typeof hotel.updatedAt === 'object' && hotel.updatedAt instanceof Date 
    ? hotel.updatedAt.getTime() 
    : String(hotel.updatedAt)}`;
  
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
