
import React from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { HotelAmenities } from '@/models/HotelModel';
import AmenityDisplay from './AmenityDisplay';

interface AmenitiesCardProps {
  amenities: HotelAmenities;
}

const AmenitiesCard: React.FC<AmenitiesCardProps> = ({ amenities }) => {
  // Spring configuration for natural animations
  const springConfig = {
    type: "spring" as const,
    stiffness: 280,
    damping: 24,
    mass: 0.9
  };
  
  return (
    <motion.div
      custom={1}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            ...springConfig,
            delay: 0.07 + (i * 0.05)
          }
        })
      }}
    >
      <Card className="border-blue-100 dark:border-blue-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-blue-100 dark:border-blue-900">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Heart className="h-5 w-5 text-pink-500" />
            </motion.div>
            Amenities
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <AmenityDisplay amenities={amenities} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AmenitiesCard;
