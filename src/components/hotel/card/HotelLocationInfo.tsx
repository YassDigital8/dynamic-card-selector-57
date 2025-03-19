
import React from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';

interface HotelLocationInfoProps {
  hotel: Hotel;
  compact?: boolean;
}

const HotelLocationInfo: React.FC<HotelLocationInfoProps> = ({ hotel, compact = false }) => {
  return (
    <motion.div 
      className={`flex items-center text-xs ${compact ? '' : 'text-sm sm:text-base'} text-muted-foreground`}
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
        <MapPin className="mr-1 h-3.5 w-3.5 text-rose-500 flex-shrink-0" />
        <span className="truncate">{hotel.governorate}, {hotel.streetAddress}</span>
      </div>
    </motion.div>
  );
};

export default React.memo(HotelLocationInfo);
