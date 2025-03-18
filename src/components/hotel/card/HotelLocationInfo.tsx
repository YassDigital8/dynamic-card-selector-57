
import React from 'react';
import { Flag, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';

interface HotelLocationInfoProps {
  hotel: Hotel;
}

const HotelLocationInfo: React.FC<HotelLocationInfoProps> = ({ hotel }) => {
  return (
    <>
      <motion.div 
        className="flex items-center text-sm sm:text-base text-muted-foreground mb-1"
        layout
        layoutId={`hotel-country-${hotel.id}`}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25, 
          duration: 0.2 
        }}
      >
        <Flag className="mr-1.5 h-4 w-4 text-indigo-500" />
        <span className="font-medium">{hotel.country}</span>
        <span className="px-1.5">•</span>
        <span>{hotel.governorate}</span>
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
