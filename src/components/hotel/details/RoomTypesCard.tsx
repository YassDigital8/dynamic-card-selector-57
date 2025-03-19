
import React from 'react';
import { motion } from 'framer-motion';
import { BedDouble, Users, Baby } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoomType } from '@/models/HotelModel';
import { RoomImagePreview } from '@/components/hotel/form/room-types';

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
              className="space-y-4"
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
                  className="p-4 rounded-lg border border-purple-100 dark:border-purple-900 bg-white dark:bg-slate-900"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {roomType.imageUrl && (
                      <div className="w-full md:w-1/3 flex-shrink-0">
                        <RoomImagePreview 
                          imageUrl={roomType.imageUrl}
                          onClick={() => {}} 
                          readOnly={true}
                        />
                      </div>
                    )}
                    <div className={`flex-1 ${!roomType.imageUrl ? 'w-full' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium text-purple-700 dark:text-purple-300 text-lg">{roomType.name}</div>
                          {roomType.description && (
                            <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">{roomType.description}</div>
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
                      <div className="flex items-center mt-3 space-x-4">
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
                  </div>
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

export default RoomTypesCard;
