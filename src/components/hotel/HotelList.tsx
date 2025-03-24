
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import DeleteHotelDialog from './DeleteHotelDialog';
import HotelCard from './HotelCard';
import HotelListEmptyState from './HotelListEmptyState';
import HotelSearch from './HotelSearch';
import HotelViewToggle from './HotelViewToggle';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [gridView, setGridView] = useState(true); // Default to grid view for larger displays

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

  const toggleView = () => {
    setGridView(!gridView);
  };

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.governorate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.streetAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const springConfig = {
    type: "spring" as const,
    stiffness: 220,
    damping: 28,
    mass: 0.7
  };

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0,
        ...springConfig
      }
    }
  };

  const searchPlaceholder = searchTerm ? `${filteredHotels.length} hotels found` : '';

  return (
    <div className="w-full h-full p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Hotels ({filteredHotels.length}/{hotels.length})
        </h2>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">View:</span>
          <HotelViewToggle 
            isGridView={gridView} 
            onToggleView={toggleView} 
            disabled={isEditing}
          />
        </div>
      </motion.div>
      
      {hotels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="mb-6 w-full"
        >
          <HotelSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            disabled={isEditing}
            className="mb-2"
          />
          {searchTerm && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500 ml-2"
            >
              {filteredHotels.length === 0 
                ? "No hotels match your search" 
                : `Found ${filteredHotels.length} hotel${filteredHotels.length !== 1 ? 's' : ''} matching "${searchTerm}"`}
            </motion.p>
          )}
        </motion.div>
      )}
      
      <AnimatePresence mode="popLayout">
        {hotels.length === 0 ? (
          <HotelListEmptyState key="empty-state" />
        ) : filteredHotels.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={springConfig}
            className="p-8 text-center border border-dashed border-indigo-200 dark:border-indigo-800 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/20"
          >
            <p className="text-muted-foreground">No hotels match your search criteria</p>
            <button 
              onClick={() => setSearchTerm('')} 
              className="mt-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
            >
              Clear search
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            className={`grid ${gridView ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6' : 'grid-cols-1'} gap-4 md:gap-6 ${isEditing ? 'opacity-70' : ''}`}
            variants={container}
            initial="hidden"
            animate="show"
            layout="position"
          >
            {filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                isSelected={selectedHotel?.id === hotel.id}
                onSelect={() => handleSelectHotel(hotel)}
                onEdit={() => handleEditHotel(hotel)}
                onDelete={() => handleDeleteClick(hotel)}
                useGridView={gridView}
                disabled={isEditing}
                hideEditButton={false}
              />
            ))}
          </motion.div>
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
