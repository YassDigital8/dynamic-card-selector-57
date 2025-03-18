
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { HotelAmenities } from '@/models/HotelModel';

interface AmenityDisplayProps {
  amenities: HotelAmenities;
}

// This is our mapping of amenity keys to display names
const amenityDisplayNames: Record<keyof HotelAmenities, string> = {
  airConditioning: 'Air Conditioning',
  bar: 'Bar',
  gym: 'Gym',
  parking: 'Parking',
  spa: 'Spa',
  restaurant: 'Restaurant',
  breakfast: 'Breakfast',
  wifi: 'Wi-Fi',
  swimmingPool: 'Swimming Pool',
  petsAllowed: 'Pets Allowed',
  extraBed: 'Extra Bed'
};

const AmenityDisplay: React.FC<AmenityDisplayProps> = ({ amenities }) => {
  // Extract amenity keys and values
  const amenityEntries = Object.entries(amenities) as [keyof HotelAmenities, boolean][];

  // Configure staggered animation
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-3 gap-3"
    >
      {amenityEntries.map(([key, value]) => (
        <motion.div 
          key={key}
          variants={item}
          whileHover={{ 
            scale: 1.03,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10
            }
          }}
          className={`flex items-center p-2 rounded-md ${
            value 
              ? 'border border-green-100 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
              : 'border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/20 text-gray-500 dark:text-gray-400'
          }`}
        >
          <div className="mr-2">
            {value ? (
              <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
            ) : (
              <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            )}
          </div>
          <span className="text-sm font-medium truncate">
            {amenityDisplayNames[key]}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AmenityDisplay;
