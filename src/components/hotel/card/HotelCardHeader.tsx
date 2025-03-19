
import React from 'react';
import { motion } from 'framer-motion';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Hotel } from '@/models/HotelModel';
import { getHotelAvatar } from './HotelCardUtils';
import { Flag } from 'lucide-react';

interface HotelCardHeaderProps {
  hotel: Hotel;
  useGridView: boolean;
}

const HotelCardHeader: React.FC<HotelCardHeaderProps> = ({ hotel, useGridView }) => {
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
    <CardHeader className="p-3 pb-2 flex-shrink-0">
      <div className="flex flex-row items-start space-x-3">
        <motion.div 
          layoutId={`hotel-image-${hotel.id}`}
          className="h-16 w-16 overflow-hidden rounded-lg flex-shrink-0"
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
              e.currentTarget.src = 'https://placehold.co/300x150/6366f1/white?text=Hotel';
            }}
          />
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <motion.div layoutId={`hotel-title-${hotel.id}`} className="flex-1">
              <CardTitle className="text-sm sm:text-base text-blue-700 dark:text-blue-300 truncate font-semibold">
                {hotel.name}
              </CardTitle>
            </motion.div>
            
            <motion.div layoutId={`hotel-flag-${hotel.id}`} className="flex-shrink-0">
              <div className="flex items-center">
                <Flag className="mr-1 h-3.5 w-3.5 text-blue-500" />
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{hotel.posKey}</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div className="mt-1 text-xs text-gray-600 dark:text-gray-400 flex items-center" layoutId={`hotel-country-${hotel.id}`}>
            <span className="font-medium">{hotel.country}</span>
          </motion.div>
        </div>
      </div>
    </CardHeader>
  );
};

export default React.memo(HotelCardHeader);
