
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Image as ImageIcon, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { staggerItemVariants } from '../../animations/cardAnimations';
import { HotelAmenities } from '@/models/HotelModel';

interface AmenityCardProps {
  amenityKey: keyof HotelAmenities;
  displayName: string;
  value: boolean;
  hasImages: boolean;
  onViewImages: (amenity: string) => void;
  extraData?: {
    extraBedPrice?: number;
  };
}

const AmenityCard: React.FC<AmenityCardProps> = ({
  amenityKey,
  displayName,
  value,
  hasImages,
  onViewImages,
  extraData
}) => {
  return (
    <motion.div 
      key={amenityKey}
      variants={staggerItemVariants}
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
      <span className="text-sm font-medium truncate flex-grow">
        {displayName}
        {amenityKey === 'extraBed' && value && extraData?.extraBedPrice !== undefined && (
          <span className="ml-2 inline-flex items-center text-xs text-blue-600 dark:text-blue-400">
            <DollarSign className="h-3 w-3 mr-0.5" />
            {extraData.extraBedPrice}
          </span>
        )}
      </span>
      {hasImages && value && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0 ml-auto"
          onClick={() => onViewImages(amenityKey as string)}
        >
          <ImageIcon className="h-4 w-4 text-blue-500" />
        </Button>
      )}
    </motion.div>
  );
};

export default AmenityCard;
