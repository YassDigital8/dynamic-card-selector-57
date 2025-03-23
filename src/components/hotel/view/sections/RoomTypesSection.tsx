
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Hotel } from '@/models/HotelModel';

interface RoomTypesSectionProps {
  hotel: Hotel;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({ hotel }) => {
  return (
    <Card className="border-0 shadow-none mb-4">
      <CardContent className="pt-4">
        {hotel.roomTypes && hotel.roomTypes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotel.roomTypes.map((room) => (
              <Card key={room.id} className="overflow-hidden">
                {(room.imageUrl || (room.images && room.images.length > 0)) && (
                  <div className="h-40 overflow-hidden">
                    {room.images && room.images.length > 0 ? (
                      <Carousel>
                        <CarouselContent>
                          {room.images.map((image, idx) => (
                            <CarouselItem key={idx}>
                              <img 
                                src={image} 
                                alt={`${room.name} image ${idx + 1}`} 
                                className="w-full h-40 object-cover"
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        {room.images.length > 1 && (
                          <>
                            <CarouselPrevious />
                            <CarouselNext />
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
                  </div>
                )}
                <CardContent className="p-4">
                  <h3 className="font-semibold">{room.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Max: {room.maxAdults} adults, {room.maxChildren} children
                  </p>
                  {room.price && (
                    <p className="mt-2 font-medium">Price: ${room.price}</p>
                  )}
                  {room.description && (
                    <p className="mt-2 text-sm">{room.description}</p>
                  )}
                  {room.seasonalPrices && room.seasonalPrices.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium">Seasonal Prices:</h4>
                      <ul className="text-xs space-y-1 mt-1">
                        {room.seasonalPrices.map((season) => (
                          <li key={season.id} className="flex justify-between">
                            <span>{season.seasonName}</span>
                            <span className="font-medium">${season.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No room types available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomTypesSection;
