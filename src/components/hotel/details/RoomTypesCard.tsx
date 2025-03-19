
import React from 'react';
import { motion } from 'framer-motion';
import { BedDouble, Users, Baby } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoomType } from '@/models/HotelModel';
import RoomImagesCarousel from '../form/room-types/RoomImagesCarousel';

interface RoomTypesCardProps {
  roomTypes: RoomType[];
  updatedAt: Date;
}

const RoomTypesCard: React.FC<RoomTypesCardProps> = ({ roomTypes, updatedAt }) => {
  // Spring configuration for natural animations
  const springConfig = {
    type: "spring" as const,
    stiffness: 280,
    damping: 20
  };

  // Smooth staggered animation for room type entries
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: springConfig
    }
  };

  return (
    <motion.div
      custom={2}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            ...springConfig,
            delay: 0.1 + (i * 0.05)
          }
        })
      }}
    >
      <Card className="border-purple-100 dark:border-purple-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-purple-900/40 border-b border-purple-100 dark:border-purple-900">
          <CardTitle className="text-lg flex items-center gap-2 text-purple-700 dark:text-purple-300">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <BedDouble className="h-5 w-5 text-purple-500" />
            </motion.div>
            Room Types
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {roomTypes.length === 0 ? (
            <div className="text-center p-6 text-gray-500 dark:text-gray-400">
              No room types have been added yet.
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {roomTypes.map((roomType) => (
                <motion.div
                  key={roomType.id}
                  variants={item}
                  whileHover={{ 
                    scale: 1.01,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }
                  }}
                  className="rounded-lg border border-purple-100 dark:border-purple-900 bg-white dark:bg-slate-900 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-purple-700 dark:text-purple-300 text-lg">{roomType.name}</h3>
                        {roomType.description && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{roomType.description}</p>
                        )}
                      </div>
                      {roomType.price && (
                        <div className="text-right">
                          <div className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-semibold">
                            ${roomType.price.toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-2 mb-3 space-x-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Users className="h-4 w-4 mr-1 text-purple-500" />
                        <span className="text-sm">{roomType.maxAdults} Adults</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Baby className="h-4 w-4 mr-1 text-purple-500" />
                        <span className="text-sm">{roomType.maxChildren} Children</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Images carousel section - display if the roomType has images */}
                  {hasImages(roomType) && (
                    <div className="border-t border-purple-100 dark:border-purple-900/50">
                      <RoomImagesCarousel 
                        images={getAllImages(roomType)}
                        className="w-full"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div 
                variants={item}
                className="text-xs text-right text-gray-500 dark:text-gray-400 mt-2"
              >
                Last updated: {format(new Date(updatedAt), 'PPP')}
              </motion.div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Helper functions to handle image fields
function hasImages(roomType: RoomType): boolean {
  return Boolean(
    (roomType.images && roomType.images.length > 0) || 
    roomType.imageUrl
  );
}

function getAllImages(roomType: RoomType): string[] {
  const images: string[] = [];
  
  // Add main image first if exists
  if (roomType.imageUrl) {
    images.push(roomType.imageUrl);
  }
  
  // Add other images if they exist and aren't duplicates of the main image
  if (roomType.images && roomType.images.length > 0) {
    roomType.images.forEach(img => {
      if (img !== roomType.imageUrl) {
        images.push(img);
      }
    });
  }
  
  return images;
}

export default RoomTypesCard;
