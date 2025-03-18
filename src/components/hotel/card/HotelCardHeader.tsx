
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
  
  // Enhanced image animation variants
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
    <CardHeader className="p-1 pb-0 flex-shrink-0">
      <div className="flex flex-row items-center space-x-2">
        <motion.div 
          layoutId={`hotel-image-${hotel.id}`}
          className="h-8 w-8 overflow-hidden rounded-lg flex-shrink-0"
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
        <div className="flex-1 min-w-0">
          <motion.div layoutId={`hotel-title-${hotel.id}`}>
            <CardTitle className="text-xs text-indigo-700 dark:text-indigo-300 truncate">
              {hotel.name}
            </CardTitle>
          </motion.div>
          <motion.div className="flex items-center mt-0.5 gap-1 flex-wrap" layoutId={`hotel-badges-${hotel.id}`}>
            <Badge variant="outline" className="uppercase text-[8px] px-1 py-0 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium">
              {hotel.posKey}
            </Badge>
            {hotel.country && (
              <Badge variant="outline" className="text-[8px] px-1 py-0 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium">
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
