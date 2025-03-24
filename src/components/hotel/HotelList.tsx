import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel } from '@/models/HotelModel';
import DeleteHotelDialog from './DeleteHotelDialog';
import HotelCard from './HotelCard';
import HotelListEmptyState from './HotelListEmptyState';
import HotelSearch from './HotelSearch';

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

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.governorate.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="space-y-6 w-full p-4">
      <motion.div 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="flex items-center justify-between"
      >
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
          Hotels ({filteredHotels.length})
        </h2>
      </motion.div>
      
      {hotels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className={`rounded-lg overflow-hidden border border-indigo-100 dark:border-indigo-900 ${isEditing ? 'opacity-70' : ''}`}
        >
          <HotelSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            disabled={isEditing}
          />
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
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            className={`grid grid-cols-1 gap-4 ${isEditing ? 'opacity-70' : ''}`}
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
                useGridView={false}
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
