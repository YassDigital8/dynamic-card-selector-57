
import React from 'react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import { Card, CardContent } from '@/components/ui/card';
import HotelCardHeader from './card/HotelCardHeader';
import HotelLocationInfo from './card/HotelLocationInfo';
import HotelCardAmenities from './card/HotelCardAmenities';
import HotelCardFooter from './card/HotelCardFooter';
import { containerAnimation } from './animations/cardAnimations';
import { useIsMobile } from '@/hooks/use-mobile';

interface HotelCardProps {
  hotel: Hotel;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  useGridView?: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  useGridView = false
}) => {
  const isMobile = useIsMobile();

  // Enhanced card animation variants
  const cardAnimation = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      y: 0
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.15), 0 4px 6px -2px rgba(79, 70, 229, 0.1)",
      y: -4,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    },
    tap: { 
      scale: 0.98, 
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    selected: {
      scale: 1.01,
      boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.2), 0 4px 6px -2px rgba(79, 70, 229, 0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <motion.div 
      layoutId={`hotel-card-container-${hotel.id}`}
      className={`cursor-pointer relative overflow-hidden ${
        !useGridView ? 'w-full' : ''
      }`}
      onClick={onSelect}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate={isSelected ? "selected" : "rest"}
      variants={cardAnimation}
    >
      <Card 
        className={`h-full transition-all will-change-transform ${
          isSelected 
          ? 'border-indigo-400 dark:border-indigo-500 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40' 
          : 'hover:border-indigo-200 dark:hover:border-indigo-800'
        }`}
      >
        <div className={!useGridView ? `flex ${isMobile ? 'flex-col' : 'flex-row'} items-start` : ''}>
          <div className={!useGridView ? `${isMobile ? 'w-full' : 'w-1/4'}` : 'w-full'}>
            <HotelCardHeader hotel={hotel} useGridView={useGridView} />
          </div>
          
          <CardContent className={`space-y-3 ${
            useGridView 
              ? 'p-3 pt-0' 
              : `w-full ${isMobile ? 'p-2' : 'md:w-3/4 p-3 md:p-6'}`
          }`}>
            <HotelLocationInfo hotel={hotel} />
            <HotelCardAmenities amenities={hotel.amenities} />
            <HotelCardFooter 
              hotel={hotel} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default React.memo(HotelCard);
