
import React from 'react';
import { motion } from 'framer-motion';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Hotel } from '@/models/HotelModel';
import { getHotelAvatar } from './HotelCardUtils';
import { Flag, MapPin } from 'lucide-react';
import StarRating from './StarRating';

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
  
  // For grid view, make the image larger and full width
  if (useGridView) {
    return (
      <div className="relative w-full">
        <motion.div 
          layoutId={`hotel-image-container-${hotel.id}`}
          className="w-full h-44 overflow-hidden"
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
              e.currentTarget.src = 'https://placehold.co/600x400/indigo/white?text=Hotel';
            }}
          />
        </motion.div>
        
        <div className="absolute top-0 left-0 m-2">
          <div className="flex items-center gap-1 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
            <Flag className="h-3 w-3" />
            <span>{hotel.posKey}</span>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <motion.div layoutId={`hotel-title-${hotel.id}`} className="flex items-center">
            <CardTitle className="text-sm sm:text-base text-white truncate font-semibold mr-2">
              {hotel.name}
            </CardTitle>
          </motion.div>
          
          {/* Display star rating if available */}
          {typeof hotel.rating === 'number' && hotel.rating > 0 && (
            <motion.div layoutId={`hotel-rating-${hotel.id}`} className="mt-1">
              <StarRating rating={hotel.rating} size="sm" />
            </motion.div>
          )}
          
          <motion.div className="mt-1 text-xs text-gray-300 flex items-center" layoutId={`hotel-country-${hotel.id}`}>
            <MapPin className="h-3 w-3 mr-1" />
            {hotel.country}
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Original design for list view
  return (
    <CardHeader className="p-3 pb-0 flex-shrink-0">
      <div className="flex flex-row items-start gap-3">
        <motion.div 
          layoutId={`hotel-image-${hotel.id}`}
          className="h-[70px] w-[70px] overflow-hidden rounded-lg flex-shrink-0"
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
          <div className="flex flex-col">
            <motion.div layoutId={`hotel-title-${hotel.id}`} className="flex items-center gap-2">
              <CardTitle className="text-sm sm:text-base text-indigo-700 dark:text-indigo-300 truncate font-semibold">
                {hotel.name}
              </CardTitle>
              
              <motion.div layoutId={`hotel-flag-${hotel.id}`} className="flex-shrink-0">
                <div className="flex items-center">
                  <Flag className="h-3.5 w-3.5 text-indigo-500" />
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 ml-1">{hotel.posKey}</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Display star rating if available */}
            {typeof hotel.rating === 'number' && hotel.rating > 0 && (
              <motion.div layoutId={`hotel-rating-${hotel.id}`} className="mt-1">
                <StarRating rating={hotel.rating} size="sm" />
              </motion.div>
            )}
            
            <motion.div className="mt-1 text-xs text-gray-600 dark:text-gray-400 flex items-center" layoutId={`hotel-country-${hotel.id}`}>
              <MapPin className="h-3 w-3 mr-1" />
              {hotel.country}
            </motion.div>
          </div>
        </div>
      </div>
    </CardHeader>
  );
};

export default React.memo(HotelCardHeader);
