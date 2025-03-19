
import React from 'react';
import { Pencil, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hotel } from '@/models/HotelModel';

interface HotelCardFooterProps {
  hotel: Hotel;
  onEdit: () => void;
  onDelete: () => void;
  compact?: boolean;
}

const HotelCardFooter: React.FC<HotelCardFooterProps> = ({ 
  hotel, 
  onEdit, 
  onDelete, 
  compact = false 
}) => {
  return (
    <div className={`${compact ? 'pt-1.5 mt-1' : 'pt-3 mt-2'} flex justify-between items-center border-t border-blue-100 dark:border-blue-900/30`}>
      <div className="flex items-center text-xs ml-1">
        <Users className="mr-1 h-3.5 w-3.5 text-blue-500" />
        <span className="text-blue-600 dark:text-blue-400 font-medium">
          {hotel.roomTypes.length} room{hotel.roomTypes.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="flex gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="h-6 w-6 text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900 transition-colors duration-200"
        >
          <Pencil className="h-3 w-3" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="h-6 w-6 text-destructive hover:bg-destructive/10 transition-colors duration-200"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(HotelCardFooter);
