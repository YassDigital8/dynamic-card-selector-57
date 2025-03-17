
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
          ? 'border-indigo-400 dark:border-indigo-500 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40' 
          : 'hover:border-indigo-200 dark:hover:border-indigo-800'
        }`}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg text-indigo-700 dark:text-indigo-300">
              {hotel.name}
            </CardTitle>
            <Badge variant="outline" className="uppercase text-xs bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium">
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
