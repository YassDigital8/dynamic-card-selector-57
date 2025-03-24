import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BedDouble, Bathtub, Restaurant, Wifi, Parking, Pet, Smoking, Wheelchair } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Hotel } from '@/models/HotelModel';

interface HotelCardProps {
  hotel: Hotel | null;
  isLoading?: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, isLoading }) => {
  if (isLoading || !hotel) {
    return (
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </CardContent>
      </Card>
    );
  }

  const {
    id,
    name,
    address,
    city,
    state,
    country,
    zip,
    phone,
    email,
    website,
    amenities,
    posKey
  } = hotel;

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'double bed':
        return <BedDouble className="h-4 w-4 mr-1" />;
      case 'bathtub':
        return <Bathtub className="h-4 w-4 mr-1" />;
      case 'restaurant':
        return <Restaurant className="h-4 w-4 mr-1" />;
      case 'wifi':
        return <Wifi className="h-4 w-4 mr-1" />;
      case 'parking':
        return <Parking className="h-4 w-4 mr-1" />;
      case 'pets allowed':
        return <Pet className="h-4 w-4 mr-1" />;
      case 'smoking rooms':
        return <Smoking className="h-4 w-4 mr-1" />;
      case 'wheelchair accessible':
        return <Wheelchair className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4 space-y-2">
        <Link to={`/hotel/view/${id}`} className="hover:underline">
          <h3 className="text-lg font-semibold">{name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          {address}, {city}, {state}, {country} {zip}
        </p>
        <div className="flex flex-wrap gap-1">
          {amenities && amenities.map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs flex items-center">
              {getAmenityIcon(amenity)}
              {amenity}
            </Badge>
          ))}
        </div>
        {posKey && (
          <div className="mt-2">
            <Badge variant="outline" className="text-[0.6rem]">POS: {posKey}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HotelCard;
