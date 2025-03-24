
import React from 'react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import HotelCard from '../HotelCard';

interface HotelCardGridProps {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  onSelectHotel: (hotel: Hotel) => void;
  onEditHotel: (hotel: Hotel) => void;
  onDeleteHotel: (id: string) => void;
  isEditing: boolean;
  hideEditButton?: boolean;
  springConfig: any;
  viewMode?: 'grid' | 'list';
}

const HotelCardGrid: React.FC<HotelCardGridProps> = ({
  hotels,
  selectedHotel,
  onSelectHotel,
  onEditHotel,
  onDeleteHotel,
  isEditing,
  hideEditButton = false,
  springConfig,
  viewMode = 'grid'
}) => {
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0,
        ...springConfig
      }
    }
  };

  return (
    <motion.div 
      key="results"
      className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          : "flex flex-col space-y-4"
      }
      variants={container}
      initial="hidden"
      animate="show"
      layout="position"
    >
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          isSelected={selectedHotel?.id === hotel.id}
          onSelect={() => onSelectHotel(hotel)}
          onEdit={() => onEditHotel(hotel)}
          onDelete={() => onDeleteHotel(hotel.id)}
          useGridView={viewMode === 'grid'}
          disabled={isEditing}
          hideEditButton={hideEditButton}
        />
      ))}
    </motion.div>
  );
};

export default HotelCardGrid;
