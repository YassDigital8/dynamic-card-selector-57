
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
        variant="outline" 
        size={isMobile ? "icon-sm" : "icon"}
        onClick={handleEdit}
        type="button"
        className={`h-8 w-8 bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        <Pencil className="h-3.5 w-3.5 text-indigo-700 dark:text-indigo-400" />
        <span className="sr-only">Edit</span>
      </Button>
      
      <Button 
        variant="outline" 
        size={isMobile ? "icon-sm" : "icon"} 
        onClick={handleDelete}
        type="button"
        className={`h-8 w-8 bg-white dark:bg-slate-900 border-red-100 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        <Trash2 className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
};

export default HotelCardFooter;
