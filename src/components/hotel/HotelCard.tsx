
import React, { useMemo, memo } from 'react';
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
  useGridView?: boolean; // Keep for backward compatibility
  disabled?: boolean;
  hideEditButton?: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  useGridView = true, // Default to true, but keep prop for backward compatibility
  disabled = false,
  hideEditButton = false
}) => {
  const isMobile = useIsMobile();
  
  const cardAnimation = useMemo(() => ({
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      y: 0
    },
    hover: { 
      scale: disabled ? 1 : 1.03,
      boxShadow: disabled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" : "0 10px 15px -3px rgba(79, 70, 229, 0.15), 0 4px 6px -2px rgba(79, 70, 229, 0.1)",
      y: disabled ? 0 : -4,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    },
    tap: { 
      scale: disabled ? 1 : 0.98, 
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
  }), [disabled]);

  const handleCardClick = () => {
    if (!disabled) {
      onSelect();
    }
  };

  // Always use grid view height
  const cardHeight = "h-full";

  return (
    <motion.div 
      layoutId={`hotel-card-${hotel.id}`}
      className={`relative overflow-hidden w-full ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={handleCardClick}
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
        className={`transition-all will-change-transform flex flex-col ${cardHeight} ${
          isSelected 
          ? 'border-indigo-400 dark:border-indigo-500 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40' 
          : 'hover:border-indigo-200 dark:hover:border-indigo-800 border-gray-200'
        } ${disabled ? 'opacity-70' : 'border border-gray-200 dark:border-gray-700'} overflow-hidden`}
        style={{ borderRadius: '0.75rem' }}
      >
        <HotelCardHeader hotel={hotel} useGridView={true} />
        
        <CardContent className="flex-1 flex flex-col justify-between p-3 pb-0">
          <div className="space-y-1.5">
            <HotelCardAmenities amenities={hotel.amenities} />
          </div>
          
          <div className="mt-auto">
            <HotelCardFooter 
              hotel={hotel} 
              onSelect={onSelect} 
              onEdit={onEdit} 
              onDelete={onDelete}
              isEditing={disabled}
              disabled={disabled}
              hideEditButton={hideEditButton}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default memo(HotelCard);
