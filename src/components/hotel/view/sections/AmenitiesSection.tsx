
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Hotel, AmenityImage } from '@/models/HotelModel';
import { AmenityListItemType } from '@/components/hotel/form/amenities/types';
import { amenitiesList } from '@/components/hotel/form/amenities/constants';
import { cn } from '@/lib/utils';

interface AmenitiesSectionProps {
  hotel: Hotel;
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ hotel }) => {
  const renderAmenityImages = (amenityKey: string) => {
    const imagesKey = `${amenityKey}Images` as keyof typeof hotel.amenities;
    const images = hotel.amenities[imagesKey] as any[] || [];
    
    if (!images || images.length === 0) return null;
    
    return (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="aspect-square overflow-hidden rounded-md">
                  <img
                    src={image.url}
                    alt={image.description || `Amenity image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  };

  return (
    <Card className="border-0 shadow-none mb-4">
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenitiesList.map((amenity: AmenityListItemType) => {
            const amenityKey = amenity.name.split('.')[1] as keyof typeof hotel.amenities;
            const hasAmenity = hotel.amenities[amenityKey];
            const hasImages = amenity.hasImages && hasAmenity;
            
            if (!hasAmenity) return null;
            
            return (
              <Card key={amenity.name} className={cn(
                "overflow-hidden",
                hasAmenity ? "bg-indigo-50 dark:bg-indigo-900/20" : "opacity-50"
              )}>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <amenity.icon className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="font-medium">{amenity.label}</h3>
                  </div>
                </CardHeader>
                {hasImages && (
                  <CardContent>
                    {renderAmenityImages(amenityKey)}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AmenitiesSection;
