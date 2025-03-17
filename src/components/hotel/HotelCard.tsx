
import React from 'react';
import { Pencil, Trash2, MapPin, Flag, Users, Hotel as HotelIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Hotel, HotelAmenities } from '@/models/HotelModel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AmenityIcon from './AmenityIcon';

interface HotelCardProps {
  hotel: Hotel;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  useGridView?: boolean;
}

// Function to get a consistent avatar image based on hotel name
const getHotelAvatar = (hotelName: string): string => {
  // Use a modulo operation to cycle through 5 placeholder images
  const nameHash = hotelName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const imageIndex = nameHash % 5 + 1;
  
  const placeholderImages = [
    'photo-1460925895917-afdab827c52f',
    'photo-1487958449943-2429e8be8625',
    'photo-1449157291145-7efd050a4d0e',
    'photo-1459767129954-1b1c1f9b9ace',
    'photo-1496307653780-42ee777d4833'
  ];
  
  return `https://images.unsplash.com/${placeholderImages[imageIndex - 1]}?auto=format&fit=crop&w=300&h=150&q=80`;
};

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  useGridView = false
}) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2 } } // Reduced from default duration
      }}
      className="cursor-pointer"
      onClick={onSelect}
    >
      <Card 
        className={`h-full transition-all duration-150 hover:shadow-md ${
          isSelected 
          ? 'border-indigo-400 dark:border-indigo-500 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40' 
          : 'hover:border-indigo-200 dark:hover:border-indigo-800'
        }`}
      >
        <CardHeader className={`pb-2 ${useGridView ? 'p-3' : ''}`}>
          <div className={`${useGridView ? 'flex flex-col' : 'flex items-center space-x-3'}`}>
            <div className={`${useGridView ? 'w-full h-32 mb-3 overflow-hidden rounded-lg' : 'h-12 w-12'}`}>
              {useGridView ? (
                <img 
                  src={getHotelAvatar(hotel.name)} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/300x150/indigo/white?text=Hotel';
                  }}
                />
              ) : (
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src={getHotelAvatar(hotel.name)} alt={hotel.name} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700">
                    <HotelIcon className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="flex-1">
              <CardTitle className={`${useGridView ? 'text-base' : 'text-lg'} text-indigo-700 dark:text-indigo-300`}>
                {hotel.name}
              </CardTitle>
              <Badge variant="outline" className="uppercase text-xs bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                {hotel.posKey}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className={`space-y-3 ${useGridView ? 'p-3 pt-0' : ''}`}>
          <div className="flex items-center text-sm text-muted-foreground">
            <Flag className="mr-1 h-3.5 w-3.5 text-indigo-500" />
            <span>{hotel.country}</span>
            <span className="px-1">•</span>
            <span>{hotel.governorate}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-3.5 w-3.5 text-pink-500" />
            <span className="truncate">{hotel.streetAddress}</span>
          </div>
          
          {!useGridView && (
            <div className="flex flex-wrap gap-1.5 bg-white/70 dark:bg-slate-800/50 p-2 rounded-md border border-indigo-50 dark:border-indigo-900/50">
              {(Object.keys(hotel.amenities) as Array<keyof HotelAmenities>)
                .filter(amenity => hotel.amenities[amenity])
                .slice(0, 6) // Show only top 6 amenities to keep card clean
                .map(amenity => (
                  <AmenityIcon key={amenity} amenity={amenity} value={hotel.amenities[amenity]} />
                ))}
              {(Object.keys(hotel.amenities) as Array<keyof HotelAmenities>)
                .filter(amenity => hotel.amenities[amenity]).length > 6 && (
                <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium text-xs">
                  +{(Object.keys(hotel.amenities) as Array<keyof HotelAmenities>)
                    .filter(amenity => hotel.amenities[amenity]).length - 6} more
                </Badge>
              )}
            </div>
          )}
          
          <div className="pt-2 flex justify-between items-center border-t border-indigo-100 dark:border-indigo-900/30">
            <div className="flex items-center text-sm">
              <Users className="mr-1 h-3.5 w-3.5 text-indigo-500" />
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                {hotel.roomTypes.length} room type{hotel.roomTypes.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-900"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HotelCard;
