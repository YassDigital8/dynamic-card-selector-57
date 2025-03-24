
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Hotel } from '@/models/HotelModel';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoomTypesSectionProps {
  hotel: Hotel;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({ hotel }) => {
  return (
    <Card className="border-0 shadow-none mb-4">
      <CardContent className="pt-4">
        {hotel.roomTypes && hotel.roomTypes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotel.roomTypes.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-all bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900">
                  {(room.imageUrl || (room.images && room.images.length > 0)) && (
                    <div className="h-48 overflow-hidden relative">
                      {room.images && room.images.length > 0 ? (
                        <Carousel className="h-full">
                          <CarouselContent className="h-full">
                            {room.images.map((image, idx) => (
                              <CarouselItem key={idx} className="h-full">
                                <div className="h-full w-full">
                                  <img 
                                    src={image} 
                                    alt={`${room.name} image ${idx + 1}`} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          {room.images.length > 1 && (
                            <>
                              <CarouselPrevious className="left-2 h-8 w-8" />
                              <CarouselNext className="right-2 h-8 w-8" />
                            </>
                          )}
                        </Carousel>
                      ) : (
                        <img 
                          src={room.imageUrl} 
                          alt={room.name} 
                          className="w-full h-full object-cover"
                        />
                      )}
                      
                      {/* Overlay badge for number of people */}
                      <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{room.maxAdults} adults, {room.maxChildren} children</span>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300">{room.name}</h3>
                      {room.price && (
                        <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 flex items-center">
                          <DollarSign className="h-3 w-3 mr-0.5" />
                          {room.price}
                        </Badge>
                      )}
                    </div>
                    
                    {room.description && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{room.description}</p>
                    )}
                    
                    {room.seasonalPrices && room.seasonalPrices.length > 0 && (
                      <div className="mt-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-md">
                        <h4 className="text-sm font-medium flex items-center text-indigo-700 dark:text-indigo-300 mb-2">
                          <CalendarDays className="h-3.5 w-3.5 mr-1" />
                          Seasonal Pricing
                        </h4>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                          {room.seasonalPrices.map((season) => (
                            <div key={season.id} className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">{season.seasonName}</span>
                              <span className="font-medium text-indigo-700 dark:text-indigo-300">${season.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg text-center">
            <p className="text-gray-500 dark:text-gray-400">No room types available for this hotel.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomTypesSection;
