
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { HotelAmenities } from '@/models/HotelModel';
import AmenityIcon from '../AmenityIcon';

interface HotelCardAmenitiesProps {
  amenities: HotelAmenities;
}

const HotelCardAmenities: React.FC<HotelCardAmenitiesProps> = ({ amenities }) => {
  // Only consider boolean amenity properties (not image arrays)
  const amenityKeys = (Object.keys(amenities) as Array<keyof HotelAmenities>)
    .filter(key => !key.toString().includes('Images') && typeof amenities[key] === 'boolean' && amenities[key]);
  
  const displayedAmenities = amenityKeys.slice(0, 6);
  const hasMoreAmenities = amenityKeys.length > 6;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay: 0.1, 
          type: "spring", 
          stiffness: 250, 
          damping: 20 
        } 
      }}
      className="flex flex-wrap gap-2 bg-blue-50/30 dark:bg-blue-900/10 p-2 rounded-md border border-blue-100/50 dark:border-blue-900/30"
    >
      {displayedAmenities.map((amenity, index) => (
        <motion.div
          key={amenity}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: 0.05 * index, 
              type: "spring", 
              stiffness: 250, 
              damping: 20 
            } 
          }}
        >
          <AmenityIcon key={amenity} amenity={amenity} value={true} />
        </motion.div>
      ))}
      
      {hasMoreAmenities && (
        <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium text-xs">
          +{amenityKeys.length - 6} more
        </Badge>
      )}
    </motion.div>
  );
};

export default React.memo(HotelCardAmenities);
