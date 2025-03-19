
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Hotel } from '@/models/HotelModel';
import { useIsMobile } from '@/hooks/use-mobile';

interface HotelCardFooterProps {
  hotel: Hotel;
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

export const HotelCardFooter = ({ hotel, onEdit, onDelete, disabled = false }: HotelCardFooterProps) => {
  const isMobile = useIsMobile();
  
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!disabled) {
      onEdit();
    }
  };
  
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!disabled) {
      onDelete();
    }
  };

  return (
    <div className="flex justify-end space-x-2 pt-1 mt-auto">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleEdit}
        type="button"
        className={`h-8 w-8 p-0 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        <Pencil className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-indigo-500`} />
        <span className="sr-only">Edit</span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleDelete}
        type="button"
        className={`h-8 w-8 p-0 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        <Trash2 className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-red-500`} />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
};

export default HotelCardFooter;
