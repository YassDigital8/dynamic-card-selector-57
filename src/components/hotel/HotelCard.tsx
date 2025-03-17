
import React from 'react';
import { Pencil, Trash2, MapPin, Flag, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Hotel, HotelAmenities } from '@/models/HotelModel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import AmenityIcon from './AmenityIcon';

interface HotelCardProps {
  hotel: Hotel;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  isSelected,
  onSelect,
  onEdit,
  onDelete
}) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className="cursor-pointer"
      onClick={onSelect}
    >
      <Card 
        className={`h-full transition-all duration-200 hover:shadow-md ${
          isSelected 
          ? 'border-blue-400 dark:border-blue-500 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-900' 
          : 'hover:border-blue-200 dark:hover:border-blue-800'
        }`}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
              {hotel.name}
            </CardTitle>
            <Badge variant="outline" className="uppercase text-xs bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
              {hotel.posKey}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
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
          <div className="flex flex-wrap gap-1.5 bg-white/50 dark:bg-slate-800/50 p-2 rounded-md">
            {(Object.keys(hotel.amenities) as Array<keyof HotelAmenities>)
              .filter(amenity => hotel.amenities[amenity])
              .map(amenity => (
                <AmenityIcon key={amenity} amenity={amenity} value={hotel.amenities[amenity]} />
              ))}
          </div>
          <div className="pt-2 flex justify-between items-center">
            <div className="flex items-center text-sm">
              <Users className="mr-1 h-3.5 w-3.5 text-blue-500" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">
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
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900"
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
