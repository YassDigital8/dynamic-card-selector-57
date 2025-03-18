
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
  
  // Image animation variants
  const imageVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20
      }
    }
  };
  
  return (
    <CardHeader className={`pb-2 ${useGridView ? 'p-3' : `${isMobile ? 'p-2' : 'p-4'}`}`}>
      <div className={`${useGridView ? 'flex flex-col' : `flex ${isMobile ? 'flex-row' : 'flex-row'} items-center space-x-3`}`}>
        <motion.div 
          layoutId={`hotel-image-${hotel.id}`}
          className={`${
            useGridView 
              ? 'w-full h-32 mb-3 overflow-hidden rounded-lg' 
              : `${isMobile ? 'h-14 w-14' : 'h-16 w-16'} overflow-hidden rounded-lg flex-shrink-0`
          }`}
          variants={imageVariants}
          initial="rest"
          whileHover="hover"
        >
          <motion.img 
            src={getHotelAvatar(hotel.name)} 
            alt={hotel.name} 
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/300x150/indigo/white?text=Hotel';
            }}
          />
        </motion.div>
        <div className="flex-1">
          <motion.div layoutId={`hotel-title-${hotel.id}`}>
            <CardTitle className={`${useGridView ? 'text-base' : `${isMobile ? 'text-sm' : 'text-lg'}`} text-indigo-700 dark:text-indigo-300`}>
              {hotel.name}
            </CardTitle>
          </motion.div>
          <motion.div className="flex items-center mt-1 gap-2" layoutId={`hotel-badges-${hotel.id}`}>
            <Badge variant="outline" className={`uppercase ${isMobile ? 'text-[10px]' : 'text-xs'} bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium`}>
              {hotel.posKey}
            </Badge>
            {hotel.country && (
              <Badge variant="outline" className={`${isMobile ? 'text-[10px]' : 'text-xs'} bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium`}>
                {hotel.country}
              </Badge>
            )}
          </motion.div>
        </div>
      </div>
    </CardHeader>
  );
};

export default React.memo(HotelCardHeader);
