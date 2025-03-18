
import React from 'react';
import { Flag, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import { Badge } from '@/components/ui/badge';

interface HotelLocationInfoProps {
  hotel: Hotel;
}

const HotelLocationInfo: React.FC<HotelLocationInfoProps> = ({ hotel }) => {
  return (
    <>
      <motion.div 
        className="flex items-center text-sm sm:text-base text-muted-foreground mb-1"
        layout
        layoutId={`hotel-location-${hotel.id}`}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25, 
          duration: 0.2 
        }}
      >
        <Flag className="mr-1.5 h-4 w-4 text-indigo-500" />
        <span>{hotel.governorate}</span>
        <span className="flex px-1.5 items-center">•</span>
        <Badge variant="outline" className="uppercase text-xs px-1.5 py-0 bg-indigo-50/50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium border-indigo-200/50 dark:border-indigo-800/50">
          {hotel.posKey}
        </Badge>
      </motion.div>
      
      <motion.div 
        className="flex items-center text-sm text-muted-foreground"
        layout
        layoutId={`hotel-address-${hotel.id}`}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25, 
          duration: 0.2 
        }}
      >
        <MapPin className="mr-1.5 h-4 w-4 text-pink-500" />
        <span className="truncate">{hotel.streetAddress}</span>
      </motion.div>
    </>
  );
};

export default React.memo(HotelLocationInfo);
