
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import DeleteHotelDialog from './DeleteHotelDialog';
import HotelListEmptyState from './HotelListEmptyState';
import { 
  HotelListHeader,
  HotelListFilters,
  NoResultsFound,
  HotelCardGrid,
  useHotelFiltering
} from './list';

interface HotelListProps {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  onSelectHotel: (hotel: Hotel) => void;
  onEditHotel: (hotel: Hotel) => void;
  onDeleteHotel: (id: string) => void;
  isEditing?: boolean;
}

const HotelList: React.FC<HotelListProps> = ({
  hotels,
  selectedHotel,
  onSelectHotel,
  onEditHotel,
  onDeleteHotel,
  isEditing = false,
}) => {
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  const {
    searchTerm,
    filters,
    filteredHotels,
    handleSearchChange,
    handleFilterChange
  } = useHotelFiltering(hotels);

  const handleDeleteClick = (hotel: Hotel) => {
    if (isEditing) return;
    setHotelToDelete(hotel);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    if (hotelToDelete) {
      onDeleteHotel(hotelToDelete.id);
      setConfirmDialogOpen(false);
      setHotelToDelete(null);
    }
  };

  const handleSelectHotel = (hotel: Hotel) => {
    if (!isEditing) {
      onSelectHotel(hotel);
    }
  };

  const handleEditHotel = (hotel: Hotel) => {
    if (!isEditing) {
      onEditHotel(hotel);
    }
  };

  const springConfig = {
    type: "spring" as const,
    stiffness: 220,
    damping: 28,
    mass: 0.7
  };

  return (
    <div className="w-full h-full p-4 md:p-6">
      <HotelListHeader count={filteredHotels.length} />
      
      {hotels.length > 0 && (
        <HotelListFilters 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          disabled={isEditing}
          hotels={hotels}
        />
      )}
      
      <AnimatePresence mode="popLayout">
        {hotels.length === 0 ? (
          <HotelListEmptyState key="empty-state" />
        ) : filteredHotels.length === 0 ? (
          <NoResultsFound springConfig={springConfig} />
        ) : (
          <HotelCardGrid 
            hotels={filteredHotels}
            selectedHotel={selectedHotel}
            onSelectHotel={handleSelectHotel}
            onEditHotel={handleEditHotel}
            onDeleteHotel={handleDeleteClick}
            isEditing={isEditing}
            springConfig={springConfig}
          />
        )}
      </AnimatePresence>

      <DeleteHotelDialog
        hotel={hotelToDelete}
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default React.memo(HotelList);
