
import React from 'react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import HotelGallery from '../../details/HotelGallery';

interface CarouselItemGalleryProps {
  hotel: Hotel;
  itemVariants: any;
}

const CarouselItemGallery: React.FC<CarouselItemGalleryProps> = ({
  hotel,
  itemVariants
}) => {
  return (
    <div className="h-full flex items-center justify-center p-3 sm:p-6">
      <motion.div
        variants={itemVariants}
        className="space-y-4 w-full"
      >
        <HotelGallery 
          key={`gallery-${hotel.id}-${typeof hotel.updatedAt === 'object' && hotel.updatedAt instanceof Date 
            ? hotel.updatedAt.getTime() 
            : String(hotel.updatedAt)}`} 
          hotel={hotel} 
        />
      </motion.div>
    </div>
  );
};

export default CarouselItemGallery;
