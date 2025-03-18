
import React from 'react';
import { motion } from 'framer-motion';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Hotel } from '@/models/HotelModel';
import { getHotelAvatar } from './HotelCardUtils';
import { useIsMobile } from '@/hooks/use-mobile';

interface HotelCardHeaderProps {
  hotel: Hotel;
  useGridView: boolean;
}

const HotelCardHeader: React.FC<HotelCardHeaderProps> = ({ hotel, useGridView }) => {
  const isMobile = useIsMobile();
  
  return (
    <CardHeader className={`pb-2 ${useGridView ? 'p-3' : `${isMobile ? 'p-2' : 'p-4'}`}`}>
      <div className={`${useGridView ? 'flex flex-col' : `flex ${isMobile ? 'flex-row' : 'flex-row md:flex-col'} items-center md:items-start space-x-3 md:space-x-0`}`}>
        <motion.div 
          layoutId={`hotel-image-${hotel.id}`}
          className={`${
            useGridView 
              ? 'w-full h-32 mb-3 overflow-hidden rounded-lg' 
              : `${isMobile ? 'h-12 w-12' : 'h-16 w-16 md:w-full md:h-32 md:mb-3'} overflow-hidden rounded-lg`
          }`}
        >
          <img 
            src={getHotelAvatar(hotel.name)} 
            alt={hotel.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/300x150/indigo/white?text=Hotel';
            }}
          />
        </motion.div>
        <div className={`flex-1 ${isMobile ? 'ml-2' : 'md:mt-2'}`}>
          <motion.div layoutId={`hotel-title-${hotel.id}`}>
            <CardTitle className={`${useGridView ? 'text-base' : `${isMobile ? 'text-sm' : 'text-lg'}`} text-indigo-700 dark:text-indigo-300`}>
              {hotel.name}
            </CardTitle>
          </motion.div>
          <motion.div layoutId={`hotel-badge-${hotel.id}`}>
            <Badge variant="outline" className={`uppercase ${isMobile ? 'text-[10px]' : 'text-xs'} bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium mt-1`}>
              {hotel.posKey}
            </Badge>
          </motion.div>
        </div>
      </div>
    </CardHeader>
  );
};

export default React.memo(HotelCardHeader);
