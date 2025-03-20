
import React from 'react';
import { motion } from 'framer-motion';
import { HotelAmenities } from '@/models/HotelModel';
import { amenityDisplayNames, hasAmenityImages } from './AmenityUtils';
import { staggerContainerVariants } from '../../animations/cardAnimations';
import AmenityCard from './AmenityCard';

interface AmenityGridProps {
  amenities: HotelAmenities;
  amenityEntries: [keyof HotelAmenities, boolean][];
  onViewImages: (amenity: string) => void;
}

const AmenityGrid: React.FC<AmenityGridProps> = ({ 
  amenities,
  amenityEntries,
  onViewImages
}) => {
  return (
    <motion.div 
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-3 gap-3"
    >
      {amenityEntries.map(([key, value]) => {
        // Check if this amenity has images
        const hasImages = hasAmenityImages(amenities, key as string);

        return (
          <AmenityCard
            key={key}
            amenityKey={key}
            displayName={amenityDisplayNames[key]}
            value={value}
            hasImages={hasImages}
            onViewImages={onViewImages}
          />
        );
      })}
    </motion.div>
  );
};

export default AmenityGrid;
