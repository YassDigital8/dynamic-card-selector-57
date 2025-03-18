
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

  return (
    <motion.div 
      layoutId={`hotel-card-container-${hotel.id}`}
      className={`cursor-pointer relative overflow-hidden ${
        !useGridView ? 'w-full' : ''
      }`}
      onClick={onSelect}
      {...containerAnimation}
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
