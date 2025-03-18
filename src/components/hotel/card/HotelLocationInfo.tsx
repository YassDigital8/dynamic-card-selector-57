
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
        layoutId={`hotel-country-${hotel.id}`}
        className="flex items-center text-sm text-muted-foreground"
      >
        <Flag className="mr-1 h-3.5 w-3.5 text-indigo-500" />
        <span>{hotel.country}</span>
        <span className="px-1">•</span>
        <span>{hotel.governorate}</span>
      </motion.div>
      
      <motion.div 
        layoutId={`hotel-address-${hotel.id}`}
        className="flex items-center text-sm text-muted-foreground"
      >
        <MapPin className="mr-1 h-3.5 w-3.5 text-pink-500" />
        <span className="truncate">{hotel.streetAddress}</span>
      </motion.div>
    </>
  );
};

export default React.memo(HotelLocationInfo);
