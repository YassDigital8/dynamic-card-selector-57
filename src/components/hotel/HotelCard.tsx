
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BedDouble, Bath, Utensils, Wifi, Car, Dog, Cigarette, Accessibility } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Hotel } from '@/models/HotelModel';

interface HotelCardProps {
  hotel: Hotel | null;
  isLoading?: boolean;
  isSelected?: boolean;
  onSelect?: (hotel: Hotel) => void;
  onEdit?: (hotel: Hotel) => void;
  onDelete?: (id: string) => void;
  useGridView?: boolean;
  disabled?: boolean;
  hideEditButton?: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({ 
  hotel, 
  isLoading,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  useGridView = false,
  disabled = false,
  hideEditButton = false
}) => {
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

  // Extract amenities from the hotel object into a simple string array for display
  let amenitiesList: string[] = [];
  if (hotel.amenities) {
    // Convert amenities object to a list of enabled amenities for display
    amenitiesList = Object.entries(hotel.amenities)
      .filter(([key, value]) => 
        typeof value === 'boolean' && 
        value === true && 
        !key.includes('Images')
      )
      .map(([key]) => {
        // Convert camelCase to readable format
        return key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase());
      });
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'bed double':
      case 'air conditioning':
        return <BedDouble className="h-4 w-4 mr-1" />;
      case 'bath':
      case 'bathtub':
        return <Bath className="h-4 w-4 mr-1" />;
      case 'restaurant':
      case 'utensils':
        return <Utensils className="h-4 w-4 mr-1" />;
      case 'wifi':
        return <Wifi className="h-4 w-4 mr-1" />;
      case 'parking':
      case 'car':
        return <Car className="h-4 w-4 mr-1" />;
      case 'pets allowed':
      case 'dog':
        return <Dog className="h-4 w-4 mr-1" />;
      case 'smoking rooms':
      case 'smoking':
      case 'cigarette':
        return <Cigarette className="h-4 w-4 mr-1" />;
      case 'wheelchair accessible':
      case 'accessibility':
        return <Accessibility className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const handleClick = () => {
    if (!disabled && onSelect) {
      onSelect(hotel);
    }
  };

  return (
    <Card 
      className={`shadow-md hover:shadow-lg transition-shadow duration-300 ${isSelected ? 'ring-2 ring-blue-500' : ''} ${disabled ? 'opacity-70' : 'cursor-pointer'}`}
      onClick={handleClick}
    >
      <CardContent className="p-4 space-y-2">
        <Link to={`/hotel/view/${hotel.id}`} className="hover:underline">
          <h3 className="text-lg font-semibold">{hotel.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          {hotel.streetAddress}, {hotel.governorate}, {hotel.country}
        </p>
        <div className="flex flex-wrap gap-1">
          {amenitiesList.slice(0, 5).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs flex items-center">
              {getAmenityIcon(amenity)}
              {amenity}
            </Badge>
          ))}
          {amenitiesList.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{amenitiesList.length - 5} more
            </Badge>
          )}
        </div>
        {hotel.posKey && (
          <div className="mt-2">
            <Badge variant="outline" className="text-[0.6rem]">POS: {hotel.posKey}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HotelCard;
