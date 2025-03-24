
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
    <div className="flex justify-center items-center mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 gap-2">
      <Button
        variant="outline"
        size="sm"
        className="flex-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-950/40 h-8"
        onClick={handleViewClick}
        disabled={isEditing || disabled}
      >
        <Eye className="h-4 w-4 mr-1.5" />
        <span>View</span>
      </Button>
      
      {!hideEditButton && (
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-amber-600 hover:text-amber-800 hover:bg-amber-50 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-950/40 h-8"
          onClick={handleEditClick}
          disabled={isEditing || disabled}
        >
          <PenLine className="h-4 w-4 mr-1.5" />
          <span>Edit</span>
        </Button>
      )}
      
      <Button
        variant="outline"
        size="sm"
        className="flex-1 text-red-600 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/40 h-8"
        onClick={handleDeleteClick}
        disabled={isEditing || disabled}
      >
        <Trash2 className="h-4 w-4 mr-1.5" />
        <span>Delete</span>
      </Button>
    </div>
  );
};

export default HotelCardFooter;
