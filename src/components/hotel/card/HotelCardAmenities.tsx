
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { HotelAmenities } from '@/models/HotelModel';
import AmenityIcon from '../AmenityIcon';

interface HotelCardAmenitiesProps {
  amenities: HotelAmenities;
  compact?: boolean;
}

const HotelCardAmenities: React.FC<HotelCardAmenitiesProps> = ({ amenities, compact = false }) => {
  const amenityKeys = (Object.keys(amenities) as Array<keyof HotelAmenities>)
    .filter(amenity => amenities[amenity]);
  
  // Display fewer amenities in compact mode
  const displayCount = compact ? 3 : 6;
  const displayedAmenities = amenityKeys.slice(0, displayCount);
  const hasMoreAmenities = amenityKeys.length > displayCount;
  
  if (amenityKeys.length === 0) return null;
  
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
      className={`flex flex-wrap gap-1 ${
        compact ? 'py-1 px-1.5' : 'p-2.5'
      } bg-blue-50/50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-900/50`}
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
          <AmenityIcon key={amenity} amenity={amenity} value={amenities[amenity]} compact={compact} />
        </motion.div>
      ))}
      
      {hasMoreAmenities && (
        <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium text-[10px]">
          +{amenityKeys.length - displayCount}
        </Badge>
      )}
    </motion.div>
  );
};

export default React.memo(HotelCardAmenities);
