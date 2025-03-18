
import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import { format } from 'date-fns';

interface HotelLocationInfoProps {
  hotel: Hotel;
}

const HotelLocationInfo: React.FC<HotelLocationInfoProps> = ({ hotel }) => {
  const formattedDate = format(new Date(hotel.createdAt), 'MMM d, yyyy');
  
  return (
    <div className="mt-2">
      <motion.div 
        className="flex items-center justify-between text-sm sm:text-base text-muted-foreground"
        layout
        layoutId={`hotel-location-${hotel.id}`}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25, 
          duration: 0.2 
        }}
      >
        <div className="flex items-center">
          <MapPin className="mr-1.5 h-4 w-4 text-pink-500 flex-shrink-0" />
          <span className="truncate">{hotel.streetAddress}</span>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="mr-1 h-3.5 w-3.5 text-indigo-400" />
          <span>{formattedDate}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(HotelLocationInfo);
