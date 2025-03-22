
import React from 'react';
import { motion } from 'framer-motion';
import NoHotelSelected from '../../NoHotelSelected';
import HotelEmptyState from '../../HotelEmptyState';

interface EmptyStateContentProps {
  hasHotels: boolean;
  selectedPOS: string;
  posName?: string;
  onAddHotel: () => void;
  contentVariants: any;
}

const EmptyStateContent: React.FC<EmptyStateContentProps> = ({
  hasHotels,
  selectedPOS,
  posName,
  onAddHotel,
  contentVariants
}) => {
  return hasHotels ? (
    <motion.div
      key="no-hotel-selected"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={contentVariants}
      className="flex-1 relative h-full"
    >
      <NoHotelSelected
        hasHotels={hasHotels}
        onAddHotel={onAddHotel}
      />
    </motion.div>
  ) : (
    <motion.div
      key="empty-state"
      initial="hidden"
      animate="visible" 
      exit="hidden"
      variants={contentVariants}
      className="flex-1 relative h-full"
    >
      <HotelEmptyState
        selectedPOS={selectedPOS}
        posName={posName}
        hasHotels={hasHotels}
        onAddHotel={onAddHotel}
      />
    </motion.div>
  );
};

export default EmptyStateContent;
