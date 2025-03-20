
import React from 'react';
import { motion } from 'framer-motion';
import { TabsContent } from '@/components/ui/tabs';
import { AmenityImage } from '@/models/HotelModel';
import { staggerContainerVariants } from '../../animations/cardAnimations';
import GalleryCarousel from './GalleryCarousel';

interface AmenityCategoryProps {
  category: string;
  images: AmenityImage[];
}

const AmenityCategory: React.FC<AmenityCategoryProps> = ({ category, images }) => {
  return (
    <TabsContent key={category} value={category} className="mt-4">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <GalleryCarousel 
          images={images} 
          category={category} 
        />
      </motion.div>
    </TabsContent>
  );
};

export default AmenityCategory;
