
import React from 'react';
import { Pencil, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hotel } from '@/models/HotelModel';

interface HotelCardFooterProps {
  hotel: Hotel;
  onEdit: () => void;
  onDelete: () => void;
}

const HotelCardFooter: React.FC<HotelCardFooterProps> = ({ hotel, onEdit, onDelete }) => {
  return (
    <div className="pt-2 flex justify-between items-center border-t border-blue-100 dark:border-blue-900/30">
      <div className="flex items-center text-sm ml-1">
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
          className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900 transition-colors duration-200"
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
          className="h-8 w-8 text-destructive hover:bg-destructive/10 transition-colors duration-200"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(HotelCardFooter);
