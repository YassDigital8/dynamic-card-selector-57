
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
  compact?: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  useGridView = false,
  compact = false
}) => {
  const isMobile = useIsMobile();

  // Animation variants - optimized to prevent disappearing during selection
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
      boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.2), 0 4px 6px -2px rgba(99, 102, 241, 0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  // Consistent card styles
  const cardStyles = `flex ${isMobile ? 'flex-col' : 'flex-row'} ${compact ? 'min-h-[120px]' : 'min-h-[160px]'}`;
  const contentStyles = `flex-1 space-y-${compact ? '1.5' : '3'} ${compact ? 'py-1.5 px-2' : 'py-3 px-4'}`;

  return (
    <motion.div 
      layoutId={`hotel-card-${hotel.id}`}
      className="cursor-pointer relative overflow-hidden w-full mb-3"
      onClick={onSelect}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate={isSelected ? "selected" : "rest"}
      variants={cardAnimation}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        layout: { duration: 0.2 }
      }}
    >
      <Card 
        className={`transition-all will-change-transform ${cardStyles} ${
          isSelected 
          ? 'border-blue-400 dark:border-blue-500 shadow-md bg-blue-50 dark:bg-blue-900/40' 
          : 'hover:border-blue-200 dark:hover:border-blue-800'
        }`}
      >
        <HotelCardHeader hotel={hotel} useGridView={useGridView} compact={compact} />
        
        <CardContent className={contentStyles}>
          <HotelLocationInfo hotel={hotel} compact={compact} />
          <HotelCardAmenities amenities={hotel.amenities} compact={compact} />
          <HotelCardFooter 
            hotel={hotel} 
            onEdit={onEdit} 
            onDelete={onDelete}
            compact={compact} 
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default React.memo(HotelCard);
