
import React from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';

interface HotelLocationInfoProps {
  hotel: Hotel;
}

const HotelLocationInfo: React.FC<HotelLocationInfoProps> = ({ hotel }) => {
  return (
    <div className="space-y-1.5">
      <motion.div 
        className="flex items-center text-sm sm:text-base text-muted-foreground"
        layout
        layoutId={`hotel-location-${hotel.id}`}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25, 
          duration: 0.2 
        }}
      >
        <div className="flex items-center w-full">
          <MapPin className="mr-1.5 h-4 w-4 text-rose-500 flex-shrink-0" />
          <span className="truncate">{hotel.governorate}, {hotel.streetAddress}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(HotelLocationInfo);
