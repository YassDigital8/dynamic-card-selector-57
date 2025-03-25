
import React from 'react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import HotelDetails from '../../HotelDetails';

interface CarouselItemDetailProps {
  hotel: Hotel;
  onEdit: () => void;
  onBack?: () => void;
  onLogoChange: (hotelId: string, logo: string | null) => void;
  isEditing: boolean;
  containerVariants: any;
  itemVariants: any;
}

const CarouselItemDetail: React.FC<CarouselItemDetailProps> = ({
  hotel,
  onEdit,
  onBack,
  onLogoChange,
  isEditing,
  containerVariants,
  itemVariants
}) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-0.5 sm:px-2"
    >
      <HotelDetails 
        hotel={hotel} 
        onEdit={onEdit} 
        onBack={onBack} 
        onLogoChange={onLogoChange}
        isEditing={isEditing}
      />
    </motion.div>
  );
};

export default CarouselItemDetail;
