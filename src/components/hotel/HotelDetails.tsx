
import React from 'react';
import { 
  AirVent, 
  Bar, 
  Dumbbell, 
  Parking, 
  Spa, 
  Utensils, 
  Coffee, 
  Wifi, 
  SwimmingPool, 
  PawPrint, 
  BedPlus,
  Bed,
  Users,
  Heart,
  MapPin,
  Flag,
  Building
} from 'lucide-react';
import { format } from 'date-fns';
import { Hotel, HotelAmenities } from '@/models/HotelModel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HotelDetailsProps {
  hotel: Hotel;
  onEdit: () => void;
}

const AmenityDisplay = ({ 
  amenities 
}: { 
  amenities: HotelAmenities;
}) => {
  const amenityItems = [
    { key: 'airConditioning', label: 'Air Conditioning', icon: AirVent },
    { key: 'bar', label: 'Bar', icon: Bar },
    { key: 'gym', label: 'Gym', icon: Dumbbell },
    { key: 'parking', label: 'Parking', icon: Parking },
    { key: 'spa', label: 'Spa', icon: Spa },
    { key: 'restaurant', label: 'Restaurant', icon: Utensils },
    { key: 'breakfast', label: 'Breakfast', icon: Coffee },
    { key: 'wifi', label: 'WiFi', icon: Wifi },
    { key: 'swimmingPool', label: 'Swimming Pool', icon: SwimmingPool },
    { key: 'petsAllowed', label: 'Pets Allowed', icon: PawPrint },
    { key: 'extraBed', label: 'Extra Bed', icon: BedPlus }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {amenityItems.map(({ key, label, icon: Icon }) => {
        const isAvailable = amenities[key as keyof HotelAmenities];
        return (
          <TooltipProvider key={key}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`flex items-center gap-2 p-2 rounded-md ${isAvailable ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <Icon className="h-4 w-4" />
                  <span className="text-xs truncate">{label}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isAvailable ? `${label} available` : `${label} not available`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel, onEdit }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{hotel.name}</h2>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Flag className="mr-1 h-3.5 w-3.5" />
            <span>{hotel.country}</span>
            <span className="px-1">•</span>
            <span>{hotel.governorate}</span>
          </div>
        </div>
        <Button onClick={onEdit}>Edit Hotel</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium">Country</p>
              <p className="text-muted-foreground">{hotel.country}</p>
            </div>
            <div>
              <p className="font-medium">Governorate/State</p>
              <p className="text-muted-foreground">{hotel.governorate}</p>
            </div>
            <div>
              <p className="font-medium">Street Address</p>
              <p className="text-muted-foreground">{hotel.streetAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Amenities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AmenityDisplay amenities={hotel.amenities} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bed className="h-4 w-4" />
            Room Types
          </CardTitle>
          <CardDescription>
            {hotel.roomTypes.length} room types available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Adults</TableHead>
                  <TableHead>Children</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotel.roomTypes.map((roomType) => (
                  <TableRow key={roomType.id}>
                    <TableCell className="font-medium">{roomType.name}</TableCell>
                    <TableCell>{roomType.maxAdults}</TableCell>
                    <TableCell>{roomType.maxChildren}</TableCell>
                    <TableCell>{roomType.description || '-'}</TableCell>
                    <TableCell>{roomType.price ? `$${roomType.price.toFixed(2)}` : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Last updated: {format(new Date(hotel.updatedAt), 'PPP')}
        </CardFooter>
      </Card>
    </div>
  );
};

export default HotelDetails;
