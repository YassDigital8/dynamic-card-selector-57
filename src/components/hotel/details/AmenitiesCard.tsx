
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleSlash } from 'lucide-react';
import { HotelAmenities } from '@/models/HotelModel';
import AmenityDisplay from './AmenityDisplay';

interface AmenitiesCardProps {
  amenities: HotelAmenities;
  extraBedPrice?: number;
}

const AmenitiesCard: React.FC<AmenitiesCardProps> = ({ amenities, extraBedPrice }) => {
  // Check if any amenities are true
  const hasAmenities = Object.entries(amenities)
    .filter(([key]) => !key.includes('Images'))
    .some(([_, value]) => value === true);

  // If the extra bed amenity is enabled, log the price
  React.useEffect(() => {
    if (amenities.extraBed) {
      console.log('Extra bed is enabled with price:', extraBedPrice);
    }
  }, [amenities.extraBed, extraBedPrice]);

  return (
    <Card className="bg-white dark:bg-gray-900 overflow-hidden shadow-sm border-gray-200 dark:border-gray-800 rounded-lg">
      <CardHeader className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
        <CardTitle className="flex items-center font-medium text-blue-700 dark:text-blue-300">
          Amenities & Services
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {hasAmenities ? (
          <AmenityDisplay amenities={amenities} extraBedPrice={extraBedPrice} />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-8">
            <CircleSlash className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-2" />
            <p className="text-center">No amenities available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AmenitiesCard;
