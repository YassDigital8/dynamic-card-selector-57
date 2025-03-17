
import React from 'react';
import { 
  AirVent, 
  Utensils, 
  Coffee, 
  Wifi, 
  PawPrint, 
  Bed,
  Users,
  Heart,
  MapPin,
  Flag,
  Building,
  Dumbbell,
  GlassWater,
  Hotel as HotelIcon,
  Bath,
  BedDouble,
  Waves,
  Globe,
  Calendar,
  Star,
  Pencil
} from 'lucide-react';
import { format } from 'date-fns';
import { Hotel, HotelAmenities } from '@/models/HotelModel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
    { key: 'airConditioning', label: 'Air Conditioning', icon: AirVent, color: 'text-blue-500' },
    { key: 'bar', label: 'Bar', icon: GlassWater, color: 'text-purple-500' },
    { key: 'gym', label: 'Gym', icon: Dumbbell, color: 'text-green-500' },
    { key: 'parking', label: 'Parking', icon: HotelIcon, color: 'text-gray-500' },
    { key: 'spa', label: 'Spa', icon: Bath, color: 'text-pink-500' },
    { key: 'restaurant', label: 'Restaurant', icon: Utensils, color: 'text-amber-500' },
    { key: 'breakfast', label: 'Breakfast', icon: Coffee, color: 'text-yellow-700' },
    { key: 'wifi', label: 'WiFi', icon: Wifi, color: 'text-indigo-500' },
    { key: 'swimmingPool', label: 'Swimming Pool', icon: Waves, color: 'text-cyan-500' },
    { key: 'petsAllowed', label: 'Pets Allowed', icon: PawPrint, color: 'text-orange-500' },
    { key: 'extraBed', label: 'Extra Bed', icon: BedDouble, color: 'text-violet-500' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {amenityItems.map(({ key, label, icon: Icon, color }) => {
        const isAvailable = amenities[key as keyof HotelAmenities];
        return (
          <TooltipProvider key={key}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`flex items-center gap-2 p-3 rounded-md ${
                  isAvailable 
                  ? `bg-white dark:bg-slate-800 shadow-sm border border-blue-100 dark:border-blue-900 ${color}` 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                }`}>
                  <Icon className="h-5 w-5" />
                  <span className={`text-sm truncate ${isAvailable ? 'font-medium' : ''}`}>{label}</span>
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
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl -m-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">{hotel.name}</h2>
              <Badge variant="outline" className="uppercase text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                {hotel.posKey}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Flag className="mr-1 h-3.5 w-3.5 text-indigo-500" />
              <span>{hotel.country}</span>
              <span className="px-1">•</span>
              <span>{hotel.governorate}</span>
            </div>
          </div>
          <Button onClick={onEdit} className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Pencil className="h-4 w-4" />
            Edit Hotel
          </Button>
        </div>
      </div>

      <Card className="border-blue-100 dark:border-blue-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-blue-100 dark:border-blue-900">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <MapPin className="h-5 w-5 text-blue-500" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm border border-blue-50 dark:border-blue-900">
              <p className="font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <Flag className="h-4 w-4" />
                Country
              </p>
              <p className="text-muted-foreground">{hotel.country}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm border border-blue-50 dark:border-blue-900">
              <p className="font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <Building className="h-4 w-4" />
                Governorate/State
              </p>
              <p className="text-muted-foreground">{hotel.governorate}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm border border-blue-50 dark:border-blue-900">
              <p className="font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Street Address
              </p>
              <p className="text-muted-foreground">{hotel.streetAddress}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm border border-blue-50 dark:border-blue-900">
              <p className="font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                <Globe className="h-4 w-4" />
                POS Region
              </p>
              <p className="text-muted-foreground flex items-center gap-1">
                <Badge className="uppercase">{hotel.posKey}</Badge>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-100 dark:border-blue-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-blue-100 dark:border-blue-900">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Heart className="h-5 w-5 text-pink-500" />
            Amenities
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <AmenityDisplay amenities={hotel.amenities} />
        </CardContent>
      </Card>

      <Card className="border-blue-100 dark:border-blue-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-blue-100 dark:border-blue-900">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Bed className="h-5 w-5 text-violet-500" />
            Room Types
          </CardTitle>
          <CardDescription>
            {hotel.roomTypes.length} room type{hotel.roomTypes.length !== 1 ? 's' : ''} available
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-blue-50 dark:bg-blue-900/30">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Adults
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Children
                    </div>
                  </TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500" />
                      Price
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotel.roomTypes.map((roomType) => (
                  <TableRow key={roomType.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <TableCell className="font-medium text-blue-600 dark:text-blue-400">{roomType.name}</TableCell>
                    <TableCell>{roomType.maxAdults}</TableCell>
                    <TableCell>{roomType.maxChildren}</TableCell>
                    <TableCell className="max-w-xs truncate">{roomType.description || '-'}</TableCell>
                    <TableCell>
                      {roomType.price ? (
                        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">
                          ${roomType.price.toFixed(2)}
                        </Badge>
                      ) : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900/50 p-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-500" />
          Last updated: {format(new Date(hotel.updatedAt), 'PPP')}
        </CardFooter>
      </Card>
    </div>
  );
};

export default HotelDetails;
