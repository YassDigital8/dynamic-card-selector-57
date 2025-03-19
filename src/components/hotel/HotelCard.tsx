
import React from 'react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import { Card, CardContent } from '@/components/ui/card';
import { 
  HotelCardHeader, 
  HotelLocationInfo, 
  HotelCardAmenities, 
  HotelCardFooter,
  getHotelAvatar
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
      layoutId={`hotel-card-${hotel.id}`}
      className="cursor-pointer relative overflow-hidden w-full mb-2"
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
        className={`transition-all will-change-transform flex flex-col min-h-[160px] ${
          isSelected 
          ? 'border-indigo-400 dark:border-indigo-500 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40' 
          : 'hover:border-indigo-200 dark:hover:border-indigo-800'
        }`}
      >
        <HotelCardHeader hotel={hotel} useGridView={false} />
        
        <CardContent className="flex-1 space-y-3 py-2 px-3">
          <div className="space-y-3">
            <HotelLocationInfo hotel={hotel} />
            <HotelCardAmenities amenities={hotel.amenities} />
          </div>
          
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
