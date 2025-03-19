
import React from 'react';
import { Pencil, Trash2, Users, Star, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hotel } from '@/models/HotelModel';

interface HotelCardFooterProps {
  hotel: Hotel;
  onEdit: () => void;
  onDelete: () => void;
}

const HotelCardFooter: React.FC<HotelCardFooterProps> = ({ hotel, onEdit, onDelete }) => {
  // Calculate average price from room types
  const avgPrice = hotel.roomTypes.length > 0
    ? Math.round(hotel.roomTypes.reduce((acc, room) => acc + (room.price || 0), 0) / hotel.roomTypes.length)
    : 0;
  
  // Generate a mock rating between 3.5 and 5
  const rating = ((hotel.id.charCodeAt(0) % 15) / 10 + 3.5).toFixed(1);
  
  return (
    <div className="pt-2 flex justify-between items-center border-t border-indigo-100 dark:border-indigo-900/30">
      <div className="flex items-center text-sm">
        <Users className="mr-1 h-3.5 w-3.5 text-indigo-500" />
        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
          {hotel.roomTypes.length} room type{hotel.roomTypes.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        {avgPrice > 0 && (
          <div className="flex items-center text-emerald-600 dark:text-emerald-400">
            <DollarSign className="h-3.5 w-3.5 mr-0.5" />
            <span className="font-medium text-sm">{avgPrice}</span>
          </div>
        )}
        
        <div className="flex items-center">
          <Star className="h-3.5 w-3.5 text-amber-500 mr-0.5" />
          <span className="font-medium text-sm text-amber-600 dark:text-amber-400">{rating}</span>
        </div>
        
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="h-7 w-7 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-900 transition-colors duration-200"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="h-7 w-7 text-destructive hover:bg-destructive/10 transition-colors duration-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HotelCardFooter);
