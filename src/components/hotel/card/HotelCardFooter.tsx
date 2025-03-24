
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, PenLine, Trash2 } from 'lucide-react';
import { Hotel } from '@/models/HotelModel';

interface HotelCardFooterProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
  onEdit: (hotel: Hotel) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  disabled?: boolean;
  hideEditButton?: boolean;
}

const HotelCardFooter: React.FC<HotelCardFooterProps> = ({
  hotel,
  onSelect,
  onEdit,
  onDelete,
  isEditing,
  disabled = false,
  hideEditButton = false
}) => {
  const navigate = useNavigate();
  
  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/hotel/view/${hotel.id}`);
  };
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/hotel/edit/${hotel.id}`);
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete ${hotel.name}?`)) {
      onDelete(hotel.id);
    }
  };
  
  return (
    <div className="flex justify-evenly items-center gap-1 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
      <Button
        variant="ghost"
        size="icon"
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 h-7 w-7"
        onClick={handleViewClick}
        disabled={isEditing || disabled}
        title="View"
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      {!hideEditButton && (
        <Button
          variant="ghost"
          size="icon"
          className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 h-7 w-7"
          onClick={handleEditClick}
          disabled={isEditing || disabled}
          title="Edit"
        >
          <PenLine className="h-4 w-4" />
        </Button>
      )}
      
      <Button
        variant="ghost"
        size="icon"
        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 h-7 w-7"
        onClick={handleDeleteClick}
        disabled={isEditing || disabled}
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default HotelCardFooter;
