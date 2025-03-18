
import React from 'react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import { Card, CardContent } from '@/components/ui/card';
import { 
  HotelCardHeader, 
  HotelLocationInfo, 
  HotelCardAmenities, 
  HotelCardFooter 
} from './card';
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
}) => {
  const isMobile = useIsMobile();

  // Enhanced card animation variants - modified to prevent disappearing
  const cardAnimation = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      y: 0,
      opacity: 1
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.15), 0 4px 6px -2px rgba(79, 70, 229, 0.1)",
      y: -4,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    },
    tap: { 
      scale: 0.98, 
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    selected: {
      scale: 1.01,
      boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.2), 0 4px 6px -2px rgba(79, 70, 229, 0.15)",
      opacity: 1, // Keep opacity at 1 to prevent disappearing
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  // List view styles - with consistent padding
  const cardStyles = `flex ${isMobile ? 'flex-col' : 'flex-row'} min-h-[80px]`;
  const contentStyles = `flex-1 space-y-2 py-3 px-4`;

  return (
    <motion.div 
      layoutId={`hotel-card-container-${hotel.id}`}
      className="cursor-pointer relative overflow-hidden w-full mb-2"
      onClick={onSelect}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate={isSelected ? "selected" : "rest"}
      variants={cardAnimation}
      // Added transition config to ensure smooth transitions without disappearing
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        opacity: { duration: 0.2 } // Faster opacity transition
      }}
    >
      <Card 
        className={`transition-all will-change-transform ${cardStyles} ${
          isSelected 
          ? 'border-indigo-400 dark:border-indigo-500 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40' 
          : 'hover:border-indigo-200 dark:hover:border-indigo-800'
        }`}
      >
        <HotelCardHeader hotel={hotel} useGridView={false} />
        
        <CardContent className={contentStyles}>
          <HotelLocationInfo hotel={hotel} />
          <HotelCardAmenities amenities={hotel.amenities} />
          <HotelCardFooter 
            hotel={hotel} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default React.memo(HotelCard);
