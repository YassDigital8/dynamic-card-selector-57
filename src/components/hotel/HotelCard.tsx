
import React from 'react';
import { motion } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import { Card, CardContent } from '@/components/ui/card';
import { 
  HotelCardHeader, 
  HotelLocationInfo, 
  HotelCardAmenities, 
  HotelCardFooter 
} from './card';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious, 
  CarouselIndicators 
} from "@/components/ui/carousel";
import { getHotelAvatar } from './card/HotelCardUtils';

interface HotelCardProps {
  hotel: Hotel;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  useGridView?: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  useGridView = false
}) => {
  const isMobile = useIsMobile();

  // Enhanced card animation variants
  const cardAnimation = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      y: 0
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.15), 0 4px 6px -2px rgba(79, 70, 229, 0.1)",
      y: -4,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    },
    tap: { 
      scale: 0.98, 
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    selected: {
      scale: 1.01,
      boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.2), 0 4px 6px -2px rgba(79, 70, 229, 0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  // Sample images for demonstration - in a real app, these would come from your API
  const hotelImages = [
    getHotelAvatar(hotel.name),
    getHotelAvatar(hotel.name + "1"),
    getHotelAvatar(hotel.name + "2"),
  ];

  // Conditional styles for list vs grid view
  const cardStyles = useGridView
    ? 'h-full'
    : `flex ${isMobile ? 'flex-col' : 'flex-row'} h-full`;

  const contentStyles = useGridView
    ? 'space-y-3 p-3 pt-0'
    : `flex-1 space-y-2 ${isMobile ? 'p-2' : 'p-4'}`;

  // Grid view has a carousel for images, list view has a single image
  const renderImages = () => {
    if (useGridView) {
      return (
        <Carousel className="w-full h-32 sm:h-40" aria-label={`${hotel.name} image gallery`}>
          <CarouselContent>
            {hotelImages.map((image, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="h-full w-full overflow-hidden rounded-lg">
                  <img 
                    src={image} 
                    alt={`${hotel.name} - image ${index + 1}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/300x150/indigo/white?text=Hotel';
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 h-8 w-8" />
          <CarouselNext className="right-1 h-8 w-8" />
          <CarouselIndicators className="absolute bottom-1 left-0 right-0" variant="dots" />
        </Carousel>
      );
    }
    
    // For list view, just show one image
    return null; // The image is handled in HotelCardHeader for list view
  };

  return (
    <motion.div 
      layoutId={`hotel-card-container-${hotel.id}`}
      className="cursor-pointer relative overflow-hidden w-full"
      onClick={onSelect}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate={isSelected ? "selected" : "rest"}
      variants={cardAnimation}
    >
      <Card 
        className={`transition-all will-change-transform ${cardStyles} ${
          isSelected 
          ? 'border-indigo-400 dark:border-indigo-500 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40' 
          : 'hover:border-indigo-200 dark:hover:border-indigo-800'
        }`}
      >
        {useGridView && renderImages()}
        <HotelCardHeader hotel={hotel} useGridView={useGridView} />
        
        <CardContent className={contentStyles}>
          <HotelLocationInfo hotel={hotel} />
          <HotelCardAmenities amenities={hotel.amenities} />
          <HotelCardFooter 
            hotel={hotel} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default React.memo(HotelCard);
