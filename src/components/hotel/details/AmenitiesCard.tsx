
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
            delay: i * 0.1,
            duration: 0.25,
            ease: [0.25, 0.1, 0.25, 1.0]
          }
        })
      }}
    >
      <Card className="border-blue-100 dark:border-blue-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-blue-100 dark:border-blue-900">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Heart className="h-5 w-5 text-pink-500" />
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
